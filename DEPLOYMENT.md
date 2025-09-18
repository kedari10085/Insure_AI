# Insure AI Deployment Guide

This guide provides step-by-step instructions for deploying the Insure AI application to the cloud. We will deploy the backend to Render and the frontend to Vercel.

## Prerequisites

- A GitHub account with the project pushed to a repository.
- A Render account.
- A Vercel account.
- A MongoDB Atlas account with a database created.
- A Stripe account with API keys.
- An OpenAI account with an API key.

---

## Part 1: Deploying the Backend to Render

### Step 1: Prepare Your Backend

1.  **Ensure all dependencies are in `package.json`**: Make sure all required packages are listed under `dependencies`.
2.  **Check your `start` script**: The `package.json` should have a `start` script: `"start": "node backend/server.js"`.

### Step 2: Create a New Web Service on Render

1.  Log in to your Render dashboard and click **New +** > **Web Service**.
2.  Connect your GitHub account and select the repository for this project.
3.  Configure the service:
    -   **Name**: `insure-ai-backend` (or your preferred name).
    -   **Root Directory**: `backend` (important, as our backend code is in a subdirectory).
    -   **Environment**: `Node`.
    -   **Build Command**: `npm install`.
    -   **Start Command**: `npm start`.

### Step 3: Add Environment Variables

In the Render dashboard, go to the **Environment** tab for your new service and add the following secret files/variables:

-   `MONGO_URI`: Your MongoDB connection string.
-   `JWT_SECRET`: A long, random string for signing tokens.
-   `STRIPE_SECRET_KEY`: Your Stripe secret key.
-   `STRIPE_WEBHOOK_SECRET`: Your Stripe webhook signing secret (see Part 3).
-   `OPENAI_API_KEY`: Your OpenAI API key.
-   `FRONTEND_URL`: The URL of your deployed frontend (you'll get this from Vercel in the next part).

### Step 4: Deploy

Click **Create Web Service**. Render will automatically pull your code, install dependencies, and start the server. Once deployed, copy the URL of your backend (e.g., `https://insure-ai-backend.onrender.com`).

---

## Part 2: Deploying the Frontend to Vercel

### Step 1: Prepare Your Frontend

1.  **Ensure your API requests point to the live backend**: In your frontend code (e.g., `src/context/AuthContext.jsx`), make sure your API calls use an environment variable for the backend URL.

### Step 2: Create a New Project on Vercel

1.  Log in to your Vercel dashboard and click **Add New...** > **Project**.
2.  Connect your GitHub account and import the repository for this project.
3.  Configure the project:
    -   **Framework Preset**: `Vite` (Vercel should detect this automatically).
    -   **Root Directory**: `frontend`.

### Step 3: Add Environment Variables

In the Vercel project settings, go to the **Environment Variables** tab and add the following:

-   `VITE_API_URL`: The URL of your deployed backend from Render (e.g., `https://insure-ai-backend.onrender.com`).

### Step 4: Deploy

Click **Deploy**. Vercel will build and deploy your React application. Once finished, you'll have a live URL for your frontend.

---

## Part 3: Final Configuration

1.  **Update Backend `FRONTEND_URL`**: Go back to your Render environment variables and update `FRONTEND_URL` with your live Vercel URL.
2.  **Configure Stripe Webhook**:
    -   In your Stripe dashboard, go to **Developers > Webhooks**.
    -   Click **Add endpoint**.
    -   Set the **Endpoint URL** to `YOUR_BACKEND_URL/api/billing/webhook`.
    -   Select the event `checkout.session.completed`.
    -   After creating the endpoint, reveal the **Signing secret** and add it to your backend environment variables on Render as `STRIPE_WEBHOOK_SECRET`.

Your Insure AI application is now live! 🚀
