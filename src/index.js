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
    todoData: [
      this.createTodoItem('Drink Coffe'),
      this.createTodoItem('Go Gym'),
      this.createTodoItem('Go to Bathroom'),
    ],
    filter: 'all',
  }

  createTodoItem(label) {
    return {
      label,
      done: false,
      created: new Date(),
      id: this.maxID++,
    }
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
      const doneTasks = [{ ...todoData[idx], done: !todoData[idx].done }]
      const newData = [...todoData.slice(0, idx), ...doneTasks, ...todoData.slice(idx + 1)]
      return {
        todoData: newData,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem]
      return { todoData: newArray }
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

  render() {
    const { todoData, filter } = this.state

    const visibleTask = this.filter(todoData, filter)

    const doneCount = todoData.filter((el) => el.done).length
    const todoCount = todoData.length - doneCount

    return (
      <div>
        <Header />
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList todos={visibleTask} onCompltedTask={this.compltedTask} onDeleted={this.deleteItem} />
        <Footer
          itemLeft={todoCount}
          filter={filter}
          onFilterChange={this.onFilterChange}
          onClearCompleted={this.onClearCompleted}
        />
      </div>
    )
  }
}

const root = createRoot(document.querySelector('.root'))
root.render(<App />)
