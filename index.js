let parties = []
let newParties = {
    name: [],
    description: [],
    location: [],
    date: []
}

const ul = document.querySelector("ul")
const form = document.querySelector(".submitParty")

function deleteParty(index) {
    parties.splice(index, 1)
    newParties.name.splice(index, 1)
    newParties.description.splice(index, 1)
    newParties.location.splice(index, 1)
    newParties.date.splice(index, 1)
    render()
}

function render() {
    const html = parties.map((party, index) => {
        return `
        <li>
            <button onclick="deleteParty(${index})">Delete</button>
            <p>${party.name}</p>
            <p>${party.description}</p>
            <p>Location: ${party.location}</p>
            <p>Date: ${party.date}</p>
        </li>`
    })
    const newPartiesHtml = newParties.name.map((nameOfParty, index) => {
        return `
        <li>
            <button onclick="deleteParty(${index})">Delete</button>
            <p>${nameOfParty}</p>
            <p>${newParties.description[index]}</p>
            <p>Location: ${newParties.location[index]}</p>
            <p>Date: ${newParties.date[index]}</p>
        </li>`
    })

    ul.innerHTML = html.join("") + newPartiesHtml.join("")
}

async function fetchParties() {
        const response = await fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310/events");
        const data = await response.json();
        console.log(data)
        parties = data.data
        console.log(parties)
        render()
    } 

function submitForm(event) {
    event.preventDefault()
    const partyName = form.name.value
    const description = form.description.value
    const location = form.location.value
    const date = form.date.value
    newParties.name.push(partyName)
    newParties.description.push(description)
    newParties.location.push(location)
    newParties.date.push(date)

    render()
}

form.addEventListener("submit", submitForm)


    fetchParties()
