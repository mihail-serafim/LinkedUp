import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { SpaceMap } from './Components/LeftScreen/SpaceMap'
import PageHeader from './Components/PageHeader';
import PageFooter from './Components/PageFooter';
import { Message } from './Components/message'
import { Response } from './Components/response'


class Dashboard extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
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

export default Dashboard;