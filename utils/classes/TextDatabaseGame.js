const { appendFileSync, existsSync, readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const UserDataStructure = require('../structures/UserDataStructure');

class TextDatabaseGame {
    /**
     * @type {Array.<UserDataStructure>}
     */
    userDataList = []
    constructor() {
        const filePath = join(process.cwd(), 'data');
        const fileExists = existsSync(filePath);

        if (!fileExists) writeFileSync(filePath, '');
    }
    /**
     * @param {UserDataStructure} userData 
     */
    addUser(userData) {
        if (!userData.userName ||
            !userData.userPassword ||
            typeof userData.userName !== 'string' ||
            typeof userData.userPassword !== 'string')
            throw new Error('Missing or invalid user data.');

        this.userDataList.push({
            userName: userData.userName,
            userPassword: userData.userPassword,
            currencyEmoji: userData.currencyEmoji || '💵'
        })
        const fileContent = readFileSync('data', 'utf-8').split('\n');
        const userDataList = fileContent
            .filter(line => line.includes('data'))
            .map(line => {
                line = line.split(' ')
                const [keyPart, valuePart] = line[0].substring(1, line[0].length - 1).split('=');
                const [dataKeyPart, dataValuePart] = line[1].substring(1, line[1].length - 1).split('=');
                const userDataDatabase = JSON.parse(dataValuePart)
                const data = valuePart.substring(1, valuePart.length - 1).split(',');
                return {
                    [keyPart]: data,
                    [dataKeyPart]: userDataDatabase
                };
            });
        for (const userData of this.userDataList) {
            const userEntry = userDataList.find(data => data[userData.userName])
            if (!userEntry) appendFileSync('data', `[${userData.userName}={${userData.userPassword},${userData.currencyEmoji}}] [data={}]\n`);
            else userData.data = userEntry.data
        }
    }
    /**
     * @typedef {function(string, any): void} setFunction
     * @typedef {function(string): object} getFunction
     * @typedef {function(): void} resetFunction
     * @typedef {function (string): void} deleteFunction
     * @param {string} userName 
     * @returns {{set: setFunction, get: getFunction, reset: resetFunction, delete: deleteFunction, data: Array.<object>, userData: UserDataStructure} | undefined}
     */
    getUser(userName) {
        const userData = this.userDataList.find(userData => userData.userName === userName)
        if (!userData) return undefined
        const fileContent = readFileSync('data', 'utf-8').split('\n').filter(line => line.includes('data'))
        const userDataLine = fileContent.find(line => line.includes(userData.userName))
        return {
            set: (key, value) => {
                let jsonDataPart = userDataLine.split(' ')[1]
                const oldData = jsonDataPart
                jsonDataPart = JSON.parse(jsonDataPart.substring('[data='.length, jsonDataPart.length - 1))
                jsonDataPart[key] = value
                const newDataLine = userDataLine.replace(oldData, `[data=${JSON.stringify(jsonDataPart)}]`)
                const index = fileContent.indexOf(userDataLine)
                fileContent[index] = newDataLine
                writeFileSync('data', fileContent.join('\n'))
            },
            reset: () => {
                const newDataLine = `[${userData.userName}={${userData.userPassword},${userData.currencyEmoji}}] [data={}]`
                writeFileSync('data', fileContent.join('\n').replace(userDataLine, newDataLine))
            },
            get: (key) => {
                let data = userDataLine.split(' ')[1]
                data = JSON.parse(data.substring('[data='.length, data.length - 1))
                return data[key]
            },
            delete: (key) => {
                let jsonDataPart = userDataLine.split(' ')[1]
                const oldData = jsonDataPart
                jsonDataPart = JSON.parse(jsonDataPart.substring('[data='.length, jsonDataPart.length - 1))
                delete jsonDataPart[key]
                const newData = JSON.stringify(jsonDataPart)
                const newDataLine = userDataLine.replace(oldData, `[data=${newData}]`)
                writeFileSync('data', fileContent.join('\n').replace(userDataLine, newDataLine))
            },
            data: userData.data,
            userData: userData
        }
    }
}
module.exports = TextDatabaseGame