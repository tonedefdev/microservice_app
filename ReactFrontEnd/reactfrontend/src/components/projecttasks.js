import React from 'react'

const ProjectTasks = ({ projecttasks }) => {
  return (
    <div class="container">
      <center><h1>Project Tasks</h1></center>
      <center><button type="button" class="btn btn-primary">New Task</button></center>
      <div class="row">
        {projecttasks.map((project) => (
          <div class="col-sm-6">
            <div class="card mt-5">
              <div class="card-header">
                  <p class="card-text">Status: {project.isComplete ? "Complete" : "Pending"}</p>
              </div>
              <div class="card-body">
                  <h5 class="card-title">Task: {project.name}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Owner: {project.owner}</h6>
                  <p class="card-text">Assigned To: {project.assignee}</p>
              </div>
              <div class="card-footer">
                  <button type="button" class="btn btn-success">Complete</button>
              </div>
            </div>
          </div>
        ))}
    </div>  
  </div>
  )
};

export default ProjectTasks