import path from "path";
import { promises as fs } from "fs";
import { CustomThrowError } from "./server-action.helper";
import * as FS from "fs";

export async function SingleFileUpload(
	file: File,
	directory: string,
	filename: string = ""
) {
	const timestamp = new Date();

	if (!filename) {
		filename = "file_" + timestamp.getTime();
	} else {
		filename = filename + "_" + timestamp.getTime();
	}
	const type = getFileType(file.type);

	// Create the directory if it doesn't exist
	const uploadDir = path.join(process.cwd(), "src", "files", directory);
	await fs.mkdir(uploadDir, { recursive: true });
	const filePath = path.join(uploadDir, `${filename}.${type}`);

	// Save the file
	const arrayBuffer = await file.arrayBuffer();
	await fs.writeFile(filePath, Buffer.from(arrayBuffer));

	return filename;
}

export function getFileType(type: string) {
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
				"src",
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

export const getFileBuffer = (destination: string, fileName: string) => {
	if(!fileName || !destination) throw new CustomThrowError("Can't retrieve file. Please refresh the page");
	try {
		const filePath = path.join(process.cwd(), 'src', 'files', destination, fileName);
		const fileBuffer = FS.readFileSync(filePath);
		return `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;
	} catch (error: any) {
		return null;
	}
}