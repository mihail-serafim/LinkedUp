import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../assets/Square_White.svg';
import teamLogo from '../assets/White_chain_logo.png';

class PageHeader extends React.Component {

    constructor(props) {
      super(props);
      this.state = {

      };
    }
    render() {
        return (
            <Navbar style={{ paddingTop: '15px', paddingBottom: '15px'}} bg="dark" expand="lg" variant='dark' id='NavBar'>
                <Navbar.Brand ><b style={{ fontSize: '25px', paddingLeft: '15px'}}>LinkedUp</b></Navbar.Brand>
                <img style={{ width: '4%', marginLeft: '-5px'}} src={teamLogo}/>
                <div style={{width: '100%'}}><img src={logo} style={{ float: 'right', width: '70px', paddingRight: '10px', marginTop: '0px', marginBottom: '0px'}}/></div>
            </Navbar>
        );
    }
}

export default PageHeader;