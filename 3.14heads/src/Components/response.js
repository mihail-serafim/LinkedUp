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
        >
            <Card.Body>
            <div style={{ height: '30vh', overflowY: 'scroll', overflowX: 'hidden' }}>
                    <u><b>Earth-to-Mars</b></u>
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
                    <u><b>Mars-to-Earth</b></u>
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