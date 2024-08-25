document.getElementsByTagName('textarea')[0].addEventListener('input' , handleInput);
let codedMap = {};

function handleInput(e) {
    const text = [...e.target.value.toLowerCase()];
    // create hashmap of characters
    const charMap = text.reduce((map, item, index) => {
        if(!map[item]) {
            map[item] = []
        }
        map[item].push(index);
        return map;
    }, {})
    codedMap = charMap;
    quote.innerHTML = '';

    for(const character of text) {
        const characterDiv = document.createElement('div');
        const characterInput = document.createElement('input')
        const characterSpan = document.createElement('span')
        characterDiv.appendChild(characterInput);
        characterDiv.appendChild(characterSpan);
        characterSpan.innerText = character;
        characterInput.addEventListener('input', handleGuess)
        if(['(', ')', "'", ',', '.', ' '].includes(character)) {
            characterInput.classList.add('space');
        }
        quote.appendChild(characterDiv);
    }
}

function handleGuess(e) {
    const guess = e.target.value;
    const original = e.target.parentNode.querySelector('span').innerText;
    fillOutGuess(original, guess);
}

function fillOutGuess(original, guess) {
    const inputs = quote.querySelectorAll('input');
    const indices = codedMap[original];
    for(const index of indices) {
        inputs[index].value = guess;
    }
}