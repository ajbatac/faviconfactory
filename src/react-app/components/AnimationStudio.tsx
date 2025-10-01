import { useState } from 'react';
import { ArrowLeft, Download, Sparkles, Zap, RotateCw } from 'lucide-react';
import { generateAnimatedSVG, downloadAnimatedSVG, generateMultipleSizes, type AnimationConfig } from '@/react-app/utils/svgAnimations';

interface AnimationStudioProps {
  croppedImageData: string;
  onAnimationComplete: (animationData: any) => void;
  onBack: () => void;
}

export default function AnimationStudio({ croppedImageData, onAnimationComplete, onBack }: AnimationStudioProps) {
  const [animationType, setAnimationType] = useState<'pulse' | 'rotate'>('pulse');
  const [animationSpeed, setAnimationSpeed] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCreateAnimation = async () => {
    setIsProcessing(true);
    
    try {
      const animationConfig: AnimationConfig = {
        type: animationType,
        speed: animationSpeed,
        baseImageData: croppedImageData
      };
      
      // Generate animated SVG
      const animatedSVG = generateAnimatedSVG(animationConfig);
      
      const animationData = {
        type: animationType,
        speed: animationSpeed,
        baseImage: croppedImageData,
        animatedSVG: animatedSVG,
        isAnimated: true
      };
      
      onAnimationComplete(animationData);
    } catch (error) {
      console.error('Animation creation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadStaticFavicon = () => {
    // Create download link for the static version
    const link = document.createElement('a');
    link.href = croppedImageData;
    link.download = 'favicon-static.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAnimatedFavicon = () => {
    const animationConfig: AnimationConfig = {
      type: animationType,
      speed: animationSpeed,
      baseImageData: croppedImageData
    };
    
    const animatedSVG = generateAnimatedSVG(animationConfig);
    downloadAnimatedSVG(animatedSVG, `animated-favicon-${animationType}.svg`);
  };

  const downloadAllAnimatedSizes = () => {
    const animationConfig: AnimationConfig = {
      type: animationType,
      speed: animationSpeed,
      baseImageData: croppedImageData
    };
    
    const svgMap = generateMultipleSizes(animationConfig);
    
    // Download each size with a delay
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
        const svgContent = svgMap.get(item.size);
        if (svgContent) {
          downloadAnimatedSVG(svgContent, item.filename);
        }
      }, index * 200);
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl font-bold mb-1">Animation Studio</h2>
              <p className="text-purple-100">Add CSS animations to your favicon (pulse, rotate)</p>
            </div>
          </div>
          <div className="bg-white/20 p-3 rounded-full">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Animation Controls */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Animation Type</h3>
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => setAnimationType('pulse')}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    animationType === 'pulse'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-purple-500" />
                    <div>
                      <div className="font-medium">Pulse Effect</div>
                      <div className="text-sm text-gray-600">Gentle breathing animation</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setAnimationType('rotate')}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    animationType === 'rotate'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RotateCw className="w-5 h-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Rotation Effect</div>
                      <div className="text-sm text-gray-600">Smooth rotating animation</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Note about Seasonal Effects */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tip</h4>
              <p className="text-sm text-blue-800">
                For seasonal effects (snow, valentine, halloween, celebration), use the "Seasonal" tab in the main editor before coming here.
              </p>
            </div>

            {/* Animation Speed */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Animation Speed: {animationSpeed}s
              </h4>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Fast (0.5s)</span>
                <span>Slow (5s)</span>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Preview</h3>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="inline-block">
                  <div 
                    className="w-16 h-16 border-2 border-gray-300 rounded-lg bg-white shadow-sm"
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0),
                        linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)
                      `,
                      backgroundSize: '8px 8px',
                      backgroundPosition: '0 0, 4px 4px',
                    }}
                  >
                    <img
                      src={croppedImageData}
                      alt="Favicon Preview"
                      className={`w-full h-full object-cover rounded-lg ${
                        animationType === 'pulse' ? 'animate-pulse' :
                        animationType === 'rotate' ? 'animate-spin' : ''
                      }`}
                      style={{
                        animationDuration: `${animationSpeed}s`
                      }}
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  {animationType === 'pulse' && 'Gentle pulsing effect'}
                  {animationType === 'rotate' && 'Smooth rotation animation'}
                </p>
              </div>
            </div>

            {/* Size Examples */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Size Examples</h4>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div 
                    className="w-4 h-4 border border-gray-300 rounded"
                    style={{
                      backgroundImage: `url(${croppedImageData})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-1">16×16</div>
                </div>
                <div className="text-center">
                  <div 
                    className="w-8 h-8 border border-gray-300 rounded"
                    style={{
                      backgroundImage: `url(${croppedImageData})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-1">32×32</div>
                </div>
                <div className="text-center">
                  <div 
                    className="w-12 h-12 border border-gray-300 rounded"
                    style={{
                      backgroundImage: `url(${croppedImageData})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="text-xs text-gray-500 mt-1">48×48</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mt-8 pt-8 border-t border-gray-200">
          {/* Download Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={downloadStaticFavicon}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Static PNG</span>
            </button>
            
            <button
              onClick={downloadAnimatedFavicon}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Download Animated SVG</span>
            </button>
          </div>
          
          {/* Download All Sizes */}
          <div className="text-center">
            <button
              onClick={downloadAllAnimatedSizes}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              <Download className="w-5 h-5" />
              <span>Download All Animated Sizes</span>
            </button>
            <p className="text-gray-600 text-sm mt-2">
              Downloads animated SVG favicons in all standard sizes
            </p>
          </div>
          
          {/* Generate Button */}
          <div className="text-center">
            <button
              onClick={handleCreateAnimation}
              disabled={isProcessing}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center space-x-2 mx-auto"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isProcessing ? 'Creating...' : 'Generate & Continue'}</span>
            </button>
            <p className="text-gray-600 text-sm mt-2">
              Generate animated favicon and continue to results page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
