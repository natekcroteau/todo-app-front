import React, { Component } from 'react'
import TodoContainer from './components/TodoContainer'
import './App.css'

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

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <TodoContainer todos={this.state.todos} />
      </div>
    )
  }
}