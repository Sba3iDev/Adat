# Adat

Adat is a modern web application built with React and TypeScript that provides a collection of powerful tools to streamline your daily tasks. The application features a clean, responsive interface and offers various utility tools in one convenient place.

## Features

-   **Password Generator**: Create secure passwords with customizable options for length, characters, and symbols
-   **File Converter**: Convert various file formats including images, videos, and audio files
-   **Unit Converter**: Convert between different units of measurement with support for multiple categories
-   **QR Code Generator**: Generate QR codes from text or URLs with options to copy or download
-   **Currency Converter**: Real-time currency conversion with support for multiple currencies and live rates
-   **Numeral System Converter**: Convert numbers between different numeral systems (Binary, Octal, Decimal, Hexadecimal)

## Technologies Used

-   **Frontend Framework**: React 19 with TypeScript
-   **Routing**: React Router DOM
-   **Build Tool**: Vite
-   **Styling**: Custom CSS with CSS Variables for theming
-   **Icons**: Font Awesome
-   **Additional Libraries**:
    -   `@ffmpeg/ffmpeg` for file conversions
    -   `convert-units` for unit conversions
    -   `qrcode.react` for QR code generation
    -   `react-select` for dropdown components
    -   `react-world-flags` for currency flags
    -   `file-saver` for file downloads

## Getting Started

### Prerequisites

-   Node.js (Latest LTS version recommended)
-   npm or yarn

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

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be available in the `dist` directory.

## Project Structure

```
src/
  ├── assets/         # Static assets like SVGs
  ├── components/     # Reusable React components
  ├── pages/         # Page components for each tool
  ├── app.tsx        # Main app component
  ├── app.css        # Global styles
  ├── main.tsx       # Application entry point
  └── vite-env.d.ts  # TypeScript environment declarations
```
