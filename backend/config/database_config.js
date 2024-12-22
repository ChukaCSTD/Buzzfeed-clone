const mongoose  =  require("mongoose")
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING);
        console.log('Database Connection Successful');
        
    } catch (error) {
        console.log(error.message);
        
    }
};

module.exports = connectDB;