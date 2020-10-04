import React from 'react'
import { Row, Form, Button, Card } from 'react-bootstrap';


function Message({ message, updateMessage, submitMessage }) {
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
                            onChange={updateMessage} 
                        />                            
                    </Form.Group>
                    <Button 
                        className='my-2 float-right'
                        variant='outline-primary'
                        onClick={submitMessage} 
                    >
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export { Message }