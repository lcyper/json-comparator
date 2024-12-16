import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowLeftRight } from 'lucide-react';
import FileDropzone from '../components/comparison/FileDropzone';
import ComparisonResults from '../components/comparison/ComparisonResults';
import { findMissingKeys, addMissingKeysWithDefault } from '../utils/jsonComparison';

interface JsonContent {
  content: any;
  filename: string;
}

const ComparisonTool = () => {
  const [fileA, setFileA] = useState<JsonContent | null>(null);
  const [fileB, setFileB] = useState<JsonContent | null>(null);
  const [differences, setDifferences] = useState<string[] | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const processFiles = async (mainContent: any, comparisonContent: any) => {
    setIsLoading(true);
    try {
      // Simulate some processing time for large files
      await new Promise(resolve => setTimeout(resolve, 500));
      const missingKeys = findMissingKeys(mainContent, comparisonContent);
      setDifferences(missingKeys);
      setEditedContent(JSON.stringify(comparisonContent, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const onDropA = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const content = JSON.parse(reader.result as string);
        setFileA({ content, filename: file.name });
        if (fileB?.content) {
          processFiles(content, fileB.content);
        }
      } catch (error) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  }, [fileB]);

  const onDropB = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const content = JSON.parse(reader.result as string);
        setFileB({ content, filename: file.name });
        if (fileA?.content) {
          processFiles(fileA.content, content);
        }
      } catch (error) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  }, [fileA]);

  const { getRootProps: getRootPropsA, getInputProps: getInputPropsA } = useDropzone({
    onDrop: onDropA,
    accept: { 'application/json': ['.json'] },
    multiple: false
  });

  const { getRootProps: getRootPropsB, getInputProps: getInputPropsB } = useDropzone({
    onDrop: onDropB,
    accept: { 'application/json': ['.json'] },
    multiple: false
  });

  const swapFiles = () => {
    const tempA = fileA;
    setFileA(fileB);
    setFileB(tempA);
    if (fileB?.content && fileA?.content) {
      processFiles(fileB.content, fileA.content);
    }
  };

  const downloadModifiedFile = () => {
    if (!fileB) return;
    
    try {
      const content = JSON.parse(editedContent);
      const modifiedContent = differences 
        ? addMissingKeysWithDefault(content, differences)
        : content;

      const blob = new Blob([JSON.stringify(modifiedContent, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileB.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Invalid JSON in editor');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FileDropzone
          getRootProps={getRootPropsA}
          getInputProps={getInputPropsA}
          file={fileA}
          title="Main JSON File"
        />

        <div className="flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
          <button
            onClick={swapFiles}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
          >
            <ArrowLeftRight className="h-6 w-6 text-blue-600" />
          </button>
        </div>

        <FileDropzone
          getRootProps={getRootPropsB}
          getInputProps={getInputPropsB}
          file={fileB}
          title="Comparison JSON File"
        />
      </div>

      {(differences || isLoading) && (
        <ComparisonResults
          differences={differences || []}
          editedContent={editedContent}
          onEditContent={setEditedContent}
          onDownload={downloadModifiedFile}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ComparisonTool;