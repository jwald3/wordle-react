import wordBank from './wordle-bank.txt'

export const boardDefault = [
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""], 
    ["", "", "", "", ""]
]

// return all possible words as a set with data sourced from the wordle-bank file
export const generateWordSet = async () => {
    let wordSet;
    let todaysWord;

    await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
        const wordArr = result.split("\n")
        todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
        wordSet = new Set(wordArr)
    })

    return {wordSet, todaysWord}
}

