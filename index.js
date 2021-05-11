const app = require('./app')
const mongoose = require("mongoose")

// Database connection
mongoose.connect( process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .then( (result) =>  {
        console.log("MongoDB Connected.") 
        app.emit('ready'); 
    })
    .catch( (err) => console.log('Unable to connect to database.'))

let port = process.env.PORT || 3000;
app.on('ready', () => { 
    app.listen(port, () => {
        console.log(`App is listening at port ${port}`)
    })
}); 