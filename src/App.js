import React, { Component } from 'react'
import TodoContainer from './components/TodoContainer'
import './App.css'
import TodoForm from './components/TodoForm'
import { patchTodo, postTodo, destroyTodo } from './helpers/index'
import SignUpForm from './components/SignUpForm'

const todoURL = "http://localhost:3000/todos/"




export default class App extends Component {

  state = {
    todos: [],
    user: {},
    alert: []
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
    postTodo(newTodo)
  }


  updateTodo = (updatedTodo) => {
    let todos = this.state.todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)
    this.setState({ todos })
    patchTodo(updatedTodo)
  }


  deleteTodo = (id) => {
    let filtered = this.state.todos.filter(todo => todo.id !== id)
    this.setState({
      todos: filtered
    })
    destroyTodo(id)
  }


  signUp = (user) => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({user})
    })
    .then(response => response.json())
    .then(response => {
      if(response.errors){
        this.setState({alerts: response.errors})
      }
      else {
        localStorage.setItem('token', response.token)
        this.setState({
          user: response.user,
          alerts: ["User successfully created!"]
        })
      }
    })
  }

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <SignUpForm signUp={this.signUp} alerts={this.state.alerts} />
        <TodoForm submitAction={this.addTodo} />
        <TodoContainer 
          todos={this.state.todos} 
          deleteTodo={this.deleteTodo} 
          updateTodo={this.updateTodo} />
      </div>
    )
  }
}