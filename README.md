# Adat

Adat is a modern web application built with React and TypeScript that provides a collection of powerful tools to streamline your daily tasks. The application features a clean, responsive interface and offers various utility tools in one convenient place.

## Features

- **Password Generator**: Create secure passwords with customizable options for length, character sets (uppercase, lowercase, numbers, symbols)
- **Unit Converter**: Convert between different units of measurement across multiple categories
- **QR Code Generator**: Generate QR codes from text or URLs with options to copy or download
- **Currency Converter**: Real-time currency conversion with support for multiple currencies and live exchange rates
- **Numeral System Converter**: Convert numbers between different numeral systems (Binary, Octal, Decimal, Hexadecimal)
- **Arabic Text Converter**: Convert and reshape Arabic text to display correctly in applications without native Arabic support
- **Code Formatter**: Format and beautify code in multiple languages (JavaScript, TypeScript, HTML, CSS, JSON, Markdown, YAML, GraphQL) with automatic language detection, customizable indentation, and formatting rules
- **Word Counter**: Count occurrences of a specific word or phrase within a text, with support for case sensitivity, diacritic ignoring, multi-word phrases, and automatic RTL/LTR direction detection for Arabic, Hebrew, and other scripts

## Technologies Used

- **Frontend Framework**: React 19 with TypeScript
- **Routing**: React Router DOM v7
- **Build Tool**: Vite
- **Styling**: Custom CSS with CSS Variables for theming
- **Icons**: Font Awesome
- **Deployment**: GitHub Pages (`gh-pages`)
- **Additional Libraries**:
    - `prettier` — code formatting and parsing
    - `convert-units` — unit conversions
    - `qrcode.react` — QR code generation
    - `react-select` — searchable dropdown components
    - `react-world-flags` — currency flag icons
    - `file-saver` — file downloads
    - `tinyld` — language detection for locale-aware word counting

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd adat
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be available in the `dist` directory.

### Deploying to GitHub Pages

```bash
npm run deploy
```

This runs `npm run build` automatically and pushes the `dist` folder to the `gh-pages` branch.

## Project Structure

```
src/
  ├── assets/         # Static assets (SVGs, images)
  ├── components/     # Reusable React components (Footer, ScrollToTopButton, PopupMessage)
  ├── pages/          # Page component for each tool
  │   ├── home.tsx
  │   ├── password.tsx
  │   ├── unitConverter.tsx
  │   ├── qrCode.tsx
  │   ├── currency.tsx
  │   ├── numearl.tsx
  │   ├── arabicTextConverter.tsx
  │   ├── codeFormatter.tsx
  │   └── wordCounter.tsx
  ├── app.tsx         # Main app component with routing
  ├── app.css         # Global styles and CSS variables
  ├── main.tsx        # Application entry point
  └── vite-env.d.ts   # TypeScript environment declarations
```
