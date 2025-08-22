# PlaneBrain Mission Control 🚀✈️

A professional-grade training simulation designed for future aviation and space pioneers! This advanced quiz application features a NASA/military theme with real-time backend integration.

## Features ✨

- **Mission Control Interface**: Professional NASA/military aesthetic with dark theme
- **Real-time Backend Integration**: Connected to Django backend with S3 image support
- **Advanced Training Simulation**: Category-based mission selection
- **Professional UI/UX**: Military-style buttons, NASA glow effects, and stealth panels
- **Responsive Design**: Optimized for all devices and screen sizes
- **Image Support**: Full S3 integration for question and option images
- **HTML Content Rendering**: Supports rich text content from backend

## Tech Stack 🛠️

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework with custom NASA theme
- **React 19** - Latest React features and hooks
- **Django Backend** - Full API integration
- **AWS S3** - Image storage and delivery

## NASA/Military Theme 🎯

### Color Palette
- **Primary**: NASA Blue (#0066cc)
- **Secondary**: NASA Red (#dc143c)
- **Accent**: Teal (#00d4aa)
- **Background**: Deep Black (#0a0a0a)
- **Panels**: Stealth Gray (#1e1e1e)
- **Success**: Bright Green (#00ff88)

### Visual Elements
- **NASA Glow Effects**: Blue pulsing borders and shadows
- **Military Buttons**: Gradient backgrounds with sweep animations
- **Stealth Panels**: Dark, professional interface elements
- **Mission Terminology**: "Mission Control", "Training Simulation", "Debriefing"

## Getting Started 🚀

### Prerequisites

- Node.js 18+ 
- Django backend running on localhost:8000
- AWS S3 configured for image storage

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd planebrain/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure API endpoints**
   Create a `.env.local` file in the frontend directory:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure 📁

```
frontend/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Footer.tsx      # Mission-themed footer
│   │   ├── LoadingSpinner.tsx  # NASA-style loading animation
│   │   ├── ProgressBar.tsx     # Mission progress indicator
│   │   └── ScoreDisplay.tsx    # Mission completion modal
│   ├── config/             # Configuration files
│   │   └── api.ts          # API endpoint configuration
│   ├── services/           # API services
│   │   └── api.ts          # Backend communication
│   ├── globals.css         # NASA/military theme styles
│   ├── layout.tsx          # Root layout with fonts
│   └── page.tsx            # Main mission control interface
├── types/                  # TypeScript type definitions
│   └── types.ts            # Backend data interfaces
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Backend Integration 🔌

### API Endpoints
The frontend is now fully integrated with your Django backend using these endpoints:

- `GET /quiz/questions/list-all/` - Fetch paginated questions (supports thousands of questions)
- `POST /quiz/questions/search-by-category/` - Fetch questions by category with pagination
- `GET /quiz/questions/pick-one-random/` - Get a single random question
- `GET /quiz/categories/` - Fetch all categories
- `POST /quiz/questions/difficulty/` - Fetch questions by difficulty level with pagination

### Pagination Support
- **Default Page Size**: 50 questions per page
- **Dynamic Loading**: Load more questions as needed
- **Progress Tracking**: Shows current page and total questions
- **Efficient Memory**: Only loads questions when needed
- **Fallback Handling**: Graceful degradation if pagination fails

### Data Structure
The frontend expects the following data format from your Django backend:

```typescript
interface PaginatedQuestionApiResponse {
  count: number;        // Total number of questions
  next: string | null;  // Next page URL
  previous: string | null; // Previous page URL
  results: Question[];  // Questions for current page
}
```

### API Features
- **Real-time Integration**: Live data fetching from Django backend
- **Fallback Handling**: Graceful degradation if API is unavailable
- **Error Recovery**: Automatic retry and fallback mechanisms
- **Multiple Query Methods**: Support for GET and POST requests as needed
- **Pagination Support**: Handles thousands of questions efficiently

### Image Support
- **Question Images**: Displayed above question text with captions
- **Option Images**: Supported for visual answer options
- **S3 Integration**: Full AWS S3 image delivery support
- **HTML Rendering**: Rich text content from backend rendered properly

## Components 🧩

### Main Page (`page.tsx`)
- Mission Control landing page with category selection
- Real-time API integration for questions and categories
- Professional NASA/military interface
- HTML content rendering for rich text

### LoadingSpinner
- NASA-style rocket animation
- Launch trail effects
- Mission system initialization messaging

### ProgressBar
- Mission progress tracking
- NASA blue to success green gradient
- Rocket progress indicator

### ScoreDisplay
- Mission completion modal
- Military rank achievements
- Mission status indicators
- Professional debriefing interface

### Footer
- Mission facts and statistics
- Operational status indicators
- NASA/military themed content

## Customization 🎨

### Theme Colors
Update CSS variables in `globals.css`:
```css
:root {
  --nasa-blue: #0066cc;
  --nasa-red: #dc143c;
  --military-green: #4a5d23;
  --stealth-gray: #1a1a1a;
  --panel-bg: #1e1e1e;
}
```

### API Configuration
Modify `app/config/api.ts` for different backend endpoints:
```typescript
export const API_CONFIG = {
  BASE_URL: 'https://your-api-domain.com',
  ENDPOINTS: {
    QUESTIONS: '/api/quiz/questions/',
    // ... other endpoints
  }
};
```

## Deployment 🚀

### Production Build
```bash
# Build the application
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Environment Variables
Set production environment variables:
```bash
NEXT_PUBLIC_API_URL=https://your-production-api.com
NODE_ENV=production
```

## Browser Support 🌐

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes following the NASA/military theme
4. Test thoroughly
5. Submit a pull request

## Mission Status 🎯

**Current Status**: OPERATIONAL
**Next Mission**: Mars Colony Training
**Phase**: Advanced Development

---

**Mission Control Ready! 🚀✈️⭐**

*PlaneBrain - Training the next generation of aviation and space pioneers!*
