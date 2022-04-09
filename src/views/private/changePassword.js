import { toChangePassword } from "core/services/api/userDetails";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify"
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useHistory } from "react-router-dom";

const ChangePassword = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [newpassword, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [oldpassword, setOldPassword] = React.useState("");

  const history = useHistory();
    const handleChangePassword = async (event) =>{
        event.preventDefault();
        if(newpassword !== confirmPassword){
            toast.error("password not matched please try again");
            return
        }
        const values = {
            oldpassword: oldpassword,
            newpassword: newpassword,
        }
        const result = await toChangePassword(values);
            // alert(JSON.stringify(result));
        if (result && result.status && result.status === 200 ){
            // alert(JSON.stringify(result))
            setModalOpen(!modalOpen)
          toast.success(result.message);  
          localStorage.clear("accessToken");
          history.push("/auth/logout");
        }
    }

  return (
    <>
     <ToastContainer/>

       <button type="button" class="btn btn-info  ml-2"
               onClick={() => setModalOpen(!modalOpen)}
               > Change Password</button>
      <Modal toggle={() => setModalOpen(!modalOpen)} isOpen={modalOpen}>
        <div className=" modal-header">
          <h1 className=" modal-title" id="exampleModalLabel">
            Change Password
          </h1>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
        <div class="container mb-3">
        <form>
            <div class="col">
                <div class="row-12">
                  <div class="form-group">
                    <input type="password" class="form-control form-control-alternative" 
                    value={oldpassword}
                    id="exampleFormControlInput1" placeholder="Old Password"
                    onChange={(e)=>setOldPassword(e.target.value)}/>
                  </div>
                </div>   
            
                <div class="row-12">
                  <div class="form-group">
                  <input type="password" class="form-control form-control-alternative" 
                  value={newpassword}
                  id="exampleFormControlInput1" placeholder="Password"
                  onChange={(e)=>setPassword(e.target.value)}
                  />
                  </div>
                </div>
                <div class="row-12">
                  <div class="form-group">
                    <input type="password" class="form-control form-control-alternative" 
                    value={confirmPassword}
                    id="exampleFormControlInput1" placeholder="Confim Password"
                    onChange={(e)=>setConfirmPassword(e.target.value)}/>
                  </div>
                </div>
          </div>
        </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            type="button"
            onClick={() => setModalOpen(!modalOpen)}
          >
            Close
          </Button>
          <Button color="info" type="button" onClick={handleChangePassword}>
                  Change Password
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ChangePassword;