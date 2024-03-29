const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const app = express();

// app.use(serveStatic(path.join(__dirname, 'dist')));

app.use('/', serveStatic(path.join(__dirname, 'dist')));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Everything ok");
    console.log("Everything ok x2");
    console.log(`Server is up and running at ${port}`);
});
