import React, { Component } from 'react'
import './App.css'
import { patchTodo, postTodo, destroyTodo } from './helpers/index'
import SignUpForm from './components/SignUpForm'
import { Route, Switch, Redirect, Link } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import Home from './components/Home'



export default class App extends Component {

  state = {
    todos: [],
    user: {},
    alert: []
  }

  componentDidMount(){
    if(localStorage.token){
      this.authorize_user()
    }
  }

  authorize_user = () => {
    fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        user: response.user,
        todos: response.todos
      })
    })
  }

  addTodo = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    })
    postTodo(newTodo, this.state.user)
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
          alerts: ["User successfully created!"],
          todos: response.todos
        })
      }
    })
  }


  login = ({username, password}) => {
    return fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
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
          alerts: ["Successful Login!"],
          todos: response.todos
        })
      }
    })
  }


  render() {
    return (
      <div>
        <header>
          { this.state.user.username
            ? (
              <>
                <nav>
                  <Link to="/signup">Logout</Link>
                </nav>
              </>
            )
            : null}
          
        </header>
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
              return <SignUpForm {...routerProps} login={this.login} signUp={this.signUp} alerts={this.state.alerts} />}} 
          />
          <Redirect to="/" />
        </Switch>
      </div>
    )
  }
}