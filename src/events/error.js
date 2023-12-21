const client = require("..");

client.on("error", (err) => {
    console.error(err);
});