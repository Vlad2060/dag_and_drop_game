let word = "Сука!"
const wordArray = Array.from(word)
const cloneWordArray = [...wordArray]
let cout = -1

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

shuffleArray(wordArray)

const articleOne = document.querySelector('article:nth-child(1)')
const articleTwo = document.querySelector('article:nth-child(2)')
const checkButton = document.getElementById('check')
const dropSquares = document.querySelectorAll('div')

articleOne.ondrop = (event) => {
    event.preventDefault()

    let itemId = event.dataTransfer.getData('text')
    let draggedElement = document.getElementById(itemId)
        
    draggedElement.style.margin = '10px'
    event.target.appendChild(draggedElement)
}
articleOne.ondragover = event => event.preventDefault()

for (let i = 0; i < wordArray.length; i++) {
    let newSpan = document.createElement('span') 
    newSpan.textContent = wordArray[i]
    newSpan.id = `span${i}`
    newSpan.draggable = true
    articleOne.appendChild(newSpan)
}

for (let i = 0; i <= cloneWordArray.length; i++) {
    let newDiv = document.createElement('div')
    newDiv.id = `div${i}`
    newDiv.ondrop = drop
    newDiv.ondragover = event => event.preventDefault()
    articleTwo.appendChild(newDiv)
}

const squares = document.querySelectorAll('span')

squares.forEach(function (el) {
    el.ondragstart = drag
});

function drag(event) {
    event.dataTransfer.setData('text', this.id)
}

function drop(event) {
    event.preventDefault()

    let itemId = event.dataTransfer.getData('text')
    let draggedElement = document.getElementById(itemId)
        
    draggedElement.style.margin = '0'
    event.target.appendChild(draggedElement)
}

checkButton.addEventListener('click', () => {
    if (!articleOne.contains(document.querySelector('span'))) {

        let spanElements = document.querySelectorAll('span')

        for (let i = 0; i < spanElements.length; i++) {

            let newSpanText = spanElements[i].textContent

                if (newSpanText === cloneWordArray[i]) {
                    spanElements[i].style.background = 'rgb(0, 97, 0)'
                    spanElements[i].draggable = false
                    cout++
                } else {
                    spanElements[i].style.background = 'rgb(114, 0, 0)'
                }
                
                if (cout == parseInt(wordArray.length)) {
                    win()
                }
        }
    } else {
        alert('Please, drag all leters from first line!')
    }
})

function win() {
    const winText = document.createElement('h2')
    const body = document.querySelector('body')

    winText.textContent = "Congratulations! You win!"

    setTimeout(() => {
        articleOne.style.transform = 'scale(0)';
        checkButton.style.transform = 'scale(0)';
    }, 1000);

    setTimeout(() => {
        checkButton.style.display = 'none';
        articleOne.style.display = 'none';
    }, 1200);

    setTimeout(() => {
        body.appendChild(winText)
        winText.style.transform = 'scale(0)'
    }, 1300)

    setTimeout(() => {
        winText.style.transform = 'scale(1)'
    }, 1500)
}
