interface FaviconPreviewProps {
  croppedImageData: string;
}

export default function FaviconPreview({ croppedImageData }: FaviconPreviewProps) {
  const previewSizes = [
    { size: 16, label: '16×16', description: 'Browser tabs' },
    { size: 32, label: '32×32', description: 'Desktop shortcuts' },
    { size: 48, label: '48×48', description: 'Windows taskbar' },
    { size: 64, label: '64×64', description: 'High-DPI displays' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Favicon Preview</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {previewSizes.map(({ size, label, description }) => (
          <div key={size} className="text-center">
            <div className="bg-gray-50 rounded-lg p-4 mb-3 flex items-center justify-center">
              <div 
                className="border border-gray-300 rounded"
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
                  src={croppedImageData} 
                  alt={`${label} preview`} 
                  className="w-full h-full object-cover rounded"
                />
              </div>
            </div>
            <div className="font-medium text-sm text-gray-900">{label}</div>
            <div className="text-xs text-gray-500">{description}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Preview Notes</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Your favicon will automatically scale to different sizes</li>
          <li>• The transparent background ensures clean appearance</li>
          <li>• All major browsers and platforms are supported</li>
        </ul>
      </div>
    </div>
  );
}
