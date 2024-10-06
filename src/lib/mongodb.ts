import mongoose from "mongoose";
import { CustomThrowError } from "../app/actions/server-action.helper";
import { MODEL_FILEPATH_NAME, MODEL_NAMES } from "@/constants/model.constants";

export function OverwriteSchema(modelName: string) {
	if (
		mongoose.modelNames().includes(modelName) &&
		process.env.NODE_ENV === "development"
	) {
		mongoose.deleteModel(modelName);
	}
}

const MONGODB_URI = process.env.MONGODB_URI!;
const MONGODB_NAME = process.env.MONGODB_NAME!;

if (!MONGODB_URI || !MONGODB_NAME) {
	throw new CustomThrowError("Define the MONGODB_URI environmental variable");
}

let cached = (global as any).mongoose;

if (!cached) {
	cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	for (const model in MODEL_NAMES) {
		const key = MODEL_NAMES[model as keyof typeof MODEL_NAMES];
		if (!mongoose.models[key]) {
			const fileModel = MODEL_FILEPATH_NAME[key];
			await import(`../models/${fileModel}.model`);
		}
	}

	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
            dbName: MONGODB_NAME,
			bufferCommands: false,
		};

		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose;
		});
	}
	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;
