import React from 'react';
import { Col, Row, Tabs, Tab, Form, Button } from 'react-bootstrap';


class RightDashboard extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
            location: props.location,
            date: props.date,
            numberRelays: props.numberRelays,
            frequency: props.frequency,
            bandwidth: props.bandwidth,
            transmitterPower: props.transmitterPower
      };
    }

    //Update handlers//
    updateLocation = (event) => {
        console.log(event.target.value)
        this.props.updateLocation(event.target.value)
        this.setState({
            location: event.target.value
        })
    }

    updateDate = (event) => {
        console.log(event.target.value)
        this.props.updateLocation(event.target.value)
        this.setState({
            date: event.target.value
        })
    }

    updateNumberRelays = (event) => {
        console.log(event.target.value)
        this.props.updateNumberRelays(event.target.value)
        this.setState({
            numberRelays: event.target.value
        })
    }

    updateFrequency = (event) => {
        console.log(event.target.value)
        this.props.updateFrequency(event.target.value)
        this.setState({
            frequency: event.target.value
        })
    }

    updateBandwidth = (event) => {
        console.log(event.target.value)
        this.props.updateBandwidth(event.target.value)
        this.setState({
            bandwidth: event.target.value
        })
    }

    updateTransmitterPower = (event) => {
        console.log(event.target.value)
        this.props.updateTransmitterPower(event.target.value)
        this.setState({
            transmitterPower: event.target.value
        })
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
                                    value={this.state.location} 
                                    onChange={this.updateLocation}>
                                    <option>Toronto, Canada</option>
                                </Form.Control>                            
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="Date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type='date'
                                value={this.state.date} 
                                onChange={this.updateDate} />                            
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="Relays">
                                <Form.Label>Number of Relays</Form.Label>
                                <Form.Control as="select" 
                                value={this.state.numberRelays} 
                                onChange={this.updateNumberRelays}>
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
                                        value={this.state.frequency} 
                                        onChange={this.updateFrequency}/>Hz
                            </Form.Group>
                        </Col>
                            
                        <Col>
                            <Form.Group controlId="Bandwidth">
                                <Form.Label>Bandwidth</Form.Label><br></br>
                                <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                            value={this.state.bandwidth} 
                                            onChange={this.updateBandwidth}/>bps
                            </Form.Group>
                        </Col>
                    </Row>
                    <b>Transmitter and Receiver</b>
                    <Row>
                        <Col>
                            <Form.Group controlId="Power">
                                <Form.Label>Transmitter Power</Form.Label><br></br>
                                <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                            value={this.state.TransmitterPower} 
                                            onChange={this.updateTransmitterPower}/>W
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="Power">
                                <Form.Label>Receiver Power</Form.Label><br></br>
                                <Form.Control type="number" placeholder={0} style={{ width: '70%', display: 'inline-block', marginRight: '5px'}}
                                            value={this.state.power} 
                                            onChange={this.updatePower}/>W
                            </Form.Group>
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="Advanced Params" title="Advanced Params" style={{ backgroundColor: 'white'}}>

                </Tab>
                <Tab eventKey="Help" title="Help/How-to" style={{ backgroundColor: 'white'}}>

                </Tab>
            </Tabs>
            <Button variant="outline-primary" onClick={this.updateParameters} style={{ marginTop: '10px' }}>Update Simulation Parameters</Button>
             <Tabs defaultActiveKey="Results" id="uncontrolled-tab-example" style={{ backgroundColor: 'white', marginTop: '10px'}}>
                <Tab eventKey="Results" title='Results' style={{ backgroundColor: 'white', padding: '5px', marginBottom: '10px'}}>
                    hi
                </Tab>
            </Tabs>
            </div>
        );
    }
}

export default RightDashboard;