const todoURL = "http://localhost:3000/todos/"


export function patchTodo(updatedTodo) {
    fetch(todoURL + updatedTodo.id, { 
        method: "PATCH",
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({todo: updatedTodo})
      })
}


export function postTodo(todo, user){
    fetch(todoURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({todo: {...todo, user_id: user.id}})
      })
}

export function destroyTodo(id){
    fetch(todoURL + id, { method: "DELETE" })
}