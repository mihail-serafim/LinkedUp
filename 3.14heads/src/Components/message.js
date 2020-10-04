import React from 'react'
import { Row, Form, Button, Card } from 'react-bootstrap';


function Message({ message, updateMessage, submitMessage }) {
    return (
        <Card
            bg='dark'
            text='white'
        >
            <Card.Body>
                <Card.Title className="ml-2 mt-3">Message To Mars</Card.Title>
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
                        variant='success'
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