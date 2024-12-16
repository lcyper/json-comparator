import React, { useEffect, useRef } from 'react';

interface JsonEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  missingKeys: string[];
}

const JsonEditor: React.FC<JsonEditorProps> = ({ content, onContentChange, missingKeys }) => {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editorRef.current && missingKeys.length > 0) {
      const textArea = editorRef.current;
      try {
        const jsonObj = JSON.parse(content);
        
        // Add missing keys with empty values
        missingKeys.forEach(key => {
          const keyPath = key.split('.');
          let current = jsonObj;
          
          for (let i = 0; i < keyPath.length - 1; i++) {
            if (!current[keyPath[i]]) {
              current[keyPath[i]] = {};
            }
            current = current[keyPath[i]];
          }
          
          const lastKey = keyPath[keyPath.length - 1];
          if (!current[lastKey]) {
            current[lastKey] = "";
          }
        });

        // Format the JSON with highlighted missing keys
        const formattedJson = JSON.stringify(jsonObj, null, 2);
        onContentChange(formattedJson);
        
      } catch (error) {
        console.error('Invalid JSON:', error);
      }
    }
  }, [missingKeys]);

  return (
    <textarea
      ref={editorRef}
      value={content}
      onChange={(e) => onContentChange(e.target.value)}
      className="w-full h-64 font-mono text-sm p-4 border rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      spellCheck="false"
    />
  );
};

export default JsonEditor;