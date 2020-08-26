import React, {Component} from 'react';
import ProjectTasks from './components/projecttasks';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projecttasks: []
    };
  }

  componentDidMount() {
    fetch('https://localhost:32770/api/ProjectTasksItems')
    .then(res => res.json())
    .then((data) => {
      this.setState({ projecttasks: data })
    })
    .catch(console.log)
  }

  render () {
    return (
      <ProjectTasks projecttasks={this.state.projecttasks} />
    );
  }
}

export default App;