# Sync Water Tech Pvt Ltd - Corporate Website

A professional, elegant, and responsive website for Sync Water Tech Pvt Ltd, showcasing their water infrastructure solutions and innovative technology.

## Features

- **Modern Design**: Clean, minimal interface with premium feel
- **Fully Responsive**: Mobile-first design that works on all devices
- **8 Complete Pages**:
  - Home - Hero section with company overview and key services
  - Projects - Completed and ongoing projects with filtering
  - About - Company mission, vision, and why choose us
  - Services - Comprehensive list of technical capabilities
  - Products - Water treatment solutions and automation systems
  - FAQ - Frequently asked questions with expandable answers
  - Team - Leadership profiles and career opportunities
  - Contact - Contact form and location information

## Technology Stack

- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Lucide React for icons
- Inter font for professional typography

## Design System

### Colors
- Primary Blue: `#0073bc`
- Secondary Blue: `#005a94`
- Dark Blue: `#004870`
- White: `#ffffff`
- Gray scale for text and backgrounds

### Typography
- Font Family: Inter (Google Fonts)
- Heading sizes: 4xl to 5xl
- Body text: Base to lg with good line height

### Components
- Rounded cards with subtle shadows (rounded-xl, rounded-2xl)
- Gradient backgrounds for hero sections
- Hover effects and transitions
- Smooth scrolling navigation

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Focus visible states
- ARIA-friendly components
- Alt text ready for images

## Content Management

All textual content is structured for easy editing. To update content:

1. **Homepage**: Edit `src/pages/HomePage.tsx`
2. **Projects**: Edit `src/pages/ProjectsPage.tsx`
3. **About**: Edit `src/pages/AboutPage.tsx`
4. **Services**: Edit `src/pages/ServicesPage.tsx`
5. **Products**: Edit `src/pages/ProductsPage.tsx`
6. **FAQ**: Edit `src/pages/FAQPage.tsx`
7. **Team**: Edit `src/pages/TeamPage.tsx`
8. **Contact**: Edit `src/pages/ContactPage.tsx` and `src/components/Footer.tsx`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx      # Sticky header with navigation
│   └── Footer.tsx      # Footer with contact info and links
├── pages/
│   ├── HomePage.tsx    # Landing page
│   ├── ProjectsPage.tsx
│   ├── AboutPage.tsx
│   ├── ServicesPage.tsx
│   ├── ProductsPage.tsx
│   ├── FAQPage.tsx
│   ├── TeamPage.tsx
│   └── ContactPage.tsx
├── App.tsx             # Main app with routing
├── index.css           # Global styles and animations
└── main.tsx           # App entry point
```

## Contact Information

The website includes the following contact details that can be updated in the respective components:

- **Address**: Bhopal, Madhya Pradesh, India
- **Phone**: To be updated
- **Email**: info@syncwatertech.com
- **Team Emails**:
  - rohit@syncwatertech.com
  - vijay@syncwatertech.com

## Notes

- The contact form currently shows a success message on submission (frontend only)
- Map integration placeholder is included on the contact page
- All content is ready for CMS integration
- Images should be added to match the design specifications
- Logo should be replaced with the actual company logo

## Future Enhancements

- Backend integration for contact form
- Google Maps integration
- Image optimization and lazy loading
- Blog/News section
- Client testimonials
- Case study detail pages
- Search functionality
- Multi-language support
