import { useState } from 'react';
import { ArrowLeft, Download, Sparkles, Snowflake, Heart, Ghost, PartyPopper } from 'lucide-react';

interface AnimationStudioProps {
  croppedImageData: string;
  onAnimationComplete: (animationData: any) => void;
  onBack: () => void;
}

export default function AnimationStudio({ croppedImageData, onAnimationComplete, onBack }: AnimationStudioProps) {
  const [animationType, setAnimationType] = useState<'pulse' | 'rotate' | 'seasonal'>('pulse');
  const [seasonalEffect, setSeasonalEffect] = useState<'snow' | 'valentine' | 'halloween' | 'celebration'>('snow');
  const [animationSpeed, setAnimationSpeed] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCreateAnimation = async () => {
    setIsProcessing(true);
    
    try {
      const animationData = {
        type: animationType,
        speed: animationSpeed,
        seasonalEffect: animationType === 'seasonal' ? seasonalEffect : null,
        baseImage: croppedImageData
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
              <p className="text-purple-100">Add life to your favicon with animations and effects</p>
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
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
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
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-spin"></div>
                    <div>
                      <div className="font-medium">Rotation Effect</div>
                      <div className="text-sm text-gray-600">Smooth rotating animation</div>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => setAnimationType('seasonal')}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    animationType === 'seasonal'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-5 h-5 text-pink-500" />
                    <div>
                      <div className="font-medium">Seasonal Effects</div>
                      <div className="text-sm text-gray-600">Holiday and celebration themes</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Seasonal Effects */}
            {animationType === 'seasonal' && (
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Choose Effect</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSeasonalEffect('snow')}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      seasonalEffect === 'snow'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Snowflake className="w-6 h-6 mx-auto mb-1 text-blue-500" />
                    <div className="text-sm font-medium">Snow</div>
                  </button>
                  
                  <button
                    onClick={() => setSeasonalEffect('valentine')}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      seasonalEffect === 'valentine'
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Heart className="w-6 h-6 mx-auto mb-1 text-pink-500" />
                    <div className="text-sm font-medium">Valentine</div>
                  </button>
                  
                  <button
                    onClick={() => setSeasonalEffect('halloween')}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      seasonalEffect === 'halloween'
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Ghost className="w-6 h-6 mx-auto mb-1 text-orange-500" />
                    <div className="text-sm font-medium">Halloween</div>
                  </button>
                  
                  <button
                    onClick={() => setSeasonalEffect('celebration')}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      seasonalEffect === 'celebration'
                        ? 'border-yellow-500 bg-yellow-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <PartyPopper className="w-6 h-6 mx-auto mb-1 text-yellow-500" />
                    <div className="text-sm font-medium">Celebration</div>
                  </button>
                </div>
              </div>
            )}

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
                  {animationType === 'seasonal' && `${seasonalEffect} seasonal effect`}
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
        <div className="flex justify-center space-x-4 mt-8 pt-8 border-t border-gray-200">
          <button
            onClick={downloadStaticFavicon}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Download Static</span>
          </button>
          
          <button
            onClick={handleCreateAnimation}
            disabled={isProcessing}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center space-x-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>{isProcessing ? 'Creating...' : 'Create Animated Favicon'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
