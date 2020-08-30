import React, {Component} from 'react'
import ProjectTasks from './components/ProjectTasks'
import Menu from './components/Menu'

class App extends Component {
  constructor(props) {
    super(props);
    this.updateTasks = this.updateTasks.bind(this)
    this.state = {
      projecttasks: []
    };
  }

  updateTasks(projecttasks) {
    this.setState({projecttasks})
  }

  componentDidMount() {
    fetch('https://localhost:32770/api/ProjectTasksItems')
    .then(res => res.json())
    .then((data) => {
      this.setState({ projecttasks: data })
    })
    .catch(console.log)
  }

  componentDidUpdate(prevState) {
    if (prevState !== this.state.projecttasks) {
      fetch('https://localhost:32770/api/ProjectTasksItems')
      .then(res => res.json())
      .then((data) => {
        this.setState({ projecttasks: data })
      })
      .catch(console.log)
    }
  }

  render () {
    return (
      <>
        <Menu projecttasks={this.state.projecttasks} addNewTask={this.updateTasks}></Menu>
        <ProjectTasks projecttasks={this.state.projecttasks} deleteTheTask={this.updateTasks}></ProjectTasks>
      </>
    );
  }
}

export default App;