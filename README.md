# Wordle with React, Vite, and TypeScript

This is a Wordle-inspired learning project built using **React**, **Vite**, and **TypeScript**. The goal of this project was to explore file structure organization, modularity, and the flow of components in a React application.

## Features
- Modular components for reusable and organized code.
- TypeScript integration for type safety.
- A file structure designed to separate concerns and improve readability.
- Key functionalities include word guessing, feedback on attempts, and a simple registration form.

## File Structure
- **src/Responses**: JSON files for mock responses used in the application.
- **src/components**:  
  - **Attempt**: Components for managing guess attempts and feedback.  
  - **Forms**: Components for user interactions like registration, word creation, and guessing.  
  - **GameLogic**: Core logic for the Wordle game.  
  - **Header**: Component for the application's header.  
- **src/textAssets**: Assets such as word lists and additional configurations.
- **src/App.tsx**: The main entry point for the React app.
- **src/api.ts**: Mock or actual API integrations.
- **src/main.tsx**: The main file to bootstrap the app.

## Tools and Technologies
- **React** for UI building.
- **Vite** for fast development and build processes.
- **TypeScript** for enhanced type checking and better development experience.

## Learning Outcomes
This project served as a hands-on exercise to understand:
- Component-based architecture in React.
- Using TypeScript for strongly-typed React applications.
- Modularizing code for better scalability and maintenance.

## How to Run
1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser at `http://localhost:5173`.

Feel free to explore the codebase and adapt it for more advanced features!

