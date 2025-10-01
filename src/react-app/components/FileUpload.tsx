import { useState, useRef, DragEvent } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
}

export default function FileUpload({ onFileSelect, isUploading }: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onFileSelect(imageFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${isUploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-4 rounded-full ${isDragOver ? 'bg-blue-100' : 'bg-gray-100'}`}>
            {isUploading ? (
              <div className="animate-spin">
                <Upload className="w-8 h-8 text-gray-600" />
              </div>
            ) : (
              <ImageIcon className={`w-8 h-8 ${isDragOver ? 'text-blue-600' : 'text-gray-600'}`} />
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isUploading ? 'Uploading...' : 'Upload your image'}
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop an image here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports PNG, JPG, JPEG, GIF, and SVG files
            </p>
          </div>
          
          {!isUploading && (
            <button
              type="button"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Choose File
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
