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
          reqBitRate: null,
          transmitterPowerE: null,
          transmitterPowerM: null,
          transmitterEffE: null,
          transmitterEffM: null,
          transmitterGainE: null,
          transmitterGainM: null,
          receiverGainE: null,
          receiverGainM: null,
          linkMarginEM: 'N/A',
          linkMarginME: 'N/A',
          effBitRateEM: 'N/A',
          effBitRateME: 'N/A',
          messageTimeEM: 'N/A',
          messageTimeME: 'N/A',
          distance: 'N/A'
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

    updateReqBitRate = (reqBitRate) => {
        console.log(reqBitRate)
        this.setState({
            reqBitRate: reqBitRate
        })
    }

    updateTransmitterPowerE = (power) => {
        console.log(power)
        this.setState({
            transmitterPowerE: power
        })
    }

    updateLocation = (location) => {
        console.log(location)
        this.setState({
            location: location
        })
    }

    updateParameters = async() => {
        console.log('parameters button')
        let results = await updateParametersEndpoint();
        this.setState({
            linkMarginEM: null,
            linkMarginME: null,
            effBitRateEM: null,
            effBitRateME: null,
            messageTimeEM: null,
            messageTimeME: null,
            distance: null  
        })
    }

    updateText = (event) => {
        console.log({[event.target.id]: event.target.value})
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    updateNumber = (event) => {
        console.log({[event.target.id]: event.target.value})
        this.setState({
            [event.target.id]: event.target.value
        })
    }


    render() {

        return (
            <div id='DashboardContent'>
                <PageHeader id='PageHeader'/>

                <div id='PageBody'>
                    <Row style={{ height: '100%', width: '100%', margin: '0'}}>
                        <Col sm={8}>
                            <SpaceMap numberOfRelays={4 /* Set state, connect to right screen */}/>
                        </Col>
                        <Col sm={4}>
                            <RightDashboard 
                            linkMarginEM={this.state.linkMarginEM}
                            linkMarginME={this.state.linkMarginME}
                            effBitRateEM={this.state.effBitRateEM}
                            effBitRateME={this.state.effBitRateME}
                            messageTimeEM={this.state.messageTimeEM}
                            messageTimeME={this.state.messageTimeME}
                            distance={this.state.distance}
                            location={this.state.location}
                            date={this.state.date}
                            numberRelays={this.state.numberRelays}
                            frequency={this.state.frequency}
                            bandwidth={this.state.bandwidth}
                            transmitterPowerE={this.state.transmitterPowerE}
                            transmitterPowerM={this.state.transmitterPowerM}
                            transmitterEffE={this.state.transmitterEffE}
                            transmitterEffM={this.state.transmitterEffM}
                            transmitterGainE={this.state.transmitterGainE}
                            transmitterGainM={this.state.transmitterGainM}
                            receiverGainE={this.state.receiverGainE}
                            receiverGainM={this.state.receiverGainM}
                            updateParameters={this.updateParameters} 
                            updateLocation={this.updateLocation}  
                            updateNumberRelays={this.updateNumberRelays}
                            updateFrequency={this.updateFrequency}
                            updateBandwidth={this.updateBandwidth}
                            updateReqBitRate={this.updateReqBitRate} 
                            updateTransmitterPowerE={this.updateTransmitterPowerE} 
                            updateText={this.updateText}                       
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8} className="mx-3 my-2">
                        {/* message board */}
                            <Message 
                                message="" 
                                updateMessage={(event) => console.log(event.target.value)} 
                                submitMessage={() => console.log('sumbitted')}
                            />
                        </Col>
                    </Row>

                </div>

                {/* TODO: add back -> <PageFooter id='PageFooter' /> */} 
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