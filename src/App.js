import React, { Component } from 'react'
import './App.css'
import { patchTodo, postTodo, destroyTodo } from './helpers/index'
import SignUpForm from './components/SignUpForm'
import { Route, Switch, Redirect} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Home'
 
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
    return fetch("http://localhost:3000/users", {
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
        <Switch>
          <PrivateRoute 
            exact 
            path="/" 
            component={Home} 
            submitAction={this.addTodo}
            todos={this.state.todos} 
            deleteTodo={this.deleteTodo} 
            updateTodo={this.updateTodo}
            />
          <Route 
            path="/signup" 
            render={(routerProps) => {
              return <SignUpForm {...routerProps} signUp={this.signUp} alerts={this.state.alerts} />}} 
          />
          <Redirect to="/" />
        </Switch>
      </div>
    )
  }
}