import React from 'react';
import { Col, Row, Tabs, Tab, Form } from 'react-bootstrap';


class RightDashboard extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }
    render() {
        return (
            <Tabs defaultActiveKey="Parameters" id="uncontrolled-tab-example" style={{ backgroundColor: 'white', marginTop: '10px'}}>
                <Tab eventKey="Parameters" title='Parameters' style={{ backgroundColor: 'white', padding: '5px'}}>
                    <b>Basic</b>
                    <Row>
                        <Col>
                            <Form.Group controlId="Location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control as="select">
                                    <option>Toronto, Canada</option>
                                </Form.Control>                            
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="Frequency">
                                <Form.Label>Frequency</Form.Label>
                                <Form.Control type="number" placeholder="5" style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}/>Hz
                            </Form.Group>
                        </Col>
                            
                        <Col>
                            <Form.Group controlId="Power">
                                <Form.Label>Power</Form.Label><br></br>
                                <Form.Control type="number" placeholder="5" style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}/>W
                            </Form.Group>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="Advanced Params" title="Advanced Params" style={{ backgroundColor: 'white'}}>

                </Tab>
                <Tab eventKey="Assumptions" title="Assumptions" style={{ backgroundColor: 'white'}}>

                </Tab>
            </Tabs>
        );
    }
}

export default RightDashboard;