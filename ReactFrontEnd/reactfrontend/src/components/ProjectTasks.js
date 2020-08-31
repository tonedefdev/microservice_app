import React, { Component } from 'react'
import { Container, Row, Card, Col, Button } from 'react-bootstrap'

class ProjectTasks extends Component {
  render() {
    return (
      <Container>
        <Row>
          { this.props.projecttasks.map((task) => (
            <Col className="col-sm-6" key={task.id}>
              <Card className="mt-5">
                <Card.Header>
                    <p className="card-text">Status: {task.isComplete ? "Complete" : "Pending"}</p>
                </Card.Header>
                <Card.Body>
                    <h5 className="card-title">Task: {task.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Owner: {task.owner}</h6>
                    <p className="card-text">Assigned To: {task.assignee}</p>
                </Card.Body>
                <Card.Footer>
                  <div className="float-right">
                    <Button variant="success">Complete</Button>
                    <Button variant="danger" className="ml-1" onClick={(event) => this.props.deleteTask(event, task.id)} >Delete</Button>
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