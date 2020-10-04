import React from 'react'
import { Row, Form, Button, Card } from 'react-bootstrap';

function Response({ message }) {
    // should add some animation for changing letter or something
    return (
        <Card>
            <Card.Body>
                <Form>
                    <Form.Group controlId='message'>
                        <Form.Control
                            className='mt-3'
                            as='textarea'
                            placeholder='Send a message to Mars'
                            rows='3'
                            value={message} 
                        />                            
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    )
}

export { Response }