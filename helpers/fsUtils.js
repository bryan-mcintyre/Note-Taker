const fs = require('fs')
const util = require('util')

// Promise verstion of fs.readFile
const readFromFile = util.promisify(fs.readFile)

/**
 *  Function to write data to JSON file given a destination and content
 *  @param {string} destination The file being written to
 *  @param {object} content The content being written to the destination file
 *  @returns {void} Nothing
 */

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
)

/**
 *  Function to read data from a given file and append provided content
 *  @param {object} conent The content being appended to the file
 *  @param {string} file The path to the file being appended
 *  @returns {void} Nothing
 */

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data)
            parsedData.push(content)
            writeToFile(file, parsedData)
        }
    })
}

module.exports = { readFromFile, writeToFile, readAndAppend }