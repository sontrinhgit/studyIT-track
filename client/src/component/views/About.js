import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button'

const About = () => {
    return (
        <Row className='mt-5' style={{marginRight: '0'}}>
            <Col className='text-center'>
                <Button variant='primary' size='lg'>Visit channel for more information </Button>
            </Col>
        </Row>
    )
}

export default About
