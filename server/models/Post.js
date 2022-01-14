const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    url: {
        type: String
    },
    status: {
        type: String,
        enum:  ['TO LEARN', 'LEARNING', 'LEARNED']
    },
    user: {
        type: Schema.Types.ObjectId,
        //conect with user table 
        ref: 'users'
    }
})

module.exports = mongoose.model('post', PostSchema)