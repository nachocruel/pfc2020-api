const restful = require('node-restful')
const mongoose = restful.mongoose

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    img_profile: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    profile: {type: String, required: true, uppercase: true, enum: ['USER', 'ADMIN']}
})

module.exports = restful.model('User', userSchema)