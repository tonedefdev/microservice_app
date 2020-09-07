import React, { Component } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

class NewTask extends Component {
  constructor(props) {
    super(props);
    this.name = React.createRef()
    this.owner = React.createRef()
    this.assignee = React.createRef()
    this.status = React.createRef()
    this.submit = React.createRef()
    this.validateForm = this.validateForm.bind(this)
  }

  addTask(e) {    
    e.preventDefault()
    let data = {
      "name": this.name.current.value,
      "owner": this.owner.current.value,
      "assignee": this.assignee.current.value,
      "status": this.status.current.value
    };
    fetch(this.props.apiUrl, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(this.props.addNewTask(data))
    .then(this.props.onHide)
    .catch(console.log())
  }

  validateForm(value, event) {
    event.target.classList.remove('is-invalid')
    if (value === '')
    {
      event.target.className += ' is-invalid'
      this.submit.current.className += ' disabled'
      this.submit.current.disabled = true
    }
    else
    {
      event.target.className += ' is-valid'
      this.submit.current.classList.remove('disabled')
      this.submit.current.disabled = false
    }
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
        <Modal.Header closeButton={true} onHide={onHide}>
          <Modal.Title id="contained-modal-title-vcenter">
            Create a New Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="formGroupName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control 
              placeholder="Enter task name" 
              onChange={(e)=> {
                const value = e.target.value
                const event = e
                this.validateForm(value, event)
              }} 
              ref={this.name}/>
          </Form.Group>
          <Form.Group controlId="formGroupOwner">
            <Form.Label>Owner</Form.Label>
            <Form.Control 
              placeholder="Enter the task owner" 
              onChange={(e)=> {
                const value = e.target.value
                const event = e
                this.validateForm(value, event)
              }} 
              ref={this.owner}/>
          </Form.Group>
          <Form.Group controlId="formGroupAssignee" >
            <Form.Label>Assignee</Form.Label>
            <Form.Control 
              placeholder="Enter the task assigneee"
              onChange={(e)=> {
                const value = e.target.value
                const event = e
                this.validateForm(value, event)
              }} 
              ref={this.assignee}/>
          </Form.Group>
          <Form.Group controlId="formGroupOwner">
            <Form.Control type="hidden" value="Pending" ref={this.status}/>
          </Form.Group>
          <div className="float-right">
            <Button variant="secondary" className="mr-1" onClick={onHide}>
              Close
            </Button>
            <Button 
              variant="primary" 
              onClick={(e)=>this.addTask(e)}
              ref={this.submit}
              disabled={false}>
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