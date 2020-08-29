import React, {Component} from 'react'
import ProjectTasks from './components/ProjectTasks'
import Menu from './components/Menu'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projecttasks: []
    };
  }

  componentDidMount() {
    fetch('https://localhost:32778/api/ProjectTasksItems')
    .then(res => res.json())
    .then((data) => {
      this.setState({ projecttasks: data })
    })
    .catch(console.log)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isComplete !== this.props.isComplete) {
      fetch('https://localhost:32778/api/ProjectTasksItems')
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
        <Menu projecttasks={this.state.projecttasks}></Menu>
        <ProjectTasks projecttasks={this.state.projecttasks}></ProjectTasks>
      </>
    );
  }
}

export default App;