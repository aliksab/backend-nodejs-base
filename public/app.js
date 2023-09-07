document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id
        
        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }
    if (event.target.dataset.type === 'update') {
        const id = event.target.dataset.id

        let newTitle = prompt('Введите новое название', event.target.dataset.title)
        put(id, newTitle).then(() => {
            event.target.closest('li').innerText = newTitle
        })
    }
})

async function remove(id) {
    await fetch(`/${id}`, {method: "DELETE"})
}

async function put(id, newTitle) {
    await fetch(`/${id}`, {
        method: "PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title: newTitle})
    })
}