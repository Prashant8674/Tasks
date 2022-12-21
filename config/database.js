import mongoose from "mongoose";


const database = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbname: "FirstTask"
        };
        mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log('Connected Successfully...');
    } catch (error) {
        console.log(error);
    }
}
export default database;