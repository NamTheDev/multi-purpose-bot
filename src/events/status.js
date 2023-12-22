const { client } = require("..");

client.on('ready', () => {
    client.editStatus('online', {name: 'with functions', type: 0})
})