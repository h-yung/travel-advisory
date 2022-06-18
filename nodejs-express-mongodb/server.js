const express = require('express');
const app = express();
const cors = require('cors');
// env and conditional if heroku deploymt
if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv')
    dotenv.config({path: 'vars.env'})
}

const PORT = process.env.PORT || 8081; //note .env not set up yet. should this be closer to app.listen?
const db = require('./app/models');

// path for static files - views
const path = __dirname + '/app/views';

// serve static files
app.use(express.static(path))

//diff - enable CORS
app.use(cors()) 
// vs:
// const corsOptions = {
//     origin: 'http://localhost:8081'
// }; 

// parse reqs of content type - json
app.use(express.json());
//Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true })); 


// connect to database
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log('Connected to the database')
    })
    .catch(err => {
        console.log('Cannot connect to database', err);
        process.exit();
    });

// simple route
app.get('/', (req,res)=>{
    res.sendFile(path + 'index.html');
    // res.json({ message: 'Travel advisory app' });
});

// include routes
require('./app/routes/advisory.routes')(app);

// listen for reqs
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

