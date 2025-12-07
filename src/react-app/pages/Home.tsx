import { useState } from 'react';
import { Zap, Star, Sparkles, Download, BookOpen, Settings, ArrowRight, Check } from 'lucide-react';
import FileUpload from '@/react-app/components/FileUpload';
import ImageCropper from '@/react-app/components/ImageCropper';
import Footer from '@/react-app/components/Footer';
import { downloadAnimatedSVG, generateMultipleSizes, type AnimationConfig } from '@/react-app/utils/svgAnimations';
import Accordion, { DocumentationAccordion } from '@/react-app/components/Accordion';
import Logo from '@/react-app/components/Logo';

type Step = 'upload' | 'crop' | 'results';

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [faviconData, setFaviconData] = useState<string>('');
  const [seasonalEffect, setSeasonalEffect] = useState<'snow' | 'valentine' | 'halloween' | 'celebration' | null>(null);
  const [animationData, setAnimationData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [showPromotion, setShowPromotion] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handlePromotionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-favicon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, websiteUrl, faviconImage: faviconData })
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setShowPromotion(false); // Optionally hide or keep showing success message
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      setShowPromotion(true);
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
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex flex-col items-center justify-center gap-6 mb-10">
              {/* Chrome URL Address Bar Style Pill */}
              <div className="inline-flex items-center gap-3 px-4 py-3 bg-white rounded-full border border-gray-200/50" style={{
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06), inset 0 -1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.05)'
              }}>
                <Logo showText={false} className="h-10 w-auto" />
              </div>

              <div className="max-w-6xl mx-auto space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                  Professional favicons in seconds.
                </h1>
                <p className="text-base text-gray-600 leading-relaxed max-w-5xl mx-auto">
                  Transform any image into stunning, professional favicons with seasonal flair and custom animations. Completely free and all in one place.
                </p>
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-12">
            {[
              { id: 'upload', label: 'Upload' },
              { id: 'crop', label: 'Crop & Customize' },
              { id: 'results', label: 'Download' }
            ].map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted =
                (currentStep === 'crop' && step.id === 'upload') ||
                (currentStep === 'results' && (step.id === 'upload' || step.id === 'crop'));

              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors duration-200
                      ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' :
                      isCompleted ? 'bg-green-500 text-white' :
                        'bg-gray-100 text-gray-400'}`}
                  >
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium hidden md:block transition-colors duration-200
                      ${isActive ? 'text-gray-900' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}
                  >
                    {step.label}
                  </span>
                  {index < 2 && (
                    <div className={`w-8 md:w-16 h-0.5 mx-2 md:mx-4 transition-colors duration-200
                        ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          {currentStep === 'upload' && (
            <div className="mb-20">
              <FileUpload
                onFileSelect={handleFileSelect}
                isUploading={false}
              />
            </div>
          )}

          {currentStep === 'crop' && selectedFile && (
            <div className="mb-32 text-left">
              <ImageCropper
                imageFile={selectedFile}
                onCropComplete={handleCropComplete}
                onAnimationComplete={handleAnimationComplete}
                onBack={resetToUpload}
              />
            </div>
          )}

          {currentStep === 'results' && faviconData && (
            <div className="mb-32">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
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

                    <div className="mt-6 bg-white/10 border border-white/20 rounded-lg p-4 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 text-xl">⚠️</div>
                        <div className="text-sm text-green-50 space-y-1">
                          <p className="font-semibold text-white">Important: You will receive 7 files</p>
                          <p>
                            Clicking download will simultaneously download all 7 files.
                            If nothing happens, your browser (especially Chrome) might be blocking multiple downloads.
                            Please look for a blocked popup icon in your address bar and grant a one-time approval.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  {/* Preview */}
                  <div className="text-center mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Preview</h3>
                    <div className="inline-block bg-gray-50 rounded-lg p-8">
                      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                        {/* Individual Sizes */}
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

                        {/* Browser Preview */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-xs md:max-w-sm">
                          {/* Browser Tab Bar */}
                          <div className="bg-gray-100 px-2 pt-2 flex items-end gap-1 border-b border-gray-200">
                            {/* Active Tab (User's) */}
                            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-t-lg border-t border-x border-gray-200 shadow-sm relative z-10 -mb-px">
                              <img
                                src={faviconData}
                                alt="favicon preview"
                                className="w-4 h-4 rounded-sm"
                              />
                              <span className="text-xs text-gray-700 font-medium">Your Favicon</span>
                            </div>
                            {/* Inactive Tab (Ours) */}
                            <div className="flex items-center gap-2 px-3 py-2 rounded-t-lg hover:bg-gray-200 transition-colors cursor-default opacity-60 hover:opacity-100">
                              <img src="/favicon.love.logo.small.png" alt="favicon.love" className="w-4 h-4" />
                              <span className="text-xs text-gray-600">favicon.love</span>
                            </div>
                          </div>
                          {/* Browser Content */}
                          <div className="bg-white h-16 w-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Download Options */}
                  <div className="space-y-12">
                    <div className="text-center space-y-6">
                      {/* Static Download */}
                      <div>
                        <button
                          onClick={downloadAllSizes}
                          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
                        >
                          <Download className="w-6 h-6" />
                          <span>Download All Static Favicons</span>
                        </button>
                        <p className="text-gray-600 text-sm mt-3 max-w-lg mx-auto">
                          Get the complete package containing all standard sizes (16x16 through 512x512) and the essential favicon.ico file in one click.
                        </p>
                      </div>

                      {/* Promotion Card */}
                      {showPromotion && submissionStatus !== 'success' && (
                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-8 max-w-lg mx-auto shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <div className="text-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Showcase Your Website! 🚀</h3>
                            <p className="text-sm text-gray-600">
                              Add your newly minted favicon to our gallery and share it to the world. Promote your website too!
                            </p>
                          </div>

                          <form onSubmit={handlePromotionSubmit} className="space-y-4 text-left">
                            <div>
                              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                              <input
                                type="url"
                                id="website"
                                required
                                placeholder="https://your-website.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={websiteUrl}
                                onChange={(e) => setWebsiteUrl(e.target.value)}
                              />
                            </div>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                              <input
                                type="email"
                                id="email"
                                required
                                placeholder="you@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                id="terms"
                                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                              />
                              <label htmlFor="terms" className="text-sm text-gray-600">
                                I agree to the <a href="/terms-of-service" className="text-blue-600 hover:underline">Terms</a> and <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>
                              </label>
                            </div>
                            <button
                              type="submit"
                              disabled={!agreed || isSubmitting}
                              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                              {isSubmitting ? 'Submitting...' : 'Submit to Gallery'}
                            </button>
                          </form>
                          {submissionStatus === 'error' && (
                            <p className="text-red-500 text-sm mt-3 text-center">Something went wrong. Please try again.</p>
                          )}
                        </div>
                      )}

                      {submissionStatus === 'success' && (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-8 max-w-lg mx-auto text-center shadow animate-in fade-in zoom-in duration-300">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-6 h-6 text-green-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">Submitted Successfully!</h3>
                          <p className="text-gray-600 mb-6">Your site is fast-tracked and is now live in the gallery.</p>
                          <a
                            href="/gallery"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-colors"
                          >
                            View in Favicon Gallery <ArrowRight className="ml-2 w-4 h-4" />
                          </a>
                        </div>
                      )}

                      {/* Animated Download */}
                      {animationData?.isAnimated && (
                        <div>
                          <button
                            onClick={downloadAllAnimatedSizes}
                            className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 mx-auto"
                          >
                            <Sparkles className="w-6 h-6" />
                            <span>Download All Animated SVGs</span>
                          </button>
                          <p className="text-gray-600 text-sm mt-3 max-w-lg mx-auto">
                            Get the complete set of animated SVG files with your selected {animationData.type} effect ({animationData.speed}s speed).
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-white px-4 text-sm font-medium text-gray-500">Or download individual files</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-center mb-6">
                        <h4 className="text-gray-900 font-semibold mb-1">Specific Sizes</h4>
                        <p className="text-sm text-gray-500">Download only the specific files you need for your project</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(() => {
                          const seasonalPrefix = seasonalEffect ? `${seasonalEffect}-` : '';
                          return [
                            { size: 16, filename: `${seasonalPrefix}favicon-16x16.png`, label: '16×16 PNG', desc: 'Classic favicon' },
                            { size: 32, filename: `${seasonalPrefix}favicon-32x32.png`, label: '32×32 PNG', desc: 'Modern taskbar' },
                            { size: 48, filename: `${seasonalPrefix}favicon-48x48.png`, label: '48×48 PNG', desc: 'Windows tile' },
                            { size: 180, filename: `${seasonalPrefix}apple-touch-icon.png`, label: 'Apple Touch Icon', desc: 'iOS home screen' },
                            { size: 192, filename: `${seasonalPrefix}android-chrome-192x192.png`, label: 'Android 192', desc: 'Android home screen' },
                            { size: 512, filename: `${seasonalPrefix}android-chrome-512x512.png`, label: 'Android 512', desc: 'PWA splash screen' },
                          ].map((item) => (
                            <button
                              key={item.size}
                              onClick={() => downloadFavicon(item.size, item.filename)}
                              className="flex items-center p-3 bg-white border border-gray-200 hover:border-blue-400 hover:shadow-md rounded-xl transition-all text-left group w-full"
                            >
                              <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mr-4 border border-gray-100 group-hover:border-blue-100 shrink-0 overflow-hidden">
                                <img
                                  src={faviconData}
                                  alt={item.label}
                                  className="w-8 h-8 object-contain"
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">{item.label}</div>
                                <div className="text-xs text-gray-500 truncate">{item.filename}</div>
                              </div>
                              <div className="ml-auto pl-2 text-gray-300 group-hover:text-blue-500 transition-colors">
                                <Download className="w-4 h-4" />
                              </div>
                            </button>
                          ));
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Installation Instructions */}
                  <div className="mt-12 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Installation Instructions</h3>

                      <div className="space-y-6">
                        <div className="bg-blue-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-3 text-base">Quick Setup Guide</h4>
                          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                            <li><strong>Upload Files:</strong> Place all downloaded favicon files in your website's root directory (same folder as index.html)</li>
                            <li><strong>Add HTML Tags:</strong> Copy the code below into your HTML &lt;head&gt; section</li>
                            <li><strong>Test:</strong> Refresh your browser and check if the favicon appears in the tab</li>
                            <li><strong>Clear Cache:</strong> If you don't see changes, try hard refresh (Ctrl+F5 or Cmd+Shift+R)</li>
                          </ol>
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900 mb-3">HTML Code to Add:</p>
                          <p className="text-sm text-gray-600 mb-2">Copy and paste this into your &lt;head&gt; section:</p>
                          <div className="relative bg-black border-2 border-[#33ff33] rounded p-4 overflow-x-auto">
                            <button
                              onClick={() => {
                                const seasonalPrefix = seasonalEffect ? `${seasonalEffect}-` : '';
                                const animatedPrefix = animationData?.isAnimated ? 'animated-' : '';
                                let code = '';
                                if (animationData?.isAnimated) {
                                  code = `<!-- Animated SVG Favicons -->
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
                                  code = `<link rel="icon" href="/${seasonalPrefix}favicon.ico" sizes="32x32">
<link rel="icon" type="image/png" sizes="16x16" href="/${seasonalPrefix}favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/${seasonalPrefix}favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/${seasonalPrefix}favicon-48x48.png">
<link rel="apple-touch-icon" href="/${seasonalPrefix}apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/${seasonalPrefix}android-chrome-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/${seasonalPrefix}android-chrome-512x512.png">`;
                                }
                                navigator.clipboard.writeText(code);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                              }}
                              className="absolute top-2 right-2 p-2 bg-[#33ff33]/10 hover:bg-[#33ff33]/20 border border-[#33ff33] rounded transition-colors flex items-center gap-2"
                              title="Copy to clipboard"
                            >
                              {copied ? (
                                <>
                                  <svg className="w-4 h-4 text-[#33ff33]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-xs font-medium text-[#33ff33]">Copied!</span>
                                </>
                              ) : (
                                <svg className="w-4 h-4 text-[#33ff33]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              )}
                            </button>
                            <pre className="text-[#33ff33] text-xs" style={{ fontFamily: 'Courier, monospace' }}>{(() => {
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
                        </div>

                        {/* Troubleshooting Accordion */}
                        <Accordion
                          items={[
                            {
                              id: 'troubleshooting',
                              title: '🔧 Troubleshooting',
                              defaultOpen: false,
                              content: (
                                <div className="space-y-4 text-sm">
                                  <div>
                                    <p className="font-semibold text-gray-900 mb-2">Favicon not showing?</p>
                                    <ul className="list-disc list-inside ml-2 space-y-1 text-gray-700">
                                      <li>Check that files are in the correct directory (website root)</li>
                                      <li>Clear browser cache (Ctrl+F5 or Cmd+Shift+R)</li>
                                      <li>Verify HTML code is in the &lt;head&gt; section</li>
                                      <li>Wait a few minutes for changes to propagate</li>
                                    </ul>
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-900 mb-2">Animation not working?</p>
                                    <ul className="list-disc list-inside ml-2 space-y-1 text-gray-700">
                                      <li>Ensure you're using a modern browser (Chrome, Firefox, Safari)</li>
                                      <li>Check that SVG files are being served correctly</li>
                                      <li>Verify the fallback ICO file is present for older browsers</li>
                                    </ul>
                                  </div>
                                </div>
                              )
                            }
                          ]}
                        />

                        {(seasonalEffect || animationData?.isAnimated) && (
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">
                              {seasonalEffect && animationData?.isAnimated ? 'Pro Tips' :
                                seasonalEffect ? 'Seasonal Favicon Tips' : 'Animated Favicon Tips'}
                            </h4>
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
                    </div>
                  </div>

                  {/* Generate Another Button */}
                  <div className="flex justify-center mt-8 pt-8">
                    <button
                      onClick={resetToUpload}
                      className="px-12 py-4 bg-gradient-to-r from-[#FF9500] to-[#FF2D55] text-white rounded-lg font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      Generate Another Favicon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {[
              {
                icon: <Star className="w-6 h-6 text-white" />,
                bg: "from-yellow-400 to-orange-500",
                title: "Professional Quality",
                desc: "High-resolution output for all devices"
              },
              {
                icon: <Sparkles className="w-6 h-6 text-white" />,
                bg: "from-purple-400 to-pink-500",
                title: "All Formats",
                desc: "PNG, ICO, SVG automatically generated"
              },
              {
                icon: <Zap className="w-6 h-6 text-white" />,
                bg: "from-blue-400 to-cyan-500",
                title: "Lightning Fast",
                desc: "Instant client-side processing"
              },
              {
                icon: <Settings className="w-6 h-6 text-white" />,
                bg: "from-green-400 to-emerald-500",
                title: "Customizable",
                desc: "Seasonal effects & animations"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-left">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.bg} rounded-xl flex items-center justify-center mb-4 shadow-sm`}>
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* How to Use Guide */}
          <div className="mb-32">
            <div className="text-center mb-12">
              <span className="text-blue-600 font-semibold tracking-wider text-sm uppercase mb-2 block">Get Started</span>
              <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-100 via-purple-100 to-green-100 -z-10"></div>

              <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-sm">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-6 border border-blue-100 relative z-10">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Upload & Crop</h3>
                <p className="text-gray-600 leading-relaxed">
                  Upload your image and use our smart crop tool to select the perfect square area.
                </p>
              </div>

              <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-sm">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-6 border border-purple-100 relative z-10">
                  <span className="text-2xl font-bold text-purple-600">2</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Customize</h3>
                <p className="text-gray-600 leading-relaxed">
                  Add seasonal effects, adjust colors, remove backgrounds, or create CSS animations.
                </p>
              </div>

              <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/50 shadow-sm">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-6 border border-green-100 relative z-10">
                  <span className="text-2xl font-bold text-green-600">3</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">Download</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get all standard favicon sizes in PNG, ICO, and animated SVG formats instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Showcase */}
          <div className="bg-gray-900 rounded-3xl p-12 text-white overflow-hidden relative mb-32">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -ml-20 -mb-20"></div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <span className="text-purple-300 font-semibold tracking-wider text-sm uppercase mb-2 block">Capabilities</span>
                <h2 className="text-3xl font-bold text-white">What You Can Create</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="text-4xl mb-4">❄️</div>
                  <h3 className="font-bold text-white mb-2">Seasonal Effects</h3>
                  <p className="text-sm text-gray-300">Winter, Valentine, Halloween, and celebration themes</p>
                </div>

                <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="text-4xl mb-4">💓</div>
                  <h3 className="font-bold text-white mb-2">CSS Animations</h3>
                  <p className="text-sm text-gray-300">Pulse and rotation effects with customizable speed</p>
                </div>

                <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="font-bold text-white mb-2">Color Effects</h3>
                  <p className="text-sm text-gray-300">Adjust colors, opacity, and blend modes</p>
                </div>

                <div className="text-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="text-4xl mb-4">✂️</div>
                  <h3 className="font-bold text-white mb-2">Background Removal</h3>
                  <p className="text-sm text-gray-300">Create transparent backgrounds for clean favicons</p>
                </div>
              </div>
            </div>
          </div>
          {/* Social Proof / Examples Section */}
          <div className="mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Made with favicon.love</h2>
              <p className="text-xl text-gray-600">See how we transform logos into perfect favicons</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Example 1 */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    ⚡️
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-300" />
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                    <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      ⚡️
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-center">Clean & Crisp</h3>
                <p className="text-sm text-gray-500 text-center mt-1">Optimized for small screens</p>
              </div>

              {/* Example 2 */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center text-2xl">
                    ❤️
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-300" />
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                    <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold animate-pulse">
                      ❤️
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-center">Animated</h3>
                <p className="text-sm text-gray-500 text-center mt-1">Pulse & rotate effects</p>
              </div>

              {/* Example 3 */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                    ❄️
                  </div>
                  <ArrowRight className="w-6 h-6 text-gray-300" />
                  <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
                    <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      ❄️
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-center">Seasonal</h3>
                <p className="text-sm text-gray-500 text-center mt-1">Holiday themes applied instantly</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      </main>

      {/* Help & Documentation Section */}
      {
        currentStep === 'upload' && (
          <section className="py-32 bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Help & Documentation</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Everything you need to know about creating perfect favicons
                </p>
              </div>

              <div className="space-y-8">
                {/* Unified Documentation Section */}
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 mr-3 text-blue-600" />
                    Help & Documentation
                  </h3>
                  <DocumentationAccordion />
                </div>
              </div>
            </div>
          </section>
        )
      }

      {/* Footer */}
      <Footer />
    </div>
  );
}
