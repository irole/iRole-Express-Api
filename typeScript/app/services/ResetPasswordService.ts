import express from 'express';

import Service from "./Service";
// Model
import ResetPasswordToken from "../models/resetPasswordToken";

class ResetPasswordService extends Service {

    constructor() {
        super(ResetPasswordToken);
    }

    async tokenUsed(token) {
        return await this.findOneAndUpdate({token}, {use: true});
    }

}

export default new ResetPasswordService();
