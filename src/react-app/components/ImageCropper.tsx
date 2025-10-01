import { useState, useRef, useEffect } from 'react';
import { Crop, RotateCcw, ZoomIn, ZoomOut, Move, Palette, Eraser, Sparkles, Snowflake } from 'lucide-react';
import FaviconPreview from './FaviconPreview';
import AnimationStudio from './AnimationStudio';
import { applySeasonalEffect, type SeasonalConfig } from '@/react-app/utils/seasonalEffects';

interface ImageCropperProps {
  imageFile: File;
  onCropComplete: (croppedImageData: string, seasonal?: 'snow' | 'valentine' | 'halloween' | 'celebration' | null) => void;
  onAnimationComplete?: (animationData: any) => void;
  onBack: () => void;
}

interface ColorOverlay {
  enabled: boolean;
  color: string;
  opacity: number;
  blendMode: string;
}

export default function ImageCropper({ imageFile, onCropComplete, onAnimationComplete, onBack }: ImageCropperProps) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewImageData, setPreviewImageData] = useState<string>('');
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [removeBackground, setRemoveBackground] = useState(false);
  const [colorOverlay, setColorOverlay] = useState<ColorOverlay>({
    enabled: false,
    color: '#000000',
    opacity: 0.5,
    blendMode: 'multiply'
  });
  const [activeTab, setActiveTab] = useState('crop');
  const [showChoiceScreen, setShowChoiceScreen] = useState(false);
  const [showAnimationStudio, setShowAnimationStudio] = useState(false);
  const [finalCroppedData, setFinalCroppedData] = useState<string>('');
  const [seasonalEffect, setSeasonalEffect] = useState<'snow' | 'valentine' | 'halloween' | 'celebration' | null>(null);
  const [seasonalPreviewData, setSeasonalPreviewData] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string);
    };
    reader.readAsDataURL(imageFile);
  }, [imageFile]);

  useEffect(() => {
    if (imageSrc && imageRef.current) {
      const img = imageRef.current;
      img.onload = () => {
        const container = containerRef.current;
        if (!container) return;

        const imgRect = img.getBoundingClientRect();
        
        // Calculate initial crop area (square in center)
        const size = Math.min(imgRect.width, imgRect.height) * 0.8;
        const x = (imgRect.width - size) / 2;
        const y = (imgRect.height - size) / 2;
        
        setCropArea({ x, y, width: size, height: size });
        updatePreview();
      };
    }
  }, [imageSrc]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeTab !== 'crop') return;
    
    setIsDragging(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Start new crop area
    setCropArea({ x, y, width: 0, height: 0 });
  };

  const handleImageMouseDown = (e: React.MouseEvent) => {
    if (activeTab !== 'position') return;
    
    e.stopPropagation();
    setIsDraggingImage(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && containerRef.current && activeTab === 'crop') {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const width = x - cropArea.x;
      const height = y - cropArea.y;
      const size = Math.min(Math.abs(width), Math.abs(height));
      
      setCropArea(prev => ({
        ...prev,
        width: size,
        height: size
      }));

      updatePreview();
    }

    if (isDraggingImage && activeTab === 'position') {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
      updatePreview();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsDraggingImage(false);
  };

  const updatePreview = () => {
    if (!imageRef.current || !canvasRef.current || cropArea.width === 0 || cropArea.height === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageRef.current;
    
    if (!ctx) return;

    canvas.width = 64;
    canvas.height = 64;
    
    // Clear canvas
    ctx.clearRect(0, 0, 64, 64);
    
    // Calculate source coordinates
    const imgRect = img.getBoundingClientRect();
    const scaleX = img.naturalWidth / imgRect.width;
    const scaleY = img.naturalHeight / imgRect.height;

    const sourceX = (cropArea.x - position.x) * scaleX / scale;
    const sourceY = (cropArea.y - position.y) * scaleY / scale;
    const sourceWidth = cropArea.width * scaleX / scale;
    const sourceHeight = cropArea.height * scaleY / scale;

    // Save context for transformations
    ctx.save();

    // Apply background removal if enabled
    if (removeBackground) {
      ctx.globalCompositeOperation = 'source-over';
    }

    // Draw the image
    ctx.drawImage(
      img,
      sourceX, sourceY, sourceWidth, sourceHeight,
      0, 0, 64, 64
    );

    // Apply color overlay if enabled
    if (colorOverlay.enabled) {
      ctx.globalCompositeOperation = colorOverlay.blendMode as GlobalCompositeOperation;
      ctx.fillStyle = colorOverlay.color;
      ctx.globalAlpha = colorOverlay.opacity;
      ctx.fillRect(0, 0, 64, 64);
    }

    // Restore context
    ctx.restore();

    setPreviewImageData(canvas.toDataURL('image/png'));
  };

  const handleScaleChange = (newScale: number) => {
    setScale(Math.max(0.1, Math.min(5, newScale)));
    updatePreview();
  };

  const resetPosition = () => {
    setPosition({ x: 0, y: 0 });
    setScale(1);
    updatePreview();
  };

  // Update preview when settings change
  useEffect(() => {
    updatePreview();
  }, [scale, position, removeBackground, colorOverlay]);

  // Generate seasonal preview when seasonal effect changes
  useEffect(() => {
    if (seasonalEffect && previewImageData) {
      generateSeasonalPreview();
    } else {
      setSeasonalPreviewData('');
    }
  }, [seasonalEffect, previewImageData]);

  const generateSeasonalPreview = async () => {
    if (!seasonalEffect || !previewImageData) return;
    
    try {
      const seasonalData = await applySeasonalEffect(previewImageData, seasonalEffect, 64);
      setSeasonalPreviewData(seasonalData);
    } catch (error) {
      console.error('Error generating seasonal preview:', error);
    }
  };

  const processCrop = async () => {
    if (!imageRef.current || !canvasRef.current) return;

    setIsProcessing(true);
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = imageRef.current;
      
      if (!ctx) {
        console.error('Failed to get canvas context');
        setIsProcessing(false);
        return;
      }

      // Set canvas size to final favicon size
      canvas.width = 512;
      canvas.height = 512;
      
      // Clear canvas
      ctx.clearRect(0, 0, 512, 512);

      // Calculate source coordinates with all transformations
      const imgRect = img.getBoundingClientRect();
      const scaleX = img.naturalWidth / imgRect.width;
      const scaleY = img.naturalHeight / imgRect.height;

      const sourceX = (cropArea.x - position.x) * scaleX / scale;
      const sourceY = (cropArea.y - position.y) * scaleY / scale;
      const sourceWidth = cropArea.width * scaleX / scale;
      const sourceHeight = cropArea.height * scaleY / scale;

      // Save context for transformations
      ctx.save();

      // Apply background removal if enabled
      if (removeBackground) {
        ctx.globalCompositeOperation = 'source-over';
      }

      // Draw the cropped and transformed image
      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, 512, 512
      );

      // Apply color overlay if enabled
      if (colorOverlay.enabled) {
        ctx.globalCompositeOperation = colorOverlay.blendMode as GlobalCompositeOperation;
        ctx.fillStyle = colorOverlay.color;
        ctx.globalAlpha = colorOverlay.opacity;
        ctx.fillRect(0, 0, 512, 512);
      }

      // Restore context
      ctx.restore();

      // Convert to data URL
      let croppedImageData = canvas.toDataURL('image/png');
      
      // Apply seasonal effect if selected
      if (seasonalEffect) {
        try {
          croppedImageData = await applySeasonalEffect(croppedImageData, seasonalEffect, 512);
        } catch (error) {
          console.error('Error applying seasonal effect:', error);
        }
      }
      
      setFinalCroppedData(croppedImageData);
      
      // Show choice between static or animated
      setShowChoiceScreen(true);
    } catch (error) {
      console.error('Error processing crop:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStaticGeneration = () => {
    onCropComplete(finalCroppedData, seasonalEffect);
  };

  const handleAnimationGeneration = (animationData: any) => {
    if (onAnimationComplete) {
      onAnimationComplete({ ...animationData, baseImage: finalCroppedData });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Customize Your Favicon</h2>
              <p className="text-gray-600">Use the tools below to perfect your favicon</p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Customization Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('crop')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                activeTab === 'crop' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Crop className="w-4 h-4" />
              <span>Crop</span>
            </button>
            <button
              onClick={() => setActiveTab('position')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                activeTab === 'position' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Move className="w-4 h-4" />
              <span>Position & Zoom</span>
            </button>
            <button
              onClick={() => setActiveTab('background')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                activeTab === 'background' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Eraser className="w-4 h-4" />
              <span>Background</span>
            </button>
            <button
              onClick={() => setActiveTab('color')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                activeTab === 'color' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Color</span>
            </button>
            <button
              onClick={() => setActiveTab('seasonal')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                activeTab === 'seasonal' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Snowflake className="w-4 h-4" />
              <span>Seasonal</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Editor */}
            <div className="lg:col-span-2">
              <div className="relative bg-white rounded-lg border-2 border-gray-200 p-4 mx-auto" style={{ minHeight: '400px' }}>
                <div
                  ref={containerRef}
                  className={`relative inline-block select-none mx-auto rounded-lg overflow-hidden ${
                    activeTab === 'crop' ? 'cursor-crosshair' : 
                    activeTab === 'position' ? 'cursor-move' : 'cursor-default'
                  }`}
                  style={{
                    backgroundImage: `
                      linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0),
                      linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)
                    `,
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 10px 10px',
                    backgroundColor: '#ffffff'
                  }}
                  onMouseDown={activeTab === 'crop' ? handleMouseDown : undefined}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {imageSrc && (
                    <>
                      <img
                        ref={imageRef}
                        src={imageSrc}
                        alt="Upload preview"
                        className="max-w-full max-h-96 rounded-lg"
                        draggable={false}
                        style={{
                          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                          transformOrigin: 'center center',
                          filter: removeBackground ? 'drop-shadow(0 0 10px rgba(0,0,0,0.5))' : 'none',
                          opacity: colorOverlay.enabled ? 0.8 : 1
                        }}
                        onMouseDown={handleImageMouseDown}
                      />
                      
                      {/* Color overlay */}
                      {colorOverlay.enabled && (
                        <div
                          className="absolute inset-0 rounded-lg pointer-events-none"
                          style={{
                            backgroundColor: colorOverlay.color,
                            opacity: colorOverlay.opacity,
                            mixBlendMode: colorOverlay.blendMode as any,
                            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                            transformOrigin: 'center center',
                          }}
                        />
                      )}
                      
                      {/* Crop overlay */}
                      <div
                        className="absolute border-2 border-blue-500 bg-blue-500/10 pointer-events-none"
                        style={{
                          left: cropArea.x,
                          top: cropArea.y,
                          width: cropArea.width,
                          height: cropArea.height,
                        }}
                      >
                        {/* Corner handles */}
                        <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 border border-white"></div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 border border-white"></div>
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 border border-white"></div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 border border-white"></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Controls Panel */}
            <div className="space-y-6">
              {/* Crop Controls */}
              {activeTab === 'crop' && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Crop Tool</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Click and drag to create a square crop area for your favicon.
                  </p>
                  {cropArea.width > 0 && (
                    <div className="text-sm text-gray-700">
                      Size: {Math.round(cropArea.width)} × {Math.round(cropArea.height)}px
                    </div>
                  )}
                </div>
              )}

              {/* Position & Zoom Controls */}
              {activeTab === 'position' && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-gray-900">Position & Zoom</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zoom: {scale.toFixed(1)}x
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleScaleChange(scale - 0.1)}
                        className="p-2 bg-white border rounded hover:bg-gray-50"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <input
                        type="range"
                        min="0.1"
                        max="3"
                        step="0.1"
                        value={scale}
                        onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                        className="flex-1"
                      />
                      <button
                        onClick={() => handleScaleChange(scale + 0.1)}
                        className="p-2 bg-white border rounded hover:bg-gray-50"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position: {Math.round(position.x)}, {Math.round(position.y)}
                    </label>
                    <p className="text-sm text-gray-600 mb-2">
                      Drag the image to reposition it within the crop area.
                    </p>
                  </div>

                  <button
                    onClick={resetPosition}
                    className="w-full px-3 py-2 bg-white border rounded text-sm hover:bg-gray-50"
                  >
                    Reset Position & Zoom
                  </button>
                </div>
              )}

              {/* Background Controls */}
              {activeTab === 'background' && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-gray-900">Background Options</h3>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="removeBackground"
                      checked={removeBackground}
                      onChange={(e) => setRemoveBackground(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="removeBackground" className="text-sm font-medium text-gray-700">
                      Transparent Background
                    </label>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    Enable transparent background for modern browsers and clean favicon appearance.
                  </p>
                </div>
              )}

              {/* Color Controls */}
              {activeTab === 'color' && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-gray-900">Color Effects</h3>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="colorOverlay"
                      checked={colorOverlay.enabled}
                      onChange={(e) => setColorOverlay(prev => ({ ...prev, enabled: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="colorOverlay" className="text-sm font-medium text-gray-700">
                      Enable Color Overlay
                    </label>
                  </div>

                  {colorOverlay.enabled && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Color
                        </label>
                        <input
                          type="color"
                          value={colorOverlay.color}
                          onChange={(e) => setColorOverlay(prev => ({ ...prev, color: e.target.value }))}
                          className="w-full h-10 rounded border border-gray-300"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Opacity: {Math.round(colorOverlay.opacity * 100)}%
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.05"
                          value={colorOverlay.opacity}
                          onChange={(e) => setColorOverlay(prev => ({ ...prev, opacity: parseFloat(e.target.value) }))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Blend Mode
                        </label>
                        <select
                          value={colorOverlay.blendMode}
                          onChange={(e) => setColorOverlay(prev => ({ ...prev, blendMode: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        >
                          <option value="multiply">Multiply</option>
                          <option value="overlay">Overlay</option>
                          <option value="soft-light">Soft Light</option>
                          <option value="hard-light">Hard Light</option>
                          <option value="color-burn">Color Burn</option>
                          <option value="color-dodge">Color Dodge</option>
                          <option value="normal">Normal</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Seasonal Effects Controls */}
              {activeTab === 'seasonal' && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-gray-900">Seasonal Effects</h3>
                  <p className="text-sm text-gray-600">
                    Add seasonal flair to your favicon with themed overlays and color effects.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { type: 'snow', label: '❄️ Snow', description: 'Winter theme' },
                        { type: 'valentine', label: '❤️ Valentine', description: 'Love theme' },
                        { type: 'halloween', label: '🎃 Halloween', description: 'Spooky theme' },
                        { type: 'celebration', label: '🎉 Celebration', description: 'Party theme' }
                      ].map((effect) => (
                        <button
                          key={effect.type}
                          onClick={() => setSeasonalEffect(effect.type as any)}
                          className={`p-3 rounded-lg border-2 text-left transition-all ${
                            seasonalEffect === effect.type
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="font-medium text-sm">{effect.label}</div>
                          <div className="text-xs text-gray-500">{effect.description}</div>
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setSeasonalEffect(null)}
                      className={`w-full p-3 rounded-lg border-2 text-center transition-all ${
                        seasonalEffect === null
                          ? 'border-gray-400 bg-gray-100 text-gray-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium text-sm">No Seasonal Effect</div>
                      <div className="text-xs text-gray-500">Clean, original design</div>
                    </button>
                  </div>

                  {seasonalEffect && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Effect Preview</h4>
                      <p className="text-sm text-blue-700">
                        This effect will add a themed overlay and color filter to your favicon.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Live Preview */}
              {previewImageData && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Live Preview</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div 
                          className="w-8 h-8 rounded border border-gray-300"
                          style={{
                            backgroundImage: `
                              linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0),
                              linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)
                            `,
                            backgroundSize: '4px 4px',
                            backgroundPosition: '0 0, 2px 2px',
                            backgroundColor: '#ffffff'
                          }}
                        >
                          <img 
                            src={previewImageData} 
                            alt="Preview" 
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">Original</span>
                    </div>
                    
                    {seasonalPreviewData && (
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div 
                            className="w-8 h-8 rounded border border-gray-300"
                            style={{
                              backgroundImage: `
                                linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0),
                                linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%, #f0f0f0)
                              `,
                              backgroundSize: '4px 4px',
                              backgroundPosition: '0 0, 2px 2px',
                              backgroundColor: '#ffffff'
                            }}
                          >
                            <img 
                              src={seasonalPreviewData} 
                              alt="Seasonal Preview" 
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        </div>
                        <span className="text-sm text-gray-600">With Seasonal Effect</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {!showAnimationStudio && !showChoiceScreen ? (
            <div className="flex justify-center mt-8">
              <button
                onClick={processCrop}
                disabled={isProcessing || cropArea.width === 0}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center space-x-2"
              >
                <Crop className="w-5 h-5" />
                <span>{isProcessing ? 'Processing...' : 'Continue to Generation'}</span>
              </button>
            </div>
          ) : null}

          {showChoiceScreen ? (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mt-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Favicon Style</h3>
                <p className="text-gray-600">Create a static favicon or add animations and effects</p>
              </div>
              
              <div className="flex justify-center space-x-6">
                <button
                  onClick={handleStaticGeneration}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-3"
                >
                  <Crop className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-semibold">Static Favicon</div>
                    <div className="text-sm text-blue-200">Classic, fast-loading</div>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                    setShowChoiceScreen(false);
                    setShowAnimationStudio(true);
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-3"
                >
                  <Sparkles className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-semibold">Animation Studio</div>
                    <div className="text-sm text-purple-200">Add animations & effects</div>
                  </div>
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Preview Section */}
        {previewImageData && (
          <div className="mt-8">
            <FaviconPreview croppedImageData={previewImageData} />
          </div>
        )}
      </div>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
      
      {/* Animation Studio Modal */}
      {showAnimationStudio && finalCroppedData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <AnimationStudio
              croppedImageData={finalCroppedData}
              onAnimationComplete={handleAnimationGeneration}
              onBack={() => {
                setShowAnimationStudio(false);
                setShowChoiceScreen(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
