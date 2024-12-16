import React from 'react';
import { DropzoneRootProps, DropzoneInputProps } from 'react-dropzone';
import { FileJson } from 'lucide-react';

interface FileDropzoneProps {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  file: { content: any; filename: string } | null;
  title: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ getRootProps, getInputProps, file, title }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors"
      >
        <input {...getInputProps()} />
        <div className="text-center">
          {file ? (
            <div className="flex flex-col items-center">
              <FileJson className="h-12 w-12 text-blue-600 mb-2" />
              <p className="text-gray-600 font-medium">{file.filename}</p>
            </div>
          ) : (
            <p className="text-gray-600">Drop JSON file here or click to select</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileDropzone;