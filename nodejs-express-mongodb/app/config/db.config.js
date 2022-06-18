if(process.env.NODE_ENV !== 'production'){
    const dotenv = require('dotenv')
    dotenv.config({ path: './../../vars.env'}) //do I need path?
}
module.exports = {
    url: process.env.DATABASE_URL
}
