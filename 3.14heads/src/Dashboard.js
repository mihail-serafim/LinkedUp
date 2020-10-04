import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { SpaceMap } from './Components/LeftScreen/SpaceMap'
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';
import { Message } from './Components/message'
import { Response } from './Components/response'
import RightDashboard from './Components/RightDashboard';

class Dashboard extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          location: 'Toronto, Canada',
          date: null,
          numberRelays: 0,
          frequency: null,
          bandwidth: null,
          transmitterPower: null,


      };
    }
    
    //Update handlers//
    updateNumberRelays = (numberRelays) => {
        console.log(numberRelays)
        this.setState({
            numberRelays: numberRelays
        })
    }

    updateDate = (date) => {
        console.log(date)
        this.setState({
            date: date
        })
    }

    updateFrequency = (frequency) => {
        console.log(frequency)
        this.setState({
            frequency: frequency
        })
    }

    updateBandwidth = (bandwidth) => {
        console.log(bandwidth)
        this.setState({
            bandwidth: bandwidth
        })
    }

    updateTransmitterPower = (power) => {
        console.log(power)
        this.setState({
            transmitterPower: power
        })
    }

    updateLocation = (location) => {
        console.log(location)
        this.setState({
            location: location
        })
    }

    updateParameters = async() => {
        let results = await updateParametersEndpoint();
    }


    render() {

        return (
            <div id='DashboardContent'>
                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                    <Row style={{ height: '100%', width: '100%', margin: '0'}}>
                        <Col sm={8} style={{ border: 'solid', height: '100%'}}>
                            <SpaceMap numberOfRelays={4 /* Set state, connect to right screen */}/>
                        </Col>
                        <Col sm={4} style={{ border: 'solid', height: '100%'}}>
                            <RightDashboard 
                            location={this.state.location}
                            date={this.state.date}
                            numberRelays={this.state.numberRelays}
                            frequency={this.state.frequency}
                            bandwidth={this.state.bandwidth}
                            transmitterPower={this.state.transmitterPower} 
                            updateLocation={this.updateLocation}
                            updateDate={this.updateDate}   
                            updateNumberRelays={this.updateNumberRelays}
                            updateFrequency={this.updateFrequency}
                            updateBandwidth={this.updateBandwidth}
                            updateTransmitterPower={this.updateTransmitterPower}                        
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6} style={{ border: 'solid', height: '100%'}}>
                        {/* message board */}
                            <Message 
                                message="" 
                                updateMessage={(event) => console.log(event.target.value)} 
                                submitMessage={() => console.log('sumbitted')}
                            />
                        </Col>
                        <Col sm={6} style={{ border: 'solid', height: '100%'}}>
                            <Response
                                message="blah"
                            />
                        </Col>
                    </Row>

                </div>

                <PageFooter id='PageFooter' />
            </div>
        );
    }
}

//Endpoints
async function updateParametersEndpoint() {
    let userJSON = {};
    userJSON.projectID = null;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userJSON),
    };
   
    const response = await fetch("/updateParameters", requestOptions);
    let data = await response.json();
    return data;
  }

export default Dashboard;