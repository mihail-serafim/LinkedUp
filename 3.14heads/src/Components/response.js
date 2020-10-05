import React from 'react'
import { Row, Col, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import help from '../assets/help_green.png';

function Response(props) {
    // should add some animation for changing letter or something
    const {
        linkMarginEM, messageTimeEM, effBitRateEM, linkMarginME, 
        messageTimeME, effBitRateME, distance
    } = props

    return (
        <Card
            bg='dark'
            text='white'
            className="reverse mb-3"
        >
            <Card.Body>
            <Card.Title className="mt-3 mb-3">Results </Card.Title>

            <div id='style-14' style={{ height: '30vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                    <h5>Earth to Mars</h5>
                    <Row>
                        <Col>
                            <p><b>Link Margin:</b>
                            <OverlayTrigger
                                    key='top'
                                    placement='top'
                                    overlay={
                                        <Tooltip id='top'>
                                        The <b>link margin</b> is an amalgamation of simulation parameters that represent how likely a signal is to get
                                        through to the receiver (by taking into account disturbances, losses, imperfections, etc.). A positive link margin
                                        means that a signal is likely to go through, while a negative link margin means that a signal is unlikely to go through.
                                        In practice, it is typical to aim for a link margin of {">"} 3dB.
                                        </Tooltip>
                                    }
                                    >
                                <img src={help} style={{ width: '25px', paddingLeft: '5px'}} />
                                </OverlayTrigger>
                            </p>
                            <p>{linkMarginEM} dB</p>
                            <p><b>Time till Received:</b>
                            <OverlayTrigger
                                    key='top'
                                    placement='top'
                                    overlay={
                                        <Tooltip id='top'>
                                        This time shows how long it would take for the message to go through to the receiver
                                        </Tooltip>
                                    }
                                    >
                                <img src={help} style={{ width: '25px', paddingLeft: '5px'}} />
                                </OverlayTrigger>
                            </p>
                            <p>{messageTimeEM} min</p>
                        </Col>
                        <Col>
                            <p><b>Effective Bit Rate:</b></p>
                            <p>{effBitRateEM} bps</p>  
                            <p><b>Distance:</b></p>
                            <p>{distance}</p>
                        </Col>
                    </Row>
                    <h5>Mars to Earth</h5>
                    <Row>
                        <Col>
                            <p><b>Link Margin:</b></p>
                            <p>{linkMarginME} dB</p>
                            <p><b>Time till Received:</b></p>
                            <p>{messageTimeME} min</p>
                        </Col>
                        <Col>
                            <p><b>Effective Bit Rate:</b></p>  
                            <p>{effBitRateME} bps</p>
                            <p><b>Distance:</b></p>
                            <p>{distance} km</p>
                        </Col>     
                    </Row>
                    </div>
            </Card.Body>
        </Card>
    )
}

export { Response }