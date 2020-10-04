import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

class PageHeader extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }
    render() {
        return (
            <Navbar style={{ paddingTop: '15px', paddingBottom: '15px'}} bg="dark" expand="lg" variant='dark' id='NavBar'>
                <Navbar.Brand ><b style={{ fontSize: '25px', paddingLeft: '15px'}}>3.14Heads</b></Navbar.Brand>
            </Navbar>
        );
    }
}

export default PageHeader;