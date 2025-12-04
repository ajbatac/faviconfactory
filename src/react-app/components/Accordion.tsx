import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, XCircle, Ruler, FileImage, Settings, HelpCircle, AlertCircle, Upload } from 'lucide-react';

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

// Unified Documentation Accordion
export const DocumentationAccordion = () => {
  const items: AccordionItem[] = [
    {
      id: 'best-practices',
      title: 'Best Practices & Guidelines',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50/50 p-5 rounded-xl border border-green-100">
              <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> What to Do
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span><strong>High Contrast:</strong> Ensure visibility at 16x16px</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span><strong>Simplicity:</strong> Avoid complex details that blur at small sizes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span><strong>Brand Colors:</strong> Match your website's palette</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span><strong>Small Files:</strong> Keep under 10KB for performance</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50/50 p-5 rounded-xl border border-red-100">
              <h4 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                <XCircle className="w-4 h-4" /> What to Avoid
              </h4>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span><strong>No Text:</strong> Text becomes unreadable at small sizes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span><strong>Too Many Colors:</strong> Limit to 2-3 for clarity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span><strong>Low Contrast:</strong> Light icons on light backgrounds disappear</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span><strong>Copyrighted Images:</strong> Use original designs only</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'technical-specs',
      title: 'Technical Specifications',
      icon: <Settings className="w-5 h-5 text-blue-600" />,
      content: (
        <div className="space-y-8">
          {/* Sizes Table */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Ruler className="w-4 h-4 text-blue-500" /> Standard Sizes
            </h4>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Size</th>
                    <th className="px-4 py-3">Use Case</th>
                    <th className="px-4 py-3">Device/Platform</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-4 py-2 font-mono text-blue-600">16×16</td>
                    <td className="px-4 py-2">Browser Tabs</td>
                    <td className="px-4 py-2 text-gray-500">Desktop Browsers</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-4 py-2 font-mono text-blue-600">32×32</td>
                    <td className="px-4 py-2">Taskbar / Shortcuts</td>
                    <td className="px-4 py-2 text-gray-500">Windows / Mac</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-4 py-2 font-mono text-blue-600">180×180</td>
                    <td className="px-4 py-2">Home Screen Icon</td>
                    <td className="px-4 py-2 text-gray-500">iOS (iPhone/iPad)</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-4 py-2 font-mono text-blue-600">192×192</td>
                    <td className="px-4 py-2">Home Screen Icon</td>
                    <td className="px-4 py-2 text-gray-500">Android Chrome</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-4 py-2 font-mono text-blue-600">512×512</td>
                    <td className="px-4 py-2">App Store / PWA</td>
                    <td className="px-4 py-2 text-gray-500">High-Res Displays</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Formats Table */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
              <FileImage className="w-4 h-4 text-purple-500" /> File Formats
            </h4>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-semibold">
                  <tr>
                    <th className="px-4 py-3">Format</th>
                    <th className="px-4 py-3">Best For</th>
                    <th className="px-4 py-3">Key Features</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-4 py-2 font-bold text-gray-900">PNG</td>
                    <td className="px-4 py-2">Modern Browsers</td>
                    <td className="px-4 py-2 text-gray-500">Transparency, Lossless Quality</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-4 py-2 font-bold text-gray-900">ICO</td>
                    <td className="px-4 py-2">Legacy Support</td>
                    <td className="px-4 py-2 text-gray-500">Multi-size container, IE fallback</td>
                  </tr>
                  <tr className="hover:bg-gray-50/50">
                    <td className="px-4 py-2 font-bold text-gray-900">SVG</td>
                    <td className="px-4 py-2">Animations</td>
                    <td className="px-4 py-2 text-gray-500">Vector scaling, CSS animations</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting & FAQ',
      icon: <HelpCircle className="w-5 h-5 text-orange-500" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-orange-500" /> Favicon not showing?
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 ml-1">
                <li><strong>Check Root:</strong> Ensure files are in the website root directory</li>
                <li><strong>Clear Cache:</strong> Hard refresh (Ctrl+F5 or Cmd+Shift+R)</li>
                <li><strong>Check HTML:</strong> Verify &lt;link&gt; tags in &lt;head&gt;</li>
              </ol>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-500" /> Upload Issues?
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-1">
                <li><strong>Format:</strong> Use PNG, JPG, GIF, SVG, or WebP</li>
                <li><strong>Size:</strong> Max 10MB file size</li>
                <li><strong>Try:</strong> Refresh page or use a different browser</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Common Questions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">Do I need all sizes?</p>
                <p className="text-sm text-gray-600">Yes, to ensure your icon looks crisp on all devices (phones, tablets, desktops).</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm mb-1">Is it free?</p>
                <p className="text-sm text-gray-600">Yes, 100% free for unlimited static and animated favicons.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return <Accordion items={items} allowMultiple={true} />;
};

