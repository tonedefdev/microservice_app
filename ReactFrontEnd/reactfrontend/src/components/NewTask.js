import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

class NewTask extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this)
    this.name = React.createRef();
    this.owner = React.createRef();
    this.assignee = React.createRef();
    this.status = React.createRef();
    this.state = {
      projecttasks: this.props.projecttasks
    }
  }

  onSubmit(event) {
    event.preventDefault();
    let data = {
      "name": this.name.current.value,
      "owner": this.owner.current.value,
      "assignee": this.assignee.current.value,
      "status": this.status.current.value
    };

    fetch('https://localhost:32778/api/ProjectTasksItems', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(console.log(data))
  }

  render() {
    const onHide = this.props.onHide;
    return (
      <>
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered 
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a New Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formGroupName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control placeholder="Enter task name" ref={this.name} />
          </Form.Group>
          <Form.Group controlId="formGroupOwner">
            <Form.Label>Owner</Form.Label>
            <Form.Control placeholder="Enter the task owner" ref={this.owner} />
          </Form.Group>
          <Form.Group controlId="formGroupAssignee" >
            <Form.Label>Assignee</Form.Label>
            <Form.Control placeholder="Enter the task assigneee" ref={this.assignee} />
          </Form.Group>
          <Form.Group controlId="formGroupOwner">
            <Form.Control type="hidden" value="Pending" ref={this.status} />
          </Form.Group>
          <div className="float-right">
            <Button variant="secondary" className="mr-1" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={this.onSubmit}>
              Create Task
            </Button>
          </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
    )
  }
};

export default NewTask