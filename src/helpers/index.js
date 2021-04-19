const todoURL = "http://localhost:3000/todos/"


export function patchTodo(updatedTodo) {
    fetch(todoURL + updatedTodo.id, { 
        method: "PATCH",
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify({todo: updatedTodo})
      })
}


export function postTodo(newTodo){
    fetch(todoURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({todo: newTodo})
      })
}

export function destroyTodo(id){
    fetch(todoURL + id, { method: "DELETE" })
}