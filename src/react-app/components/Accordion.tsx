import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export default function Accordion({ items, allowMultiple = false, className = '' }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(items.filter(item => item.defaultOpen).map(item => item.id))
  );

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item) => {
        const isOpen = openItems.has(item.id);

        return (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
            >
              <div className="flex items-center space-x-3">
                {item.icon && (
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              </div>
              <div className="flex-shrink-0">
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </button>

            <div
              className="grid transition-all duration-300 ease-in-out"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr'
              }}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-4">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Pre-built accordion sections for common use cases
export const BestPracticesAccordion = () => {
  const items: AccordionItem[] = [
    {
      id: 'dos',
      title: '✅ Best Practices - What to Do',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Use high-contrast designs</strong>
                  <p className="text-sm text-gray-600">Ensure your favicon is visible at 16x16 pixels</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Keep it simple</strong>
                  <p className="text-sm text-gray-600">Avoid complex details that won't be visible at small sizes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Use your brand colors</strong>
                  <p className="text-sm text-gray-600">Maintain consistency with your website's color scheme</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Test across browsers</strong>
                  <p className="text-sm text-gray-600">Check how your favicon looks in different browsers</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Use seasonal effects wisely</strong>
                  <p className="text-sm text-gray-600">Update your favicon for holidays to keep it fresh</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Keep file sizes small</strong>
                  <p className="text-sm text-gray-600">Under 10KB for faster loading and better performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'donts',
      title: '❌ Common Mistakes - What to Avoid',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Don't use text</strong>
                  <p className="text-sm text-gray-600">Text becomes unreadable at favicon sizes</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Avoid too many colors</strong>
                  <p className="text-sm text-gray-600">Limit to 2-3 colors for better visibility</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Don't make it too busy</strong>
                  <p className="text-sm text-gray-600">Complex designs become messy when scaled down</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Avoid low contrast</strong>
                  <p className="text-sm text-gray-600">Light colors on light backgrounds are invisible</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Don't forget fallbacks</strong>
                  <p className="text-sm text-gray-600">Always include ICO files for older browsers</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <strong className="text-gray-900">Avoid copyrighted images</strong>
                  <p className="text-sm text-gray-600">Use original designs or properly licensed content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return <Accordion items={items} allowMultiple={true} />;
};

export const TechnicalGuideAccordion = () => {
  const items: AccordionItem[] = [
    {
      id: 'sizes',
      title: '📐 Size Requirements & Specifications',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-3">Standard Favicon Sizes</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-800">16×16px</span>
                <span className="text-blue-600">Browser tabs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-800">32×32px</span>
                <span className="text-blue-600">Desktop shortcuts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-800">48×48px</span>
                <span className="text-blue-600">Windows taskbar</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-800">180×180px</span>
                <span className="text-blue-600">Apple touch icon</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-800">192×192px</span>
                <span className="text-blue-600">Android Chrome</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-800">512×512px</span>
                <span className="text-blue-600">High-res displays</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">File Size Recommendations</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• PNG files: Under 5KB for best performance</li>
              <li>• ICO files: Under 10KB (contains multiple sizes)</li>
              <li>• SVG files: Under 3KB for animations</li>
              <li>• Total favicon package: Under 50KB</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'formats',
      title: '🎨 File Formats & Browser Support',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">PNG Format</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Best for modern browsers</li>
                <li>• Supports transparency</li>
                <li>• High quality</li>
                <li>• Universal support</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">ICO Format</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Legacy browser support</li>
                <li>• Multiple sizes in one file</li>
                <li>• Windows compatibility</li>
                <li>• Fallback option</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">SVG Format</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Scalable vector graphics</li>
                <li>• Supports animations</li>
                <li>• Modern browsers only</li>
                <li>• Small file sizes</li>
              </ul>
            </div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">Browser Compatibility</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <strong className="text-yellow-800">Chrome</strong>
                <p className="text-yellow-700">PNG, ICO, SVG ✅</p>
              </div>
              <div>
                <strong className="text-yellow-800">Firefox</strong>
                <p className="text-yellow-700">PNG, ICO, SVG ✅</p>
              </div>
              <div>
                <strong className="text-yellow-800">Safari</strong>
                <p className="text-yellow-700">PNG, ICO, SVG ✅</p>
              </div>
              <div>
                <strong className="text-yellow-800">Edge</strong>
                <p className="text-yellow-700">PNG, ICO, SVG ✅</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'installation',
      title: '⚙️ Installation & Implementation',
      content: (
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-3">Quick Setup Steps</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-orange-800">
              <li><strong>Upload files</strong> to your website's root directory (same folder as index.html)</li>
              <li><strong>Add HTML tags</strong> to your &lt;head&gt; section (code provided in results)</li>
              <li><strong>Test locally</strong> by opening your HTML file in a browser</li>
              <li><strong>Deploy</strong> to your web server and test in production</li>
              <li><strong>Clear cache</strong> if favicon doesn't appear immediately</li>
            </ol>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Common Issues & Solutions</h4>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-gray-900">Favicon not showing:</strong>
                <ul className="list-disc list-inside ml-4 mt-1 text-gray-700">
                  <li>Check file paths are correct</li>
                  <li>Clear browser cache (Ctrl+F5)</li>
                  <li>Verify HTML syntax is correct</li>
                </ul>
              </div>
              <div>
                <strong className="text-gray-900">Animation not working:</strong>
                <ul className="list-disc list-inside ml-4 mt-1 text-gray-700">
                  <li>Ensure you're using a modern browser</li>
                  <li>Check SVG files are being served correctly</li>
                  <li>Verify fallback ICO file is present</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return <Accordion items={items} allowMultiple={true} />;
};

