import { useState, useRef, DragEvent } from 'react';
import { Upload, Lock } from 'lucide-react';

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
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`
          relative group cursor-pointer
          rounded-3xl p-8 text-center transition-all duration-300 ease-out
          border-3 border-dashed
          ${isDragOver
            ? 'border-blue-500 bg-blue-50/50 scale-[1.02] shadow-2xl'
            : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50 hover:shadow-xl'
          }
          ${isUploading ? 'opacity-50 pointer-events-none' : ''}
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

        <div className="flex flex-col items-center justify-center gap-4">
          <div className={`
            p-4 rounded-2xl transition-all duration-300
            ${isDragOver ? 'bg-blue-100 text-blue-600 scale-110' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100 group-hover:scale-110'}
          `}>
            {isUploading ? (
              <div className="animate-spin"><Upload className="w-8 h-8" /></div>
            ) : (
              <Upload className="w-8 h-8" />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
              Upload Image
            </h3>
            <p className="text-gray-500 text-sm font-medium">
              Drag & drop or click to browse <span className="opacity-60 font-normal block sm:inline sm:ml-1">(PNG, JPG, SVG)</span>
            </p>
          </div>

          {!isUploading && (
            <div className="mt-2">
              <span className="inline-flex items-center px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF9500] to-[#FF2D55] text-white font-semibold text-sm shadow-lg group-hover:shadow-orange-500/30 transition-all duration-300 transform group-hover:scale-105">
                Choose File
              </span>
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-500 flex items-center justify-center gap-1.5 font-medium">
        <Lock className="w-3.5 h-3.5 text-gray-400" />
        Secure & Private: Images are processed locally and never leave your browser.
      </p>
    </div>
  );
}
