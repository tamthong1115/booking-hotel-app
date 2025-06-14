import mongoose from "mongoose";
import "dotenv/config";

async function connectToDatabase() {
    const connectionString =
        process.env.NODE_ENV === "test"
            ? process.env.MONGODB_TEST_CONNECTION_STRING
            : process.env.MONGODB_CONNECTION_STRING;

    console.log("Connecting to MongoDB with connection string:", connectionString);
    try {
        await mongoose.connect(connectionString as string);
        console.log(`Connected to Database ${mongoose.connection.db?.databaseName}`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectToDatabase;
