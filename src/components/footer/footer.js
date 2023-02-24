import React from 'react'
import PropTypes from 'prop-types'

import TaskStatusFilter from '../task-status-filter/task-status-filter'

import './footer.css'

export default class Footer extends React.Component {
  static defaultProps = {
    itemLeft: 0,
    filter: 'all',
    onFilterChange: () => {},
    onClearCompleted: () => {},
  }

  static propTypes = {
    itemLeft: PropTypes.number,
    filter: PropTypes.string,
    onFilterChange: PropTypes.func,
    onClearCompleted: PropTypes.func,
  }

  render() {
    const { itemLeft, filter, onFilterChange, onClearCompleted } = this.props

    return (
      <footer className="footer">
        <span className="todo-count">{itemLeft} items left</span>
        <TaskStatusFilter filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}
