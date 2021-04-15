import React, { Component } from 'react'
import TodoContainer from './components/TodoContainer'
import './App.css'
import TodoForm from './components/TodoForm'

const todoURL = "http://localhost:3000/todos"

export default class App extends Component {

  state = {
    todos: []
  }

  getTodos = () => {
    fetch(todoURL)
      .then(response => response.json())
      .then(todos => this.setState({todos}))
  }

  componentDidMount(){
    this.getTodos()
  }

  addTodo = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    })

    fetch(todoURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    })
  }

  deleteTodo = (id) => {
    let filtered = this.state.todos.filter(todo => todo.id !== id)
    this.setState({
      todos: filtered
    })
    fetch(todoURL + "/" + id, {
      method: "DELETE"
    })
  }

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <TodoForm addTodo={this.addTodo} />
        <TodoContainer todos={this.state.todos} deleteTodo={this.deleteTodo} />
      </div>
    )
  }
}