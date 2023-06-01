// all of them help to connect to mongodb
import {Schema, model,models} from 'mongoose';

// call function and pass in the option object
const UserSchema = newSchema({
    email: {
        type:String,
        unique: [true, 'Email already exist!'],
        required: [true, 'Email is required!']
    },
    username: {
        type:String,
        required: [true, 'Username is required!'],
        match:
    }
})