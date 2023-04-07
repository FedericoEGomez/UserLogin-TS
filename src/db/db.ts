import mongoose from "mongoose";
mongoose.set('strictQuery', false);
require("dotenv").config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT || "")
        console.log("base de datos conectada")
    } catch {
        console.log("no se pudo conectar a la base de datos")
    }
}

export default connect 