import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const ProjectTasks = ({ projecttasks }) => {
  return (
    <Container>
      <Row>
        <Col md={true}> 
        { projecttasks.map((project) => (
          <Card className="mt-5" key={project.id}>
            <Card.Header>
                <p className="card-text">Status: {project.isComplete ? "Complete" : "Pending"}</p>
            </Card.Header>
            <Card.Body>
                <h5 className="card-title">Task: {project.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Owner: {project.owner}</h6>
                <p className="card-text">Assigned To: {project.assignee}</p>
            </Card.Body>
            <Card.Footer>
                <Button variant="success">Complete</Button>
            </Card.Footer>
          </Card>
        ))}
      </Col>
    </Row>
  </Container>
  )
};

export default ProjectTasks