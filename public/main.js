const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/products', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Birdy',
            quantity: 75
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        window.location.reload(true)
    })
})

const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message') 

deleteButton.addEventListener('click', _ => {
    fetch('/products', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Ross'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No product to delete') {
            messageDiv.textContent = 'No product to delete'
        } else {
            window.location.reload(true)
        }
    })
    .catch(error => console.error(error))
})
