document.getElementsByTagName('textarea')[0].addEventListener('input' , handleInput);
let codedMap = {};

function handleInput(e) {
    const text = [...e.target.value.toUpperCase()];
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

    let characterIndex = 0;
    while(characterIndex < text.length) {
        const wordDiv = document.createElement('div');
        wordDiv.classList.add('word')
        while(text[characterIndex] !== ' ' && characterIndex < text.length) {
            const characterDiv = makeCharacterDiv(text[characterIndex]);
            if(/[A-Z]/.test(text[characterIndex])) {
                characterDiv.querySelector('input').addEventListener('input', handleGuess);
            }
            wordDiv.appendChild(characterDiv);
            characterIndex++;
        }
        quote.appendChild(wordDiv);
        characterIndex++;
    }
    createCount();
}

function handleGuess(e) {
    const guess = e.target.value.toUpperCase();
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

function makeCharacterDiv(character) {
    const characterDiv = document.createElement('div');
    characterDiv.classList.add('character')
    const characterInput = document.createElement('input')
    const characterSpan = document.createElement('span')
    characterDiv.appendChild(characterInput);
    characterDiv.appendChild(characterSpan);
    characterSpan.innerText = character;
    if(!/[A-Z]/.test(character)) {
        characterInput.classList.add('non-alphabetic');
    }
    return characterDiv;
}

function createCount() {
    count.innerHTML = '';
    for(let charCode = 65; charCode <= 90; charCode++) {
        const letter = String.fromCharCode(charCode);
        const div = document.createElement('div');
        div.classList.add('character');
        const span = document.createElement('span');
        span.innerText = `${letter}:${codedMap[letter] ? codedMap[letter].length : 0}`
        div.appendChild(span)
        count.appendChild(div)
    }
}