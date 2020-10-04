import React from 'react';
import { Col, Row, Tabs, Tab, Form, Button } from 'react-bootstrap';


class RightDashboard extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }


    render() {
        return (
            <div>
            <Tabs defaultActiveKey="Parameters" id="uncontrolled-tab-example" style={{ backgroundColor: 'white', marginTop: '10px'}}>
                <Tab eventKey="Parameters" title='Parameters' style={{ backgroundColor: 'white', padding: '5px'}}>
                    <b>Basic</b>
                    <Row>
                        <Col>
                            <Form.Group controlId="Location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control as="select"
                                    value={this.props.location} 
                                    onChange={(event) => this.props.updateLocation(event.target.value)}>
                                    <option>Toronto, Canada</option>
                                </Form.Control>                            
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type='date'
                                value={this.props.date} 
                                onChange={this.props.updateText} />                            
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="Relays">
                                <Form.Label>Number of Relays</Form.Label>
                                <Form.Control as="select" 
                                value={this.props.numberRelays} 
                                onChange={(event) => this.props.updateNumberRelays(event.target.value)}>
                                    <option>0</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </Form.Control>  
                            </Form.Group>                       
                        </Col>
                    </Row>
                    <b>Wave</b>
                    <Row>
                        <Col>
                            <Form.Group controlId="Frequency">
                                <Form.Label>Frequency</Form.Label>
                                <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                        value={this.props.frequency} 
                                        onChange={(event) => this.props.updateFrequency(event.target.value)}/>Hz
                            </Form.Group>
                        </Col>
                            
                        <Col>
                            <Form.Group controlId="Bandwidth">
                                <Form.Label>Bandwidth</Form.Label><br></br>
                                <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                            value={this.props.bandwidth} 
                                            onChange={(event) => this.props.updateBandwidth(event.target.value)}/>bps
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="ReqBitRate">
                                <Form.Label>Required Bit Rate</Form.Label><br></br>
                                <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                            value={this.props.reqBitRate} 
                                            onChange={(event) => this.props.updateReqBitRate(event.target.value)}/>bps
                            </Form.Group>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                    <b>Transmitter and Receiver</b>
                    <Row>
                        <Col>
                            <Form.Group controlId="Power">
                                <Form.Label>Earth Transmitter Power</Form.Label><br></br>
                                <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                            value={this.props.transmitterPowerE} 
                                            onChange={(event) => this.props.updateTransmitterPowerE(event.target.value)}/>W
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="transmitterPowerM">
                                <Form.Label>Mars Transmitter Power</Form.Label><br></br>
                                <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                            value={this.props.transmitterPowerM} 
                                            onChange={this.props.updateText}/>W
                            </Form.Group>
                        </Col>
                    </Row>
                </Tab>

                <Tab eventKey="Advanced Params" title="Advanced Params" style={{ backgroundColor: 'white', padding: '5px'}}>
                <b>Earth</b>
                <Row>
                    <Col>
                        <Form.Group controlId="transmitterEffE">
                            <Form.Label>Transmitter Efficiency</Form.Label><br></br>
                            <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                        value={this.props.transmitterEffE} 
                                        onChange={this.props.updateText} /> %
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="transmitterGainE">
                            <Form.Label>Transmitter Gain</Form.Label><br></br>
                            <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                        value={this.props.transmitterGainE} 
                                        onChange={this.props.updateText}/>dB
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="receiverGainE">
                            <Form.Label>Receiver Gain</Form.Label><br></br>
                            <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                        value={this.props.receiverGainE} 
                                        onChange={this.props.updateText}/>dB
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="Pointing Error">
                            <Form.Label>Pointing Error</Form.Label><br></br>
                            <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                        value={this.state.power} 
                                        onChange={this.updatePower}/>degrees
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="Noise Figure">
                            <Form.Label>Noise Figure</Form.Label><br></br>
                            <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                        value={this.state.TransmitterPower} 
                                        onChange={this.updateTransmitterPower}/>
                        </Form.Group>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <b>Mars</b>
                <Row>
                    <Col>
                        <Form.Group controlId="transmitterEffM">
                            <Form.Label>Transmitter Efficiency</Form.Label><br></br>
                            <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                        value={this.props.transmitterEffM} 
                                        onChange={this.props.updateText}/>%
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="transmitterGainM">
                            <Form.Label>Transmitter Gain</Form.Label><br></br>
                            <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                        value={this.props.transmitterGainM} 
                                        onChange={this.props.updateText}/>dB
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="receiverGainM">
                            <Form.Label>Receiver Gain</Form.Label><br></br>
                            <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                        value={this.props.receiverGainM} 
                                        onChange={this.props.updateText}/>dB
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="Pointing Error">
                            <Form.Label>Pointing Error</Form.Label><br></br>
                            <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                        value={this.state.power} 
                                        onChange={this.updatePower}/>degrees
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="Noise Figure">
                            <Form.Label>Noise Figure</Form.Label><br></br>
                            <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                        value={this.state.TransmitterPower} 
                                        onChange={this.updateTransmitterPower}/>
                        </Form.Group>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                </Tab>

                <Tab eventKey="Help" title="Help/How-to" style={{ backgroundColor: 'white'}}>

                </Tab>
            </Tabs>

            <Button variant="outline-primary" onClick={() => this.props.updateParameters()} style={{ marginTop: '10px' }}>Update Simulation Parameters</Button>
             
            <Tabs defaultActiveKey="Results" id="uncontrolled-tab-example" style={{ backgroundColor: 'white', marginTop: '10px'}}>
                <Tab eventKey="Results" title='Results' style={{ backgroundColor: 'white', padding: '5px', marginBottom: '10px'}}>
                    <u><b>Earth-to-Mars</b></u>
                    <Row>
                        <Col>
                            <p><b>Link Margin:</b></p>
                            <p>{this.state.linkMarginEM} dB</p>
                            <p><b>Time till Received:</b></p>
                            <p>{this.state.messageTimeEM} min</p>
                        </Col>
                        <Col>
                            <p><b>Effective Bit Rate:</b></p>
                            <p>{this.state.effBitRateEM} bps</p>  
                            <p><b>Distance:</b></p>
                            <p>{this.state.distance}</p>
                        </Col>
                    </Row>
                    <u><b>Mars-to-Earth</b></u>
                    <Row>
                        <Col>
                            <p><b>Link Margin:</b></p>
                            <p>{this.state.linkMarginME} dB</p>
                            <p><b>Time till Received:</b></p>
                            <p>{this.state.messageTimeME} min</p>
                        </Col>
                        <Col>
                            <p><b>Effective Bit Rate:</b></p>  
                            <p>{this.state.effBitRateME} bps</p>
                            <p><b>Distance:</b></p>
                            <p>{this.state.distance} km</p>
                        </Col>     
                    </Row>
                </Tab>
            </Tabs>
            </div>
        );
    }
}

export default RightDashboard;