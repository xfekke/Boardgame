const newPTag = document.createElement("p")

newPTag.innerText = "Javascript e skoj"

document.body.appendChild(newPTag)

const newH2 = document.createElement("h2")

newH2.innerText = "Jag är en under-rubrik!"

document.body.appendChild(newH2)

const myH1 = document.getElementsByTagName("h1")

myH1[0].innerText = "Jag är nu en huvudrubrik!"