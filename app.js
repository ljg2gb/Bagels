const url = "http://bagel-api-fis.herokuapp.com/bagels/"
const newBagelForm = document.querySelector('#create-bagel-form')

const bagelInfo = {title:'This is the best bagel app', like_count:22,
 image: 'https://images.unsplash.com/photo-1518562923427-19e694fbd8e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'}

const title = document.querySelector('#title')
title.textContent = bagelInfo.title

const image = document.querySelector('#image')
image.innerHTML = `<img src="${bagelInfo.image}" alt="bagels">`

 fetch(url)
    .then(response => response.json())
    .then(bagels => bagels.map(displayBagel))


newBagelForm.addEventListener('submit', event => {
    event.preventDefault()
    const formData = new FormData(newBagelForm)
    const type = formData.get('type')
    const rating = formData.get('rating')
    const newBagel = {type, rating}

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

function displayBagel(bagel) {
    let likes = document.createElement('p')
    const deleteButton = document.createElement('button')
    deleteButton.textContent = "Delete"
    const card = document.createElement('div')

    card.append(
        settingBagelName(bagel),
        settingBagelRating(bagel),
        settingBagelLikes(likes),
        settingBagelLikeButton(likes),
        deleteButton
        )

    deleteButton.addEventListener('click', event => {
        console.log(event)
        card.remove()
         
        fetch(url + bagel.id, {
            method: "DELETE"
        })
    })

    document.body.append(card)
}

function settingBagelName(bagel) {
    const h3 = document.createElement('h3')
    h3.textContent = bagel.type

    return h3
}

function settingBagelRating(bagel) {
    const rating = document.createElement('p')
    rating.textContent = `rating: ${bagel.rating}`

    return rating
}

function settingBagelLikes(likes) {
    console.log(likes)
    likes.innerHTML = `likes: ${bagelInfo.like_count}`

    return likes
}

function settingBagelLikeButton(likes) {
    const likeButton = document.createElement('button')
    likeButton.textContent = "<3"
    likeButton.addEventListener("click", event => {
        likes.innerHTML = `likes: ${bagelInfo.like_count++}`
    })
    
    return likeButton
}

function settingBagelDeleteButton() {
    const deleteButton = document.createElement('button')
    deleteButton.textContent = "Delete"

    return deleteButton
}

