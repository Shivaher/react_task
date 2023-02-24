import React from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    onItemAdded: () => {},
  }

  static propTypes = {
    onItemAdded: PropTypes.func,
  }

  state = {
    lable: '',
  }

  onLableChange = (e) => {
    this.setState({
      lable: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.lable.length === 0 || !this.state.lable.trim()) {
      this.setState({
        lable: '',
      })
    } else {
      this.props.onItemAdded(this.state.lable)
      this.setState({
        lable: '',
      })
    }
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What i need to do?"
          value={this.state.lable}
          onChange={this.onLableChange}
        />
      </form>
    )
  }
}
