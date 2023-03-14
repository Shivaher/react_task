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
    min: '',
    sec: '',
  }

  onLableChange = (e) => {
    this.setState({
      lable: e.target.value,
    })
  }

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    })
  }
  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = (e) => {
    if (e.keyCode === 13) {
      if (this.state.title !== '' && this.state.min !== '' && this.state.sec !== '') {
        this.props.addItem(this.state.lable, parseInt(this.state.min) * 60 + parseInt(this.state.sec))

        this.setState({
          lable: '',
          min: '',
          sec: '',
        })
      }
    }
  }

  render() {
    return (
      <form className="new-todo-form" onKeyDown={(e) => this.onSubmit(e)}>
        <input
          className="new-todo"
          placeholder="What i need to do?"
          value={this.state.lable}
          onChange={this.onLableChange}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          value={this.state.min}
          onChange={this.onMinChange}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={this.state.sec}
          onChange={this.onSecChange}
        />
      </form>
    )
  }
}
