import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
import ShowModal from './NewTask'
import NewTask from './NewTask'

class Menu extends Component {
  constructor(props) {
    super(props);
    this.setModalShow = this.setModalShow.bind(this)
    this.setModalHide = this.setModalHide.bind(this)
    this.state = {
      modalShow: false,
      projecttasks: this.props.projecttasks
    };
  }

  setModalShow() {
    this.setState({ modalShow: true })
  }

  setModalHide() {
    this.setState({ modalShow: false })
  }

  render() {
    return (
      <>
        <Container className="bg-light">
          <Navbar bg="light" variant="light" expand={true} sticky="top">
            <Navbar.Brand href="#home">Project Tasks</Navbar.Brand>
            <Nav className="mr-auto">
              <Button variant="outline-primary" onClick={this.setModalShow}>New Task</Button>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </Navbar>
        </Container>
        <NewTask
          show={this.state.modalShow}
          onHide={this.setModalHide}
          projecttasks={this.state.projecttasks}
        ></NewTask>
      </>
    )
  }
};

export default Menu