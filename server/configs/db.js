import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        mongoose.connection.on('connected', () => console.log("database connected"))

    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB;