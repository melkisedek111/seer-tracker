import React, { useState } from 'react';
import { FileText, Image as ImageIcon, File, FileX, FileSpreadsheet } from 'lucide-react';

interface FilePreviewProps {
    files: FileList | null;
}

const FilePreview: React.FC<FilePreviewProps> = ({ files }) => {
    const getFileTypeIcon = (file: File) => {
        if (file.type.startsWith('image/')) {
            return <ImageIcon size={40} className="text-blue-500" />;
        } else if (file.type === 'application/pdf') {
            return <FileText size={40} className="text-red-500" />;
        } else if (
            file.type === 'application/msword' ||
            file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            return <FileText size={40} className="text-blue-700" />;
        } else if (
            file.type === 'application/vnd.ms-excel' ||
            file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ) {
            return <FileSpreadsheet size={40} className="text-green-500" />;
        } else if (file.type === 'text/plain') {
            return <FileText size={40} className="text-gray-500" />;
        } else {
            return <FileX size={40} className="text-gray-500" />;
        }
    };

    const createObjectURL = (file: File) => {
        return URL.createObjectURL(file);
    };

    return (
        <div className="flex items-center gap-2 flex-wrap w-full">
            {files &&
                Array.from(files).map((file, index) => (
                    <a key={index} href={createObjectURL(file)} target="_blank" rel="noopener noreferrer" download={file.name} className="flex justify-center flex-col items-center">
                        <div>{getFileTypeIcon(file)}</div>
                        {/* Clickable and downloadable link for the file */}
                        <div className="text-xs">{file.name}</div>
                    </a>
                ))}
        </div>
    );
};

export default FilePreview;