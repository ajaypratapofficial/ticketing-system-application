import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0, //0 customer //1 employee //2 admin employee
    },
    userType: {
        type: String,
        enum: ['admin', 'customer', 'employee'],
        default: 'customer'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model("users", userSchema);