import { useState } from 'react';
import { Zap, Star, Sparkles, Download, HelpCircle, BookOpen, Settings } from 'lucide-react';
import FileUpload from '@/react-app/components/FileUpload';
import ImageCropper from '@/react-app/components/ImageCropper';
import { downloadAnimatedSVG, generateMultipleSizes, type AnimationConfig } from '@/react-app/utils/svgAnimations';
import Accordion, { BestPracticesAccordion, TechnicalGuideAccordion } from '@/react-app/components/Accordion';

type Step = 'upload' | 'crop' | 'results';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [faviconData, setFaviconData] = useState<string>('');
  const [seasonalEffect, setSeasonalEffect] = useState<'snow' | 'valentine' | 'halloween' | 'celebration' | null>(null);
  const [animationData, setAnimationData] = useState<any>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setCurrentStep('crop');
  };

  const handleCropComplete = (croppedImageData: string, seasonal?: 'snow' | 'valentine' | 'halloween' | 'celebration' | null) => {
    setFaviconData(croppedImageData);
    setSeasonalEffect(seasonal || null);
    setCurrentStep('results');
  };

  const handleAnimationComplete = (animationData: any) => {
    // Store animation data for display and download
    setAnimationData(animationData);
    setFaviconData(animationData.baseImage);
    setCurrentStep('results');
  };

  const resetToUpload = () => {
    setCurrentStep('upload');
    setSelectedFile(null);
    setFaviconData('');
    setSeasonalEffect(null);
    setAnimationData(null);
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
    const seasonalPrefix = seasonalEffect ? `${seasonalEffect}-` : '';
    const sizes = [
      { size: 16, filename: `${seasonalPrefix}favicon-16x16.png` },
      { size: 32, filename: `${seasonalPrefix}favicon-32x32.png` },
      { size: 48, filename: `${seasonalPrefix}favicon-48x48.png` },
      { size: 180, filename: `${seasonalPrefix}apple-touch-icon.png` },
      { size: 192, filename: `${seasonalPrefix}android-chrome-192x192.png` },
      { size: 512, filename: `${seasonalPrefix}android-chrome-512x512.png` },
    ];

    sizes.forEach((item, index) => {
      setTimeout(() => {
        downloadFavicon(item.size, item.filename);
      }, index * 200);
    });

    // Also create and download the ICO file
    setTimeout(() => {
      downloadFavicon(32, `${seasonalPrefix}favicon.ico`);
    }, sizes.length * 200);
  };

  const downloadAnimatedFavicon = (size: number, filename: string) => {
    if (!animationData) return;

    const animationConfig: AnimationConfig = {
      type: animationData.type,
      speed: animationData.speed,
      baseImageData: animationData.baseImage
    };

    const svgMap = generateMultipleSizes(animationConfig);
    const svgContent = svgMap.get(size);
    
    if (svgContent) {
      downloadAnimatedSVG(svgContent, filename);
    }
  };

  const downloadAllAnimatedSizes = () => {
    if (!animationData) return;

    const sizes = [
      { size: 16, filename: `animated-favicon-16x16.svg` },
      { size: 32, filename: `animated-favicon-32x32.svg` },
      { size: 48, filename: `animated-favicon-48x48.svg` },
      { size: 180, filename: `animated-apple-touch-icon.svg` },
      { size: 192, filename: `animated-android-chrome-192x192.svg` },
      { size: 512, filename: `animated-android-chrome-512x512.svg` },
    ];

    sizes.forEach((item, index) => {
      setTimeout(() => {
        downloadAnimatedFavicon(item.size, item.filename);
      }, index * 200);
    });
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
              Create professional favicons from any image with seasonal effects and animations. 
              Generate all standard formats including modern SVG animations.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Professional Quality</h3>
                <p className="text-sm text-gray-600">High-resolution output</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">All Formats</h3>
                <p className="text-sm text-gray-600">PNG, ICO, SVG</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Lightning Fast</h3>
                <p className="text-sm text-gray-600">Client-side processing</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-3">
                  <span className="text-xl">🎨</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Customizable</h3>
                <p className="text-sm text-gray-600">Effects & animations</p>
              </div>
            </div>

            {/* How to Use Guide */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12 max-w-4xl mx-auto shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Use FavIcon Factory</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Upload & Crop</h3>
                  <p className="text-sm text-gray-600">
                    Upload your image and use the crop tool to select the perfect square area for your favicon.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customize</h3>
                  <p className="text-sm text-gray-600">
                    Add seasonal effects, adjust colors, remove backgrounds, or create CSS animations.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Download</h3>
                  <p className="text-sm text-gray-600">
                    Get all standard favicon sizes in PNG, ICO, and animated SVG formats.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Showcase */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-12 max-w-6xl mx-auto shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What You Can Create</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">❄️</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Seasonal Effects</h3>
                  <p className="text-sm text-gray-600">Winter, Valentine, Halloween, and celebration themes</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💓</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">CSS Animations</h3>
                  <p className="text-sm text-gray-600">Pulse and rotation effects with customizable speed</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Color Effects</h3>
                  <p className="text-sm text-gray-600">Adjust colors, opacity, and blend modes</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">✂️</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Background Removal</h3>
                  <p className="text-sm text-gray-600">Create transparent backgrounds for clean favicons</p>
                </div>
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
                    <p className="text-green-100">
                      {animationData?.isAnimated 
                        ? `Download your animated ${animationData.type} favicon files and add them to your website`
                        : seasonalEffect 
                          ? `Download your ${seasonalEffect} themed favicon files and add them to your website`
                          : 'Download your favicon files and add them to your website'
                      }
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {seasonalEffect && (
                        <div className="px-3 py-1 bg-white/20 rounded-full text-sm">
                          {seasonalEffect === 'snow' && '❄️ Winter Theme'}
                          {seasonalEffect === 'valentine' && '❤️ Valentine Theme'}
                          {seasonalEffect === 'halloween' && '🎃 Halloween Theme'}
                          {seasonalEffect === 'celebration' && '🎉 Celebration Theme'}
                        </div>
                      )}
                      {animationData?.isAnimated && (
                        <div className="px-3 py-1 bg-white/20 rounded-full text-sm">
                          {animationData.type === 'pulse' && '💓 Pulse Animation'}
                          {animationData.type === 'rotate' && '🔄 Rotation Animation'}
                          <span className="ml-1">({animationData.speed}s)</span>
                        </div>
                      )}
                    </div>
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
                  <div className="text-center space-y-4">
                    {/* Static Download */}
                    <div>
                      <button
                        onClick={downloadAllSizes}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
                      >
                        <Download className="w-6 h-6" />
                        <span>Download Static Favicons</span>
                      </button>
                      <p className="text-gray-600 text-sm mt-2">
                        Downloads static PNG/ICO files (16×16, 32×32, 48×48, 180×180, 192×192, 512×512, favicon.ico)
                      </p>
                    </div>

                    {/* Animated Download */}
                    {animationData?.isAnimated && (
                      <div>
                        <button
                          onClick={downloadAllAnimatedSizes}
                          className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
                        >
                          <Sparkles className="w-6 h-6" />
                          <span>Download Animated SVG Favicons</span>
                        </button>
                        <p className="text-gray-600 text-sm mt-2">
                          Downloads animated SVG files with {animationData.type} effect ({animationData.speed}s speed)
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {(() => {
                      const seasonalPrefix = seasonalEffect ? `${seasonalEffect}-` : '';
                      return [
                        { size: 16, filename: `${seasonalPrefix}favicon-16x16.png`, label: '16×16 PNG' },
                        { size: 32, filename: `${seasonalPrefix}favicon-32x32.png`, label: '32×32 PNG' },
                        { size: 48, filename: `${seasonalPrefix}favicon-48x48.png`, label: '48×48 PNG' },
                        { size: 180, filename: `${seasonalPrefix}apple-touch-icon.png`, label: 'Apple Touch Icon' },
                        { size: 192, filename: `${seasonalPrefix}android-chrome-192x192.png`, label: 'Android Chrome 192×192' },
                        { size: 512, filename: `${seasonalPrefix}android-chrome-512x512.png`, label: 'Android Chrome 512×512' },
                      ].map((item) => (
                        <button
                          key={item.size}
                          onClick={() => downloadFavicon(item.size, item.filename)}
                          className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors text-center"
                        >
                          {item.label}
                        </button>
                      ));
                    })()}
                  </div>
                </div>

                {/* Installation Instructions */}
                <div className="mt-12">
                  <Accordion
                    items={[
                      {
                        id: 'installation',
                        title: '📋 Installation Instructions',
                        icon: <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"><span className="text-blue-600 text-lg">📋</span></div>,
                        defaultOpen: true,
                        content: (
                          <div className="space-y-4 text-sm text-gray-700">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h5 className="font-semibold text-blue-900 mb-2">Quick Setup Guide</h5>
                              <ol className="list-decimal list-inside space-y-1 text-blue-800">
                                <li><strong>Upload Files:</strong> Place all downloaded favicon files in your website's root directory (same folder as index.html)</li>
                                <li><strong>Add HTML Tags:</strong> Copy the code below into your HTML &lt;head&gt; section</li>
                                <li><strong>Test:</strong> Refresh your browser and check if the favicon appears in the tab</li>
                                <li><strong>Clear Cache:</strong> If you don't see changes, try hard refresh (Ctrl+F5 or Cmd+Shift+R)</li>
                              </ol>
                            </div>
                            <div>
                              <strong>HTML Code to Add:</strong> Copy and paste this into your &lt;head&gt; section:
                            </div>
                            <div className="bg-gray-900 text-gray-100 p-4 rounded text-xs overflow-x-auto">
                              <pre>{(() => {
                                const seasonalPrefix = seasonalEffect ? `${seasonalEffect}-` : '';
                                const animatedPrefix = animationData?.isAnimated ? 'animated-' : '';
                                
                                if (animationData?.isAnimated) {
                                  return `<!-- Animated SVG Favicons -->
<link rel="icon" type="image/svg+xml" href="/${animatedPrefix}favicon-32x32.svg">
<link rel="icon" type="image/svg+xml" sizes="16x16" href="/${animatedPrefix}favicon-16x16.svg">
<link rel="icon" type="image/svg+xml" sizes="32x32" href="/${animatedPrefix}favicon-32x32.svg">
<link rel="icon" type="image/svg+xml" sizes="48x48" href="/${animatedPrefix}favicon-48x48.svg">
<link rel="apple-touch-icon" href="/${animatedPrefix}apple-touch-icon.svg">
<link rel="icon" type="image/svg+xml" sizes="192x192" href="/${animatedPrefix}android-chrome-192x192.svg">
<link rel="icon" type="image/svg+xml" sizes="512x512" href="/${animatedPrefix}android-chrome-512x512.svg">

<!-- Fallback for older browsers -->
<link rel="icon" href="/${seasonalPrefix}favicon.ico" sizes="32x32">`;
                                } else {
                                  return `<link rel="icon" href="/${seasonalPrefix}favicon.ico" sizes="32x32">
<link rel="icon" type="image/png" sizes="16x16" href="/${seasonalPrefix}favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/${seasonalPrefix}favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/${seasonalPrefix}favicon-48x48.png">
<link rel="apple-touch-icon" href="/${seasonalPrefix}apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/${seasonalPrefix}android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/${seasonalPrefix}android-chrome-512x512.png">`;
                                }
                              })()}</pre>
                            </div>
                            {/* Troubleshooting Section */}
                            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                              <h5 className="font-semibold text-yellow-900 mb-3">🔧 Troubleshooting</h5>
                              <div className="space-y-3 text-sm text-yellow-800">
                                <div>
                                  <strong>Favicon not showing?</strong>
                                  <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                                    <li>Check that files are in the correct directory (website root)</li>
                                    <li>Clear browser cache (Ctrl+F5 or Cmd+Shift+R)</li>
                                    <li>Verify HTML code is in the &lt;head&gt; section</li>
                                    <li>Wait a few minutes for changes to propagate</li>
                                  </ul>
                                </div>
                                <div>
                                  <strong>Animation not working?</strong>
                                  <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                                    <li>Ensure you're using a modern browser (Chrome, Firefox, Safari)</li>
                                    <li>Check that SVG files are being served correctly</li>
                                    <li>Verify the fallback ICO file is present for older browsers</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {(seasonalEffect || animationData?.isAnimated) && (
                              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                <h5 className="font-medium text-blue-900 mb-2">
                                  {seasonalEffect && animationData?.isAnimated ? 'Pro Tips' : 
                                   seasonalEffect ? 'Seasonal Favicon Tips' : 'Animated Favicon Tips'}
                                </h5>
                                <ul className="text-sm text-blue-800 space-y-1">
                                  {seasonalEffect && (
                                    <>
                                      <li>• Consider updating your favicon seasonally to match your brand's theme</li>
                                      <li>• Keep the original favicon files as backup for when you want to switch back</li>
                                    </>
                                  )}
                                  {animationData?.isAnimated && (
                                    <>
                                      <li>• Animated SVG favicons work in modern browsers (Chrome, Firefox, Safari)</li>
                                      <li>• The fallback ICO file ensures compatibility with older browsers</li>
                                      <li>• Animation speed is set to {animationData.speed} seconds - adjust if needed</li>
                                    </>
                                  )}
                                  <li>• Test your favicon across different browsers and devices</li>
                                </ul>
                              </div>
                            )}
                          </div>
                        )
                      }
                    ]}
                  />
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

      {/* Help & Documentation Section */}
      {currentStep === 'upload' && (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Help & Documentation</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know about creating perfect favicons
              </p>
            </div>

            <div className="space-y-8">
              {/* Best Practices Accordion */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
                  Best Practices & Guidelines
                </h3>
                <BestPracticesAccordion />
              </div>

              {/* Technical Guide Accordion */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Settings className="w-8 h-8 mr-3 text-purple-600" />
                  Technical Guide & Specifications
                </h3>
                <TechnicalGuideAccordion />
              </div>

              {/* Quick Help Accordion */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <HelpCircle className="w-8 h-8 mr-3 text-green-600" />
                  Quick Help & Troubleshooting
                </h3>
                <Accordion
                  items={[
                    {
                      id: 'troubleshooting',
                      title: '🔧 Common Issues & Solutions',
                      icon: <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center"><span className="text-yellow-600 text-lg">🔧</span></div>,
                      content: (
                        <div className="space-y-4">
                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-yellow-900 mb-3">Favicon Not Showing?</h4>
                            <ul className="list-disc list-inside space-y-2 text-sm text-yellow-800">
                              <li>Check that files are in the correct directory (website root)</li>
                              <li>Clear browser cache (Ctrl+F5 or Cmd+Shift+R)</li>
                              <li>Verify HTML code is in the &lt;head&gt; section</li>
                              <li>Wait a few minutes for changes to propagate</li>
                              <li>Check file permissions on your web server</li>
                            </ul>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-3">Animation Not Working?</h4>
                            <ul className="list-disc list-inside space-y-2 text-sm text-blue-800">
                              <li>Ensure you're using a modern browser (Chrome, Firefox, Safari)</li>
                              <li>Check that SVG files are being served correctly</li>
                              <li>Verify the fallback ICO file is present for older browsers</li>
                              <li>Test in incognito/private browsing mode</li>
                            </ul>
                          </div>
                          <div className="bg-red-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-red-900 mb-3">File Upload Issues?</h4>
                            <ul className="list-disc list-inside space-y-2 text-sm text-red-800">
                              <li>Ensure image is in supported format (JPG, PNG, GIF, WebP)</li>
                              <li>Check file size is under 10MB</li>
                              <li>Try a different image if cropping fails</li>
                              <li>Refresh the page and try again</li>
                            </ul>
                          </div>
                        </div>
                      )
                    },
                    {
                      id: 'faq',
                      title: '❓ Frequently Asked Questions',
                      icon: <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center"><span className="text-indigo-600 text-lg">❓</span></div>,
                      content: (
                        <div className="space-y-4">
                          <div className="space-y-4">
                            <div className="border-l-4 border-indigo-500 pl-4">
                              <h4 className="font-semibold text-gray-900">What image formats are supported?</h4>
                              <p className="text-sm text-gray-600 mt-1">We support JPG, PNG, GIF, and WebP formats. PNG with transparency works best for favicons.</p>
                            </div>
                            <div className="border-l-4 border-indigo-500 pl-4">
                              <h4 className="font-semibold text-gray-900">Do I need all the different sizes?</h4>
                              <p className="text-sm text-gray-600 mt-1">Yes! Different devices and browsers use different sizes. We generate all standard sizes for maximum compatibility.</p>
                            </div>
                            <div className="border-l-4 border-indigo-500 pl-4">
                              <h4 className="font-semibold text-gray-900">Will my animated favicon work everywhere?</h4>
                              <p className="text-sm text-gray-600 mt-1">Animated SVG favicons work in modern browsers. We also provide static PNG/ICO fallbacks for older browsers.</p>
                            </div>
                            <div className="border-l-4 border-indigo-500 pl-4">
                              <h4 className="font-semibold text-gray-900">How often should I update my favicon?</h4>
                              <p className="text-sm text-gray-600 mt-1">Update seasonally or when rebranding. Keep it consistent with your brand identity for recognition.</p>
                            </div>
                            <div className="border-l-4 border-indigo-500 pl-4">
                              <h4 className="font-semibold text-gray-900">Is this tool free to use?</h4>
                              <p className="text-sm text-gray-600 mt-1">Yes! FavIcon Factory is completely free to use. No registration or payment required.</p>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  ]}
                  allowMultiple={true}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>© 2025 FavIcon Factory. Generate beautiful favicons for your website.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
