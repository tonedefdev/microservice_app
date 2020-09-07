import React, {Component} from 'react'

class EditableText extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: props.name,
      type: props.type || 'text',
      value: props.value || '       ',
      editClassName: props.editClassName,
      edit: false
    }
  }

  render() {
    return (
      this.state.edit === true &&
      <input 
        name={this.state.name}
        type={this.state.type}
        value={this.state.value}
        className={this.state.editClassName}
        autoFocus
        onFocus={(e)=>{
          const value = e.target.value
          e.target.value = ''
          e.target.value = value
          this.setState({ backup: this.state.value })
        }}
        onChange={(e)=>{
          this.setState({ value: e.target.value })
        }}
        onBlur={(e)=>{
          this.setState({ edit:false })
        }}
        onKeyUp={(e)=>{
          if (e.key === 'Escape') {
            this.setState({ edit: false, value: this.state.backup })
          }
        }}
        onKeyPress={(e)=> {
          if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault()
            const value = e.target.value
            this.setState({ edit: false, value: e.target.value })
            this.props.handleEdit(e, value, this.props.id, this.props.item)
          }
        }}/>
      ||
      <span onClick={(e)=>{
          this.setState({ edit: this.state.edit !== true })
        }}>
        {" " + this.state.value}
      </span>
    )
  }
}

export default EditableText