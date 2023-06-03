// all of them help to connect to mongodb
import { Timestamp } from 'mongodb';
import {Schema, model,models} from 'mongoose';

// call function and pass in the option object
const UserSchema = new Schema({
    email: {
        type:String,
        unique: [true, 'Email already exist!'],
        required: [true, 'Email is required!']
    },
    username: {
        type:String,
        required: [true, 'Username is required!'],
        // match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})
        //         [a-zA-Z0-9._]+(?<![_.])$/,
        //         "Username invalid, it should contain 8-20 alpanumeric letters and be unique!"]
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Username invalid, it should contain 8-20 alpanumeric letters and be unique!'], 
       
    },
    image:{
        type:String,
    }
},{timestamps:true})
 

// alittle bit difference 
// look into the models.User see if it is there and only it's not there then create the model
const User = models.User || model("User", UserSchema)

export default User

// the 'model" object is provided by the Mongoose library and stores all the registered models. // models (line 2)
// if a model named "User" already existing model to "User" variable.
// this prevents redefining the modek and ensures that the existing model is reused.
// if the model names "user" does not exist in the "model " object, the modal function from Mongoose is called 
// to create a new model.
// The newly create model is then assigned to the "User" variable.