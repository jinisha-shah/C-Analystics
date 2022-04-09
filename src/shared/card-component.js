import React from 'react';
import { Row ,Card, CardBody, CardTitle} from 'reactstrap';

const CardComponent = ({Title, thing}) => {
    return (
        <div>
            

             <Card className='shadow-lg p-3 mb-2 bg-white rounded' >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          {Title}
                        </CardTitle>
                      </div>
                      
                    </Row>
                    <h1>{thing}</h1>
                  </CardBody>
                </Card>
        </div>
    );
}

export default CardComponent;