# Shelf Scanner - Frontend

The frontend component of the Shelf Scanner application - a book identification and recommendation system that uses AI to analyze bookshelf images and provide personalized recommendations.

## Overview

This is a React-based frontend application built with:
- React 18.3.1
- TypeScript
- Vite as the build tool
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons

## Features

- **Book Scanning Interface**: Upload and process images of bookshelves
- **Results Display**: View identified books with titles and descriptions
- **Recommendations Engine**: Get personalized book recommendations
- **Saved Books**: Store and manage your scanned books
- **Settings Page**: Configure application preferences
- **Admin Dashboard**: Administrative functionality (if applicable)
- **Dark/Light Theme**: Toggle between color schemes
- **Responsive Design**: Works on desktop and mobile devices

## Pages

The application includes the following pages:
- **Home**: Welcome screen with application overview
- **Scan**: Image upload and processing interface
- **Results**: Display of identified books from scanned images
- **Recommendations**: Personalized book recommendations
- **Saved Books**: View and manage previously scanned books
- **Settings**: Application configuration options
- **Admin**: Administrative dashboard (if applicable)

## Project Structure

```
src/
├── App.tsx                 # Main application component with routing
├── AppRouter.tsx           # Router configuration
├── index.tsx              # Application entry point
├── index.css              # Tailwind CSS configuration
├── types.ts               # TypeScript type definitions
├── vite-env.d.ts          # Vite environment type definitions
├── app/                   # App-specific components
├── components/            # Reusable UI components
├── contexts/              # React context providers
├── lib/                   # Utility functions and API clients
├── pages/                 # Page components
└── public/                # Static assets
```

## Components

Key components include:
- **Layout**: Main layout with navbar and footer
- **ThemeToggle**: Dark/light mode toggle
- **BookProvider**: Context provider for book data
- **UI Components**: Buttons, cards, inputs with Tailwind styling
- **Routing Components**: Page-specific components for each route

## Setup and Development

### Prerequisites

- Node.js (version compatible with the project dependencies)
- npm or yarn package manager

### Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

To run the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173 (or another port if 5173 is occupied).

### Building for Production

To build the application for production:
```bash
npm run build
```

### Other Scripts

- `npm run lint`: Lint the codebase
- `npm run preview`: Preview the production build locally

## API Integration

The frontend communicates with the backend API for:
- Image processing and book identification
- Book recommendations
- Saving and retrieving books
- Administrative functions

API endpoints are configured via environment variables, specifically `VITE_API_BASE_URL`.

## Environment Variables

The frontend requires the following environment variable:
- `VITE_API_BASE_URL`: Base URL for the backend API (e.g., http://localhost:8000)

## Styling

The application uses Tailwind CSS for styling with a customized theme. The design supports both light and dark modes with the following color scheme:
- Primary: Purple (262 83.3% 57.8%)
- Secondary: Orange (20 14.3% 65.1%)
- Background and foreground colors for both light and dark themes

## Technologies Used

- **React**: Component-based UI library
- **TypeScript**: Type safety and better development experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Lucide React**: Icon library
- **clsx & tailwind-merge**: Class name management utilities

## Contributing

To contribute to the frontend:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is part of the Shelf Scanner application. See the main project repository for licensing information.
