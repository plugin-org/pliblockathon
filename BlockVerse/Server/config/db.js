import mongoose from "mongoose";
import "dotenv/config.js";

const connectDB = async () => {
	try {
		console.log(process.env.MONGO_URI);
		const conn = await mongoose.connect( "mongodb://localhost:27017", {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(`Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
