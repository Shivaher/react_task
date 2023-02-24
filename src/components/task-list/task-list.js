import React from 'react'
import PropTypes from 'prop-types'

import TaskItem from '../task-item/task-item'

import './task-list.css'

export default class TaskList extends React.Component {
  static defaultProps = {
    todos: [],
    onDeleted: () => {},
    onCompltedTask: () => {},
  }

  static propTypes = {
    todos: PropTypes.array,
    onDeleted: PropTypes.func,
    onCompltedTask: PropTypes.func,
  }

  render() {
    const { todos, onDeleted, onCompltedTask } = this.props

    const elements = todos.map((item) => {
      const { id, ...itemProps } = item

      return (
        <li key={id}>
          <TaskItem {...itemProps} onCompltedTask={() => onCompltedTask(id)} onDeleted={() => onDeleted(id)} />
        </li>
      )
    })

    return <ul className="todo-list">{elements}</ul>
  }
}
