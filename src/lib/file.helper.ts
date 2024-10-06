"use server";
import path from "path";
import { promises as fs } from "fs";
import { CustomThrowError } from "../app/actions/server-action.helper";
import * as FS from "fs";

export async function SingleFileUpload(
	file: File,
	directory: string,
	filename: string = ""
) {
	const timestamp = new Date();

	// Generate filename if not provided
	if (!filename) {
		filename = "file_" + timestamp.getTime();
	} else {
		filename = filename + "_" + timestamp.getTime();
	}

	const type = await getFileType(file.type);
	if (!type) {
		throw new Error("Unsupported file type");
	}

	// Create the directory if it doesn't exist
	const uploadDir = path.join(process.cwd(), "files", directory);
	await fs.mkdir(uploadDir, { recursive: true });

	const filePath = path.join(uploadDir, `${filename}.${type}`);

	// Convert file to ArrayBuffer and write to the file system
	const arrayBuffer = await file.arrayBuffer();

	// Convert ArrayBuffer to Buffer
	const buffer = Buffer.from(new Uint8Array(arrayBuffer)) as any;

	// Write buffer to the file
	await fs.writeFile(filePath, buffer);

	return `${filename}.${type}`;
}

export async function MultipleFileUpload(files: File[], directory: string) {
	const fileNames: string[] = [];

	for(const file of Object.values(files)) {
		const fileName = await SingleFileUpload(file, directory, file.name);
		fileNames.push(fileName);
	}

	return fileNames;
}

export async function getFileType(type: string) {
	if (!type) throw new CustomThrowError("Invalid file type");

	const [_, currentType] = type.split("/");
	return currentType;
}

export async function deleteFile(
	directory: string,
	filename: string | null = ""
): Promise<void> {
	try {
		if (filename) {
			const filePath = path.join(
				process.cwd(),
				"files",
				directory,
				filename
			);
			await fs.unlink(filePath);
			console.log(`File ${filePath} deleted successfully.`);
		}
	} catch (error) {
		console.error(`Error deleting file ${filename}:`, error);
		throw new CustomThrowError(
			"Internal server error. Please refresh the page."
		);
	}
}

export const getFileBuffer = async (destination: string, fileName: string) => {
	if(!fileName || !destination) throw new CustomThrowError("Can't retrieve file. Please refresh the page");
	try {
		const filePath = path.join(process.cwd(), 'files', destination, fileName);
		const fileBuffer = await FS.readFileSync(filePath);
		return `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;
	} catch (error: any) {
		return null;
	}
}

export async function formDataObjectToFiles(formData: FormData): Promise<File[]> {
	const data: Record<string, any> = {};

	formData.forEach((value, key) => {
		// If the key already exists, handle multiple values (e.g., arrays)
		if (data[key]) {
			// If it's not already an array, convert it to one
			if (!Array.isArray(data[key])) {
				data[key] = [data[key]];
			}
			data[key].push(value);
		} else {
			data[key] = value;
		}
	});

	return Object.values(data);
}