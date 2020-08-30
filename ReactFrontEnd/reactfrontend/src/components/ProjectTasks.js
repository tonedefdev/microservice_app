import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

class ProjectTasks extends Component {
  constructor(props) {
    super(props);
    this.submitDelete = this.submitDelete.bind(this)
    this.id = React.createRef()
  }

  submitDelete(event) {
    event.preventDefault()
    fetch('https://localhost:32770/api/ProjectTasksItems/' + this.id.current.value, {
      method: 'delete',
      headers: {'Content-Type':'application/json'},
    })
    .then(res => res.json())
    .catch(console.log())
  }

  deleteTask() {
    let data = []
    this.props.deleteTheTask(data)
  }

  render() {
    return (
      <Container>
        <Row>
          { this.props.projecttasks.map((project) => (
            <Col className="col-sm-6" key={project.id}>
              <Card className="mt-5">
                <Card.Header>
                    <p className="card-text">Status: {project.isComplete ? "Complete" : "Pending"}</p>
                </Card.Header>
                <Card.Body>
                    <h5 className="card-title">Task: {project.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Owner: {project.owner}</h6>
                    <p className="card-text">Assigned To: {project.assignee}</p>
                </Card.Body>
                <Card.Footer>
                  <div className="float-right">
                    <Button variant="success">Complete</Button>
                    <Button variant="danger" className="ml-1" onClick={this.submitDelete} value={project.id} ref={this.id}>Delete</Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col> 
          ))}
      </Row>
    </Container>
    )
  };
}

export default ProjectTasks