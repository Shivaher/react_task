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
    const { min, sec, lable } = this.state

    // if (min !== Number || sec !== Number) {
    //   return
    // }

    return (
      <form className="new-todo-form" onKeyDown={(e) => this.onSubmit(e)}>
        <input className="new-todo" placeholder="What i need to do?" value={lable} onChange={this.onLableChange} />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={this.onMinChange}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={this.onSecChange}
        />
      </form>
    )
  }
}
