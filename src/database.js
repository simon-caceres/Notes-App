const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI


mongoose.connect(MONGODB_URI, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then( db => {
        console.log('database is connected')
    })
    .catch(e => {
        console.log(e)
    })