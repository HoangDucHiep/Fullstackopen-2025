const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    name: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})


userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        ret.id = ret._id.toString();
        delete ret.passwordHash;
        delete ret._id
        delete ret.__v
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
