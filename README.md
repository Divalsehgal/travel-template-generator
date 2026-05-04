# Shiv Bhoomi - Travel Template Generator

A premium web application designed to generate professional, high-fidelity travel itineraries. Built with **React 19**, **Vite (Rolldown)**, and **Firebase**, this tool allows users to create, manage, and export stunning PDF itineraries with ease.

## 🚀 Key Features

- **Multi-Theme Engine**: Choose from four distinct visual styles:
  - **Modern**: Clean, minimalist, and premium.
  - **Wavy**: Organic shapes and adventurous gradients.
  - **Techno**: Industrial, grid-based, and utilitarian.
  - **Futuristic**: Cyberpunk-inspired with glassmorphism and neon accents.
- **Cloud Synchronization**: Real-time project storage and user authentication powered by **Firebase Firestore** and **Auth**.
- **Pixel-Perfect PDF Export**: Professional A4-ratio PDF generation optimized for print.
- **Advanced Content Editing**:
  - Integrated **Image Cropping** for perfect aspect ratios.
  - Robust form validation and state management.
- **Custom Design Token System**: A proprietary design system that drives visual consistency across all templates.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/) (utilizing Rolldown for high-performance builds)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Material UI (MUI)](https://mui.com/), [Emotion](https://emotion.sh/), and [Sass](https://sass-lang.com/)
- **Backend**: [Firebase](https://firebase.google.com/) (Firestore & Authentication)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Utilities**: `react-to-print`, `react-easy-crop`, `react-router-dom`

## 📦 Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- Yarn or NPM

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/divalsehgal/shiv-bhoomi-pdf.git
   cd shiv-bhoomi-pdf
   ```

2. Install dependencies for the main project and design tokens:
   ```bash
   yarn install
   yarn install-tokens
   ```

3. Configure Firebase:
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   yarn dev
   ```

## 🏗️ Architecture

The project follows a modular structure:
- `/src/pages`: Individual application views (Login, Dashboard, Form, Preview).
- `/src/components`: Reusable UI components.
- `/src/hooks`: Custom React hooks for business logic and Firebase interaction.
- `/design-tokens`: Independent design system that exports theme variables.
- `/src/styles`: Global styles and MUI theme configuration.

---
Built with ❤️ for professional travelers.
