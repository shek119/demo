const express = require('express');
const mongoose = require("mongoose");
const bodyParesr = require("body-parser");

require("./models/Note")

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODG_URI||"mongodb://localhost:27017/notes");
let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParesr.json());

require("./routes/noteRoutes")(app)

if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));

    const path = require('path');
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`);
})