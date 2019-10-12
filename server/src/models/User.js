const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// UserSchema.pre('save', function (next) {
//     if (!this.isModified('password')) { //password field is not modified then return next()
//         return next();
//     }
//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) return next(err);
//         bcrypt.hash(this.password, salt, (err, hash) => {
//             if (err) return next(err);
//             this.password = hash;
//             next();
//         })
//     })
// })


module.exports = User = mongoose.model('User', UserSchema);