const mongoose = require("mongoose")
const DB_URL = process.env.DB_URL

// connects to mongoose database
const dbConnect = async() => {
    try{
        mongoose.set("strictQuery", true)
        await mongoose.connect(DB_URL, {
            useNewURLParser: true, 
            useUnifiedTopology: true
        })
        console.log(`[db] connected to: bully-barn MongoDB`)
    } catch (err) {
        console.log(`[db] error: ${err}`)
    }
}


module.exports = { dbConnect, mongoose }