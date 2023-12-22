const { client } = require("..");

client.on("error", (err) => {
    console.error(err);
    app.get('/status', (req, res) => {
        res.send(`${err}`)
    })
});