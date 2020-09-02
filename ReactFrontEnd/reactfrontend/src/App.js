import React, {Component} from 'react'
import ProjectTasks from './components/ProjectTasks'
import Menu from './components/Menu'

class App extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.apiUrl = 'https://localhost:32774/api/ProjectTasksItems/'
    this.state = {
      projectTasks: []
    };
  }

  switchStatus(e) {
    switch(e) {
      case '1':
        return 'Complete'
      case '2':
        return 'In Progres'
      case '3':
        return 'Pending'
      default:
        return ''
    }
  }

  handleAdd(data) {
    let updateState = this.state.projectTasks.concat(data)
    this.setState({ projectTasks: updateState })
  }

  handleDelete(e, id) {
    e.preventDefault()
    let deleteState = this.state.projectTasks.filter((tasks) => tasks.id !== id)
    fetch(this.apiUrl + id, {
      method: 'delete',
      headers: {'Content-Type':'application/json'},
    })
    .then(this.setState({ projectTasks: deleteState }))
    .catch(console.log())
  }

  handleChange(e, id) {
    let taskCopy = [...this.state.projectTasks]
    let index = taskCopy.findIndex(el => el.id === id)
    let status = this.switchStatus(e)
    taskCopy[index].status = status
    fetch(this.apiUrl + id, {
      method: 'put',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(taskCopy[index])
    })
    .then(this.setState({ projectTasks: taskCopy }))
    .catch(console.log())
  }

  componentDidMount() {
    fetch(this.apiUrl)
    .then(res => res.json())
    .then((data) => {
      this.setState({ projectTasks: data })
    })
    .catch(console.log)
  }

  componentDidUpdate(prevProps, prevState) {
    const prevStateLength = prevState.projectTasks.length
    const currentStateLength = this.state.projectTasks.length
    if (prevStateLength !== currentStateLength) {
      fetch(this.apiUrl)
      .then(res => res.json())
      .then((data) => {
        this.setState({ projectTasks: data })
      })
      .catch(console.log)
    }
  }

  render () {
    return (
      <>
        <Menu 
          projectTasks={this.state.projectTasks} 
          addNewTask={this.handleAdd}
          apiUrl={this.apiUrl}>
        </Menu>
        <ProjectTasks 
          projectTasks={this.state.projectTasks} 
          deleteTask={this.handleDelete} 
          updateStatus={this.handleChange}>
        </ProjectTasks>
      </>
    );
  }
}

export default App;