const newBagelForm = document.querySelector('#create-bagel-form')
const editBagelForm = document.querySelector('#edit-bagel-form')
const url = "http://bagel-api-fis.herokuapp.com/bagels/"

fetch(url)
    .then(response => response.json())
    .then(result => displayBagels(result))

function displayBagels(bagels) {
    bagels.forEach(bagel =>
        displayBagel(bagel))
}

function displayBagel(bagel) {
    const div = document.createElement('div')

    const h3 = document.createElement('h3')
    h3.textContent = bagel.type

    const p = document.createElement('p')
    p.textContent = bagel.rating

    const deleteButton = document.createElement('button')
    deleteButton.textContent = "Delete"
    div.append(h3,p,deleteButton)

    deleteButton.addEventListener('click', event => {
        div.remove()
         
        fetch(url + bagel.id, {
            method: "DELETE"
        })
    })

    document.body.append(div)
}

newBagelForm.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(newBagelForm)
    const type = formData.get('type')
    const rating = formData.get('rating')
    const newBagel = {type, rating}
    console.log(newBagel)

    displayBagel(newBagel)

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify ({
            type: type,
            rating: rating
        })
    })
})

