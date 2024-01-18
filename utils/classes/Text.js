class Text {
    /**
     * 
     * @returns {string}
     */
    capitalize() {
        if (typeof this.word === 'object') {
            const newArray = []
            for (let word of this.word) {
                word = word.split('')
                word[0] = word[0].toUpperCase()
                word = word.join('')
                newArray.push(word)
            }
            return newArray.join(' ')
        }
        this.word = this.word.split('')
        this.word[0] = this.word[0].toUpperCase()
        return this.word.join('')
    }
    /**
     * 
     * @param {string} word 
     */
    constructor(word) {
        this.word = word
    }
}
module.exports = Text