import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/esm/Container'
import NewTask from './NewTask'
import Form from 'react-bootstrap/Form'

class Menu extends Component {
  constructor(props) {
    super(props);
    this.setModalShow = this.setModalShow.bind(this)
    this.setModalHide = this.setModalHide.bind(this)
    this.state = {
      modalShow: false,
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
        <div className="bg-dark">
          <Container>
            <Navbar bg="dark" variant="dark" sticky="top">
              <Navbar.Brand>Project Tasks</Navbar.Brand>
              <Nav className="mr-auto text-right">
                <Button hidden={true}></Button>
              </Nav>
              <Form inline>
                <Button variant="primary" onClick={this.setModalShow}>New Task</Button>
            </Form>
            </Navbar>
          </Container>
          <NewTask
            show={this.state.modalShow}
            onHide={this.setModalHide}
            projecttasks={this.props.projecttasks}
            addNewTask={this.props.addNewTask}
          ></NewTask>
        </div>
      </>
    )
  }
};

export default Menu