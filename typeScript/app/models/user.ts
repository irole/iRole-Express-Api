const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');

const userSchema = Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    admin: {type: Boolean, default: false},
}, {
    timestamps: true, toJSON: {
        transform(doc: any, ret: any) {
            ret.id = ret._id
            delete ret._id;
            delete ret.password;
        },
        virtuals: true,
        versionKey: false // __v : 0
    }
});

userSchema.methods.comparePassword = function (password: any) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model('User', userSchema);
