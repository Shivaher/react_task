import React from 'react'

import './task-status-filter.css'

export default class TaskStatusFilter extends React.Component {
  buttons = [
    { name: 'all', sort: 'All' },
    { name: 'active', sort: 'Active' },
    { name: 'completed', sort: 'Completed' },
  ]
  render() {
    const { filter, onFilterChange } = this.props

    const buttons = this.buttons.map(({ name, sort }) => {
      const isActive = filter === name
      const newClassName = isActive ? 'selected' : ''

      return (
        <li key={name}>
          <button className={newClassName} onClick={() => onFilterChange(name)}>
            {sort}
          </button>
        </li>
      )
    })

    return <ul className="filters">{buttons}</ul>
  }
}
