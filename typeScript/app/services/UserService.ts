const bcrypt = require('bcrypt');
// Service
import Service from "./Service";
// Model
import User from "../models/user";

class UserService extends Service {

    constructor() {
        super(User);
    }
    bcryptPassword(password: any): any {
        // Bcrypt with 15 salt
        const salt = bcrypt.genSaltSync(15);
        // Bcrypt Password with Salt
        return bcrypt.hashSync(password, salt);
    }

    async findIdWithUsername(username) {
        const user = await this.findOne({username});
        if (!user) return 404;
        return user.id;
    }

    async findUsernameWithId(userId) {
        const user = await this.findById(userId);
        return user.username;
    }

    async registerProcess(email, password) {
        // Create new user
        const newUser = await new this.model({
            email,
            password: this.bcryptPassword(password),
        });
        const user = await newUser.save();
        // when user not created send 500
        if (!user) return 500;
        return user;
    }

    async checkUserExistWithEmail(email) {
        const result = await this.findOne({email});
        return !!result;
    }

}

export default new UserService();
