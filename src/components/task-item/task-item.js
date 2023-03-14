import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './task-item.css'

export default class TaskItem extends React.Component {
  static defaultProps = {
    label: '',
    done: false,
    onDeleted: () => {},
    onCompltedTask: () => {},
    createdItem: () => {},
    created: new Date(),
  }

  static propTypes = {
    label: PropTypes.string,
    created: PropTypes.object,
    todos: PropTypes.array,
    onDeleted: PropTypes.func,
    onCompltedTask: PropTypes.func,
    done: PropTypes.bool,
  }

  render() {
    const { label, onDeleted, onCompltedTask, done, created, time, startTimer, stopTimer } = this.props

    let classNames = 'title'
    if (done) classNames = 'completed'

    const createdItem = formatDistanceToNow(created, { includeSeconds: true }, { addSuffix: true })

    return (
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onCompltedTask} defaultChecked={done} />
        <label>
          <span className={classNames}>{label}</span>
          <span className="description">
            <button className="icon icon-play" onClick={startTimer}></button>
            <button className="icon icon-pause" onClick={stopTimer}></button>
            <span className="timer">
              {`${Math.floor(this.props.time / 60)
                .toString()
                .padStart(2, '0')}:${Math.floor(time % 60)
                .toString()
                .padStart(2, '0')}`}
            </span>
          </span>
          <span className="description">created {createdItem} ago</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
    )
  }
}
