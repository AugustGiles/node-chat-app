const path = require('path');
const express = require('express')


// path is a native node api that condenses paths
// here we get the pathcoming to this file, we back out, then enter public
// using path, this public path just goes straight to public!
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

let app = express()

// middlewares
app.use(express.static(publicPath));

app.listen(port, () => console.log(`Started on Port ${port}`))
