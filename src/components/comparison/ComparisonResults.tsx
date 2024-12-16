import React from 'react';
import { Download } from 'lucide-react';
import JsonEditor from './JsonEditor';

interface ComparisonResultsProps {
  differences: string[];
  editedContent: string;
  onEditContent: (content: string) => void;
  onDownload: () => void;
  isLoading: boolean;
}

const ComparisonResults: React.FC<ComparisonResultsProps> = ({
  differences,
  editedContent,
  onEditContent,
  onDownload,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Comparison Results</h2>
      <p className="mb-4">
        Found {differences.length} missing {differences.length === 1 ? 'key' : 'keys'}
      </p>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Missing Keys:</h3>
        <ul className="list-disc list-inside">
          {differences.map((key: string, index: number) => (
            <li key={index} className="text-red-600">{key}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Edit JSON:</h3>
        <JsonEditor
          content={editedContent}
          onContentChange={onEditContent}
          missingKeys={differences}
        />
      </div>

      <button
        onClick={onDownload}
        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        <Download className="mr-2 h-5 w-5" />
        Download Modified File
      </button>
    </div>
  );
};

export default ComparisonResults;