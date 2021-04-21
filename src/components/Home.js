import React from 'react'
import TodoForm from './TodoForm'
import TodoContainer from './TodoContainer'

export default function Home(props) {
    console.log(props.todos)
    return (
        <>
            <TodoForm submitAction={props.submitAction} />
            <TodoContainer 
                todos={props.todos} 
                deleteTodo={props.deleteTodo} 
                updateTodo={props.updateTodo} />
        </>
    )
}
