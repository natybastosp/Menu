# Coffee Shop Mobile Application

## Project Overview

This is a mobile application built using Expo and React Native, designed to create a seamless coffee ordering experience. The app provides users with the ability to browse a coffee menu, add items to their order, manage their profile, and view their current orders.

## Key Features

- Browse a curated coffee menu with detailed product information
- Add products to orders with quantity selection
- Manage personal profile with basic information
- View and edit current orders
- Responsive design for both iOS and Android

## Technology Stack

- React Native
- Expo
- TypeScript
- Context API for state management

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 16 or later)
- npm or Yarn
- Expo CLI
- Android Studio or Xcode (for emulators)
- Expo Go app (for mobile testing)

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/coffee-shop-mobile.git
cd coffee-shop-mobile
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Development Server

```bash
npx expo start
```

### 4. Running the App

- **iOS Simulator**: Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal
- **Expo Go (Physical Device)**:
  1. Install Expo Go from App Store/Google Play
  2. Scan QR code displayed in terminal with Expo Go app

## Project Structure

```
coffeShop/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx       # Home screen with product menu
│   │   ├── order.tsx       # Order management screen
│   │   └── profile.tsx     # User profile screen
├── assets/
│   └── images/             # Product and UI images
├── components/             # Reusable React components
├── context/                # Application state management
└── README.md
```

## Key Components

- **ProductCard**: Displays individual coffee products
- **AppContext**: Manages global state for products, orders, and user data
- **TabLayout**: Configures bottom navigation

## State Management

The app uses React Context (`AppContext`) to manage global state, including:

- Product catalog
- User orders
- Customer profile information

## Customization and Extensibility

The current implementation provides a solid foundation for a coffee shop mobile app. You can easily extend functionality by:

- Adding more products to the menu
- Implementing user authentication
- Creating a backend connection for order processing

## Potential Improvements

- Implement persistent storage
- Add user authentication
- Create a checkout process
- Implement order history tracking
