import mongoose from "mongoose";

export const mongooseSession = async () => {
	// Using custom connection
	const db = await mongoose.createConnection(process.env.MONGODB_URI!).asPromise();
	await db.startSession();
};
