# Insure AI

Insure AI is a new-age, game-changing insurance platform powered by AI. The app is autonomous, using AI to interactively ask users for all necessary details to generate quotes, bind policies, and handle billing. It focuses on insurance types: auto, property, VPP (Valuable Personal Property), and umbrella.

## Overview

This is a full-stack web app where users sign up, chat with an AI agent to provide details, get instant quotes, bind policies if approved, and set up automated billing (daily, monthly, or yearly based on user choice).

- **AI-Powered Underwriting**: The AI acts as an intelligent agent: it asks questions conversationally (e.g., "What is the make and model of your vehicle?"), validates inputs, handles follow-ups, and ensures all required details are collected before proceeding.
- **Autonomous Operations**: The platform is designed to be fully autonomous with no human intervention. The AI handles quoting logic, policy binding (generating a digital contract), and billing setup (integrating with Stripe).
- **Secure & Compliant**: The application uses modern security practices, including authentication, encryption of sensitive data (e.g., personal info), and compliance with basic privacy standards.
- **Responsive Design**: The application is designed to be responsive and mobile-friendly, allowing users to access it from anywhere on any device.

## Key Features

- **User Authentication**: Secure sign-up and login with email/password or OAuth (Google).
- **AI Chat Interface**: A conversational UI where the AI gathers user information step-by-step.
- **Instant Quote Generation**: The AI calculates sample quotes based on user inputs.
- **Policy Binding**: Once a quote is accepted, the AI generates a PDF policy document and binds it.
- **Automated Billing System**: Users can choose their preferred payment frequency (daily, monthly, or yearly) via Stripe.
- **User Dashboard**: A portal for users to view their policies, update details, and manage payments.
- **Admin Panel**: A basic backend for monitoring policies and user activity.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **AI Integration**: OpenAI API (or Grok)
- **Payments**: Stripe API
- **Deployment**: Vercel (Frontend), Render/AWS (Backend)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm
- MongoDB Atlas account
- Stripe account
- OpenAI API key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd insure-ai
    ```

2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

### Configuration

1.  **Backend Environment Variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    PORT=5000
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
    STRIPE_SECRET_KEY=<your-stripe-secret-key>
    OPENAI_API_KEY=<your-openai-api-key>
    ```

2.  **Frontend Environment Variables:**

    Create a `.env` file in the `frontend` directory and add the following:

    ```env
    VITE_API_URL=http://localhost:5000
    ```

### Running the Application

1.  **Start the backend server:**
    ```bash
    cd backend
    npm start
    ```

2.  **Start the frontend development server:**
    ```bash
    cd ../frontend
    npm run dev
    ```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
