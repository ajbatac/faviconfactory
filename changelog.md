# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-12-06

### Added
- **RSS Feed**: Added `public/rss.xml` for changelog updates.
- **Changelog Page**: Added `/changelog` public page (`src/react-app/pages/Changelog.tsx`).
- **Sitemap & Robots**: Standardized `public/sitemap.xml` and `public/robots.txt` for better SEO and crawling instructions.
- **Footer Updates**: Version string is now clickable and links to the full changelog throughout the application (`src/react-app/components/Footer.tsx`).

### Changed
- **UI Architecture**:
  - **Refined Aesthetics**: Removed heavy borders in `PageLayout.tsx` and `Footer.tsx` for a more modern, spacious design.
  - **Spacing**: Adjusted global spacing tokens in `src/react-app/index.css` and component-specific margins to increase breathability.
- **Image Cropper (`src/react-app/components/ImageCropper.tsx`)**:
  - **Mobile Optimization**: Completely overhauled the cropping interface for touch devices. Controls are now touch-friendly and responsive.
  - **Layout**: Adjusted the canvas and control panel flow to prevent overlap on smaller viewports.
- **Dependencies**:
  - Updated `react` to v19.x and `vite` configuration to resolve security vulnerabilities (CVE-2025-55182).
  - Cleaned up `package.json` to resolve peer dependency conflicts between `next-themes` and React 19.

### Security
- **Hardening**: Removed explicit file paths from public-facing changelogs to prevent directory traversal reconnaissance.
- **Dependency Audit**: Addressed high-severity vulnerabilities in upstream image processing libraries.

## [1.0.0] - 2024-11-20
- Initial Release
