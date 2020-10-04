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
        ...defaultFormValues,
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
            linkMarginEM: results.linkMarginEM,
            linkMarginME: results.linkMarginMe,
            effBitRateEM: results.effBitRateEM,
            effBitRateME: results.effBitRateME,
            messageTimeEM: results.messageTimeEM,
            messageTimeME: results.messageTimeME,
            distance: results.distance  
        })
    }

    updateText = (event) => {
        console.log({[event.target.id]: event.target.value})
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    resetFormFields = () => {
        Object.keys(defaultFormValues).map((key) => {
            this.setState({
                [key]: defaultFormValues[key]
            })
        })
    }

    render() {
        return (
            <div id='DashboardContent'>
                <PageHeader id='PageHeader'/>
                <div id='PageBody'>
                    <Row style={{ height: '100%', width: '100%', margin: '0'}} className="p-0">
                        <Col sm={8} className="px-1">
                            <SpaceMap numberOfRelays={this.state.numberRelays}/>
                        </Col>
                        <Col sm={4} className="pl-4">
                            <RightDashboard
                                {...this.state}
                                updateParameters={this.updateParameters} 
                                updateLocation={this.updateLocation}  
                                updateNumberRelays={this.updateNumberRelays}
                                updateFrequency={this.updateFrequency}
                                updateBandwidth={this.updateBandwidth}
                                updateReqBitRate={this.updateReqBitRate} 
                                updateTransmitterPowerE={this.updateTransmitterPowerE} 
                                updateText={this.updateText}
                                resetFormFields={this.resetFormFields}                
                            />
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col sm={8} className="ml-2">
                            <Message 
                                message="" 
                                updateMessage={(event) => console.log(event.target.value)} 
                                submitMessage={() => console.log('sumbitted')}
                            />
                        </Col>
                        <Col className="mr-2 ml-2 pl-0">
                            <Response />
                        </Col>
                    </Row>
                </div>

                {/* TODO: add back -> <PageFooter id='PageFooter' /> */} 
            </div>
        );
    }
}

var defaultFormValues = {
    location: 'Toronto, Canada',
    date: '',
    numberRelays: 0,
    frequency: '',
    bandwidth: '',
    reqBitRate: '',
    transmitterPowerE: '',
    transmitterPowerM: '',
    transmitterEffE: '',
    transmitterEffM: '',
    transmitterGainE: '',
    transmitterGainM: '',
    receiverGainE: '',
    receiverGainM: '',
    pointingErrorE: '',
    pointingErrorM: '',
    noiseFigureE: '',
    noiseFigureM: '',
}

// Endpoints
async function updateParametersEndpoint(state) {
    let userJSON = state;
    userJSON.projectID = null;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userJSON),
    };
   
    const response = await fetch("/api/v1/updateParameters", requestOptions);
    let data = await response.json();
    return data;
  }

export default Dashboard;