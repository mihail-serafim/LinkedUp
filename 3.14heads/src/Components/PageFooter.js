import React from 'react';
import { Navbar, Container, Row, Col, Nav } from 'react-bootstrap';


class PageFooter extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }
    render() {
        return (
            <Navbar bg="dark" expand="lg" variant='dark' id='NavBar'>
                <Navbar.Brand ><b style={{ fontSize: '25px', paddingLeft: '5px'}}>3.14Heads</b></Navbar.Brand>
            </Navbar>
        );
    }
}

export default PageFooter;