const mongoose = require('mongoose');
const {Schema} = mongoose;
const resetPasswordTokenSchema = Schema({
    email: {type: String, require: true},
    token: {type: String, require: true},
    use: {type: Boolean, default: false},
}, {timestamps: {updatedAt: false}, toJSON: {virtuals: true, versionKey: false}});

export default mongoose.model('ResetPasswordToken', resetPasswordTokenSchema);
