export interface SeasonalConfig {
  type: 'snow' | 'valentine' | 'halloween' | 'celebration';
  overlayIcon?: string;
  overlayColor?: string;
  filterColor?: string;
  filterOpacity?: number;
}

const seasonalConfigs: Record<string, SeasonalConfig> = {
  snow: {
    type: 'snow',
    overlayIcon: '❄️',
    overlayColor: '#4A90E2',
    filterColor: '#E3F2FD',
    filterOpacity: 0.3
  },
  valentine: {
    type: 'valentine',
    overlayIcon: '❤️',
    overlayColor: '#E91E63',
    filterColor: '#FCE4EC',
    filterOpacity: 0.35
  },
  halloween: {
    type: 'halloween',
    overlayIcon: '🎃',
    overlayColor: '#FF6F00',
    filterColor: '#FFF3E0',
    filterOpacity: 0.25
  },
  celebration: {
    type: 'celebration',
    overlayIcon: '🎉',
    overlayColor: '#FFC107',
    filterColor: '#FFF9C4',
    filterOpacity: 0.3
  }
};

export async function applySeasonalEffect(
  baseImageData: string,
  effectType: 'snow' | 'valentine' | 'halloween' | 'celebration',
  size: number = 512
): Promise<string> {
  const config = seasonalConfigs[effectType];
  
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    if (!ctx) {
      reject(new Error('Failed to get canvas context'));
      return;
    }
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      
      // Draw base image
      ctx.drawImage(img, 0, 0, size, size);
      
      // Apply color filter overlay
      if (config.filterColor && config.filterOpacity) {
        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = config.filterColor;
        ctx.globalAlpha = config.filterOpacity;
        ctx.fillRect(0, 0, size, size);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
      }
      
      // Draw seasonal icon overlay
      if (config.overlayIcon) {
        const iconSize = Math.floor(size * 0.35);
        const padding = Math.floor(size * 0.05);
        
        // Draw icon background circle for better visibility
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        const centerX = size - padding - iconSize / 2;
        const centerY = padding + iconSize / 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, iconSize / 2 + padding / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw the emoji icon
        ctx.font = `${iconSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(config.overlayIcon, centerX, centerY);
      }
      
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = baseImageData;
  });
}

export async function generateSeasonalFavicons(
  baseImageData: string,
  effectType: 'snow' | 'valentine' | 'halloween' | 'celebration'
): Promise<Map<number, string>> {
  const sizes = [16, 32, 48, 180, 192, 512];
  const faviconMap = new Map<number, string>();
  
  for (const size of sizes) {
    const faviconData = await applySeasonalEffect(baseImageData, effectType, size);
    faviconMap.set(size, faviconData);
  }
  
  return faviconMap;
}
