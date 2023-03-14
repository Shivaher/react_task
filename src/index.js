import React from 'react'
import { createRoot } from 'react-dom/client'

import Header from './components/header/header.js'
import NewTaskForm from './components/new-task-form/new-task-form'
import TaskList from './components/task-list/task-list'
import Footer from './components/footer/footer'

import './index.css'

class App extends React.Component {
  maxID = 100
  state = {
    todoData: [],
    filter: 'all',
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(({ todoData }) => {
        let newArr = todoData.map((el) => {
          if (el.time === 0) {
            return el
          }
          if (!el.pause) {
            el.time = el.time - 1
          }
          return el
        })
        return {
          todoData: newArr,
        }
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  createTodoItem(label, time) {
    return {
      label,
      time: time,
      done: false,
      created: new Date(),
      id: this.maxID++,
      pause: false,
    }
  }

  addItem = (text, time) => {
    const newItem = this.createTodoItem(text, time)
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]
      return { todoData: newArray }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const [...copyArray] = todoData
      copyArray.splice(idx, 1)

      return {
        todoData: copyArray,
      }
    })
  }

  compltedTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[idx]
      const newItem = { ...oldItem, done: !oldItem.done, pause: !oldItem.pause }
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  filter(task) {
    if (this.state.filter === 'all') {
      return task
    } else if (this.state.filter === 'active') {
      return task.filter((task) => !task.done)
    } else if (this.state.filter === 'completed') {
      return task.filter((task) => task.done)
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => !el.done)
      return {
        todoData: newArray,
      }
    })
  }

  stopTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newObj = [{ ...todoData[idx], pause: true }]
      const newArray = [...todoData.slice(0, idx), ...newObj, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  startTimer = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const newObj = [{ ...todoData[idx], pause: false }]
      const newArray = [...todoData.slice(0, idx), ...newObj, ...todoData.slice(idx + 1)]
      return {
        todoData: newArray,
      }
    })
  }

  render() {
    const { todoData, filter } = this.state

    const visibleTask = this.filter(todoData, filter)

    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount

    return (
      <section className="todoapp">
        <Header />
        <NewTaskForm addItem={this.addItem} />
        <section className="main">
          <TaskList
            todos={visibleTask}
            onCompltedTask={this.compltedTask}
            onDeleted={this.deleteItem}
            stopTimer={this.stopTimer}
            startTimer={this.startTimer}
          />
          <Footer
            itemLeft={todoCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            onClearCompleted={this.onClearCompleted}
          />
        </section>
      </section>
    )
  }
}

const root = createRoot(document.querySelector('.root'))
root.render(<App />)
