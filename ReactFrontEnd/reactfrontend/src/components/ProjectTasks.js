import React, { Component } from 'react'
import { Container, Row, Card, Col, Button, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap'
import EditableText from './EditableText'

class ProjectTasks extends Component {
  render() {
    return (
      <Container>
        <Row>
          { this.props.projectTasks.map((task) => (
            <Col className="col-sm-6" key={task.id}>
              <Card className="shadow mt-5">
                <Card.Header>
                  <p className="card-text">Status: {task.status}</p>
                </Card.Header>
                <Card.Body>
                  <form className="form-inline">
                    <h5 className="card-title">Task:
                      <EditableText 
                        value={task.name}
                        editClassName='form-control'
                        handleEdit={this.props.handleEdit}
                        id={task.id}
                        item="name">
                      </EditableText>
                    </h5>
                  </form>
                  <form className="form-inline">
                    <h6 className="card-subtitle mb-2 text-muted">Owner:
                      <EditableText 
                        value={task.owner}
                        editClassName='form-control'
                        handleEdit={this.props.handleEdit}
                        id={task.id}
                        item="owner">
                      </EditableText>
                    </h6>
                  </form>
                  <form className="form-inline">
                    <p className="card-text">Assigned To:
                      <EditableText 
                        value={task.assignee}
                        editClassName='form-control'
                        handleEdit={this.props.handleEdit}
                        id={task.id}
                        item="assignee">
                      </EditableText>
                    </p>
                  </form>
                </Card.Body>
                <Card.Footer>
                  <div className="float-right">
                    <ButtonGroup>
                    <DropdownButton as={ButtonGroup} variant="info" title="Status">
                      <Dropdown.Item 
                        eventKey="1" 
                        onSelect={(e) => this.props.updateStatus(e, task.id)}>Complete
                      </Dropdown.Item>
                      <Dropdown.Item 
                        eventKey="2"
                        onSelect={(e) => this.props.updateStatus(e, task.id)}>In Progress
                      </Dropdown.Item>
                      <Dropdown.Item 
                        eventKey="3"
                        onSelect={(e) => this.props.updateStatus(e, task.id)}>Pending
                      </Dropdown.Item>
                    </DropdownButton>
                      <Button variant="danger" className="ml-1" onClick={(e) => this.props.deleteTask(e, task.id)}>Delete</Button>
                    </ButtonGroup>
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