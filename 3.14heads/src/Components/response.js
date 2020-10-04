import React from 'react'
import { Row, Col, Button, Card } from 'react-bootstrap';

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
                            <p><b>Link Margin:</b></p>
                            <p>{linkMarginEM} dB</p>
                            <p><b>Time till Received:</b></p>
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