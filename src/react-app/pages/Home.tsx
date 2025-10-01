import { useState } from 'react';
import { Zap, Star, Sparkles, Download } from 'lucide-react';
import FileUpload from '@/react-app/components/FileUpload';
import ImageCropper from '@/react-app/components/ImageCropper';

type Step = 'upload' | 'crop' | 'results';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [faviconData, setFaviconData] = useState<string>('');

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setCurrentStep('crop');
  };

  const handleCropComplete = (croppedImageData: string) => {
    setFaviconData(croppedImageData);
    setCurrentStep('results');
  };

  const handleAnimationComplete = (animationData: any) => {
    // For Netlify version, we'll just download the static version
    // Animation features would require server-side processing
    setFaviconData(animationData.baseImage);
    setCurrentStep('results');
  };

  const resetToUpload = () => {
    setCurrentStep('upload');
    setSelectedFile(null);
    setFaviconData('');
  };

  const downloadFavicon = (size: number, filename: string) => {
    if (!faviconData) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0, size, size);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = filename;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      }, filename.endsWith('.ico') ? 'image/x-icon' : 'image/png');
    };
    
    img.src = faviconData;
  };

  const downloadAllSizes = () => {
    const sizes = [
      { size: 16, filename: 'favicon-16x16.png' },
      { size: 32, filename: 'favicon-32x32.png' },
      { size: 48, filename: 'favicon-48x48.png' },
      { size: 180, filename: 'apple-touch-icon.png' },
      { size: 192, filename: 'android-chrome-192x192.png' },
      { size: 512, filename: 'android-chrome-512x512.png' },
    ];

    sizes.forEach((item, index) => {
      setTimeout(() => {
        downloadFavicon(item.size, item.filename);
      }, index * 200);
    });

    // Also create and download the ICO file
    setTimeout(() => {
      downloadFavicon(32, 'favicon.ico');
    }, sizes.length * 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
                  <Zap className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FaviCraft
              </span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Quickly generate your favicon from any image by uploading your image below. 
              Download your favicon in the most up to date formats.
            </p>

            {/* Features */}
            <div className="flex justify-center space-x-8 mb-12">
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="w-5 h-5 text-yellow-500" />
                <span>Professional Quality</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span>All Formats Included</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Zap className="w-5 h-5 text-blue-500" />
                <span>Lightning Fast</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {currentStep === 'upload' && (
          <FileUpload 
            onFileSelect={handleFileSelect} 
            isUploading={false}
          />
        )}

        {currentStep === 'crop' && selectedFile && (
          <ImageCropper
            imageFile={selectedFile}
            onCropComplete={handleCropComplete}
            onAnimationComplete={handleAnimationComplete}
            onBack={resetToUpload}
          />
        )}

        {currentStep === 'results' && faviconData && (
          <div className="w-full max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Your Favicon Is Ready!</h2>
                    <p className="text-green-100">Download your favicon files and add them to your website</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-full">
                    <Download className="w-8 h-8" />
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Preview */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Preview</h3>
                  <div className="inline-block bg-gray-50 rounded-lg p-8">
                    <div className="flex items-center justify-center space-x-6">
                      {[16, 32, 48, 64].map((size) => (
                        <div key={size} className="text-center">
                          <div 
                            className="border border-gray-300 rounded mb-2 mx-auto"
                            style={{
                              width: `${Math.min(size, 48)}px`,
                              height: `${Math.min(size, 48)}px`,
                              backgroundImage: `
                                linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0),
                                linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)
                              `,
                              backgroundSize: '4px 4px',
                              backgroundPosition: '0 0, 2px 2px',
                            }}
                          >
                            <img 
                              src={faviconData} 
                              alt={`${size}x${size} preview`} 
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div className="text-xs text-gray-600">{size}×{size}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Download Options */}
                <div className="space-y-6">
                  <div className="text-center">
                    <button
                      onClick={downloadAllSizes}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
                    >
                      <Download className="w-6 h-6" />
                      <span>Download All Favicon Sizes</span>
                    </button>
                    <p className="text-gray-600 text-sm mt-2">
                      Downloads all standard favicon sizes (16×16, 32×32, 48×48, 180×180, 192×192, 512×512, favicon.ico)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { size: 16, filename: 'favicon-16x16.png', label: '16×16 PNG' },
                      { size: 32, filename: 'favicon-32x32.png', label: '32×32 PNG' },
                      { size: 48, filename: 'favicon-48x48.png', label: '48×48 PNG' },
                      { size: 180, filename: 'apple-touch-icon.png', label: 'Apple Touch Icon' },
                      { size: 192, filename: 'android-chrome-192x192.png', label: 'Android Chrome 192×192' },
                      { size: 512, filename: 'android-chrome-512x512.png', label: 'Android Chrome 512×512' },
                    ].map((item) => (
                      <button
                        key={item.size}
                        onClick={() => downloadFavicon(item.size, item.filename)}
                        className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors text-center"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Installation Instructions */}
                <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">Installation Instructions</h4>
                  <div className="space-y-4 text-sm text-gray-700">
                    <div>
                      <strong>1. Upload Files:</strong> Place all downloaded favicon files in your website's root directory.
                    </div>
                    <div>
                      <strong>2. Add HTML Tags:</strong> Add these tags to your HTML &lt;head&gt; section:
                    </div>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto">
                      <pre>{`<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">`}</pre>
                    </div>
                  </div>
                </div>

                {/* Generate Another Button */}
                <div className="flex justify-center mt-8 pt-8 border-t border-gray-200">
                  <button
                    onClick={resetToUpload}
                    className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                  >
                    Generate Another Favicon
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2024 FaviCraft. Generate beautiful favicons for your website.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
