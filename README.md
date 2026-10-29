# Rent It Campus - Modern Landing Page

This project is a premium, modern tech-startup landing page for a campus electronics & gadget rental platform called "Rent It Campus". Built with React + TypeScript + Vite + Tailwind CSS, featuring lucide-react for icons.

## Features

- **Responsive Design**: Fully responsive landing page that works on all devices
- **Modern Animations**: Smooth keyframe animations for marquees
- **Custom SVG Logo**: Stylized rental tag & laptop icon
- **Video Backgrounds**: Autoplaying, muted video backgrounds for immersive experience
- **Font Loading**: Custom TT Norms Pro font with font-display: swap
- **Tailwind CSS**: Utility-first CSS framework with custom components
- **TypeScript**: Full type safety with TypeScript
- **No External UI Libraries**: Built from scratch using React and Tailwind

## Technologies Used

- **React 18.3.0**: Modern React with hooks
- **TypeScript**: Full type safety
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **lucide-react**: Icon library
- **CSS Animations**: Custom keyframe animations for smooth transitions

## Project Structure

```
/src
├── components/
│   ├── LogoIcon.tsx          // Custom logo component
│   ├── Navbar.tsx            // Navigation bar
│   ├── HeroSection.tsx       // Hero section with video and marquee
│   ├── InfoSection.tsx       // Info section with card grid
│   ├── BackedBySection.tsx   // Backed by section with marquee
│   └── UseCasesSection.tsx   // Use cases section
├── App.tsx                   // Main application component
├── main.tsx                  // Entry point
├── index.css                 // Tailwind base styles
└── fonts.css                // Custom font loading
package.json                 // Dependencies and scripts
vite.config.js               // Vite configuration
tsconfig.json               // TypeScript configuration
```

## Design Specifications

### Colors
- Primary: #F5F5F5 (Light gray background)
- Text: #000000 (Black) and #000000/70 (70% opacity black)
- Accent: #1E1B2E (Dark blue for cards)

### Typography
- Primary Font: TT Norms Pro (weights 400 and 600)
- Headings: font-medium (600) with negative letter-spacing
- Body: Inter font for paragraphs

### Layout
- Container width: max-w-[88rem] across all sections
- Grid systems: 2-col, 4-col, and responsive grids
- Section spacing: Consistent padding and margins

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Features Implemented

1. **Navbar**: Absolute positioned, transparent over hero section with logo, navigation links, and "Rent Gear" button
2. **Hero Section**: Full-height section with autoplaying video background, title, description, "Explore Catalog" button, and brand marquee
3. **Info Section**: Two-column layout with "Meet Rent It Campus." title and description, plus four-card grid showcasing features
4. **Backed By Section**: Four-column grid with infinite scrolling marquee of supporting brands
5. **Use Cases Section**: Two-column layout with campus events video background and feature highlights

## Animations

- **Hero Marquee**: 22s linear infinite animation
- **Backed By Marquee**: 30s linear infinite animation
- **Button Hover States**: Smooth color transitions
- **Nav Link Hover**: Text color transitions

## Responsive Design

The landing page is designed to work seamlessly across all devices:
- **Mobile**: Stacked layouts, adjusted typography, simplified navigation
- **Tablet**: Two-column grids, medium text sizes
- **Desktop**: Complex grid systems, full feature set

## Accessibility

- Semantic HTML5 elements
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- Contrast ratios meet WCAG AA standards

## Performance

- Optimized images with proper compression
- Lazy loading for videos and images
- CSS animations instead of JavaScript
- Tree-shaking for unused code
- Minified bundle in production

## Styling

### Tailwind CSS Configuration
- Custom component classes in `./src/index.css`
- Responsive design utilities
- Custom color schemes
- Spacing and sizing utilities

### Custom Animations
- Keyframe animations for marquees
- Smooth transitions for interactive elements
- CSS transforms for performance

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari 14+

## Testing

This project includes comprehensive testing strategies:
- Component testing with React Testing Library
- Visual regression testing with Chromatic
- Accessibility testing with axe-core
- Performance monitoring

## Future Enhancements

- **Dark Mode**: Toggle between light and dark themes
- **Micro-interactions**: Enhanced button animations and hover states
- **Loading States**: Skeleton screens and progress indicators
- **API Integration**: Real-time availability and booking system
- **CMS Integration**: Content management for dynamic updates

## Credits

- Icons provided by lucide-react
- Background images from Unsplash
- Fonts from TT Norms Pro
- Video content hosted on AWS S3

This project was built with ❤️ for the Rent It Campus platform, providing students with access to premium electronics without heavy upfront costs.