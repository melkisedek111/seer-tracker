"use server";
import path from "path";
import fs from "fs";
import { CustomThrowError } from "@/app/actions/server-action.helper";

export async function UploadRequestAttachments(files: string[]) {
	const fileNames: string[] = [];
	for (const file of files) {
		const timestamp = new Date();
		const [type, name, base64] = file.split("----");
		if (!(type || name || base64)) {
			throw new CustomThrowError(
				"Failed to upload attachments. Please refresh the page."
			);
		}
		const extractedName = removeFileExtension(name);
		const ext = getExtension(type);
		const uploadDir = path.join(
			process.cwd(),
			"files",
			"request_attachments"
		);
		const fileName = `${extractedName}_${timestamp.getTime()}${ext}`;
		await fs.promises.mkdir(uploadDir, { recursive: true });
		const filePath = path.join(uploadDir, `${fileName}`);
		const base64Data = base64.replace(/^data:.+;base64,/, "");
		const toArrayBuffer = Buffer.from(base64Data, "base64") as any;


		// Convert ArrayBuffer to Buffer
		const buffer = Buffer.from(new Uint8Array(toArrayBuffer)) as any;
		await fs.promises.writeFile(filePath, buffer);
		fileNames.push(fileName);
	}

	return fileNames;
}

const getExtension = (mimeType: string): string | null => {
	switch (mimeType) {
		case "image/jpeg":
			return ".jpg";
		case "image/png":
			return ".png";
		case "application/pdf":
			return ".pdf";
		case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
			return ".docx";
		case "text/plain":
			return ".txt";
		case "application/vnd.ms-excel":
		case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
			return ".xlsx";
		// Add other MIME types as needed
		default:
			return null;
	}
};

function removeFileExtension(filename: string): string {
	const lastDotIndex = filename.lastIndexOf(".");

	// If there's no dot or the dot is at the start (hidden file in Unix), return the original string
	if (lastDotIndex === -1 || lastDotIndex === 0) {
		return filename;
	}

	return filename.substring(0, lastDotIndex);
}
