import React,{useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({path, 
    adminComponent: AdminComponent,
    generalComponent: GeneralComponent,
    supritendentComponent: SupritendentComponent,
    inspectorComponent: InspectorComponent,
    ...props}) {
    const[isAuthentication, setAuthenticated] = useState(true);
    const[loading, setLoading] = useState(true);
    const [userType, setUserType] = React.useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem("accessToken");

                if (authToken) {
                    setAuthenticated(true);
                    setLoading(false);
                    setUserType(result.data.userType)
                    setLoading(false);

                } else {
                    setAuthenticated(false);
                    setLoading(false);
                }
            } catch (error) {
                console.log('privateRoute : ', error);
            }
        };
        fetchData();
    }, [path]);
  if (loading) return <h1>Loading...</h1>;

  const getComponent = (innerProps) => {
    if (userType === "Admin" && AdminComponent) {
        return <AdminComponent {...innerProps} />;
    }else if (userType === "General" && GeneralComponent){
        return <GeneralComponent {...innerProps} />;
    }else if (userType === "Supritendent" && SupritendentComponent){
        return <SupritendentComponent {...innerProps} />;
    }else if (userType === "Inspector" && InspectorComponent){
        return <InspectorComponent {...innerProps} />;
    }
    return <Redirect to="/404" />;
};
    return (
        <Route
            {...props}
            render={(innerProps) => isAuthentication ? getComponent(innerProps) : <Redirect to="/Login" />
            }
        />
    );
}

export default PrivateRoute;