export interface AnimationConfig {
  type: 'pulse' | 'rotate';
  speed: number; // in seconds
  baseImageData: string;
}

export function generateAnimatedSVG(config: AnimationConfig): string {
  const { type, speed, baseImageData } = config;
  
  // Convert base64 image data to data URL if needed
  const imageDataUrl = baseImageData.startsWith('data:') 
    ? baseImageData 
    : `data:image/png;base64,${baseImageData}`;

  // Generate CSS animation based on type and speed (kept via direct @keyframes)
  
  // Create SVG with embedded CSS animation
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" width="32" height="32">
  <defs>
    <style>
      <![CDATA[
        .animated-favicon {
          animation: ${type} ${speed}s infinite;
          transform-origin: center;
        }
        
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        @keyframes rotate {
          from { 
            transform: rotate(0deg);
          }
          to { 
            transform: rotate(360deg);
          }
        }
      ]]>
    </style>
  </defs>
  
  <image 
    x="0" 
    y="0" 
    width="32" 
    height="32" 
    xlink:href="${imageDataUrl}"
    class="animated-favicon"
  />
</svg>`.trim();

  return svg;
}

function generateAnimationCSS(type: 'pulse' | 'rotate', speed: number): string {
  if (type === 'pulse') {
    return `
      .animated-favicon {
        animation: pulse ${speed}s ease-in-out infinite;
        transform-origin: center;
      }
      
      @keyframes pulse {
        0%, 100% { 
          transform: scale(1);
          opacity: 1;
        }
        50% { 
          transform: scale(1.1);
          opacity: 0.8;
        }
      }
    `;
  } else {
    return `
      .animated-favicon {
        animation: rotate ${speed}s linear infinite;
        transform-origin: center;
      }
      
      @keyframes rotate {
        from { 
          transform: rotate(0deg);
        }
        to { 
          transform: rotate(360deg);
        }
      }
    `;
  }
}

export function downloadAnimatedSVG(svgContent: string, filename: string = 'animated-favicon.svg'): void {
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

export function generateMultipleSizes(config: AnimationConfig): Map<number, string> {
  const sizes = [16, 32, 48, 180, 192, 512];
  const svgMap = new Map<number, string>();
  
  sizes.forEach(size => {
    const svg = generateAnimatedSVGForSize(config, size);
    svgMap.set(size, svg);
  });
  
  return svgMap;
}

function generateAnimatedSVGForSize(config: AnimationConfig, size: number): string {
  const { type, speed, baseImageData } = config;
  
  const imageDataUrl = baseImageData.startsWith('data:') 
    ? baseImageData 
    : `data:image/png;base64,${baseImageData}`;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <style>
      <![CDATA[
        .animated-favicon {
          animation: ${type} ${speed}s infinite;
          transform-origin: center;
        }
        
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        @keyframes rotate {
          from { 
            transform: rotate(0deg);
          }
          to { 
            transform: rotate(360deg);
          }
        }
      ]]>
    </style>
  </defs>
  
  <image 
    x="0" 
    y="0" 
    width="${size}" 
    height="${size}" 
    xlink:href="${imageDataUrl}"
    class="animated-favicon"
  />
</svg>`.trim();

  return svg;
}

