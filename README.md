# React Node Lite Template for Netlify

This is a lightweight React/Node.js template configured for deployment on Netlify, with the backend routes converted to serverless functions.

## Project Structure

- `/frontend`: React application
- `/backend`: Original Node.js backend (for reference)
- `/netlify/functions`: Serverless functions for Netlify deployment

## Deployment Instructions

### Prerequisites

1. Create a [Netlify account](https://app.netlify.com/signup)
2. Install [Netlify CLI](https://docs.netlify.com/cli/get-started/) (optional for local testing)

### Deploy to Netlify

#### Option 1: Direct Deploy from GitHub

1. Push this repository to GitHub
2. Log in to your Netlify account
3. Click "New site from Git"
4. Select your GitHub repository
5. Netlify will automatically detect the build settings from `netlify.toml`
6. **IMPORTANT**: Set up environment variables (see below)
7. Click "Deploy site"

#### Option 2: Deploy using Netlify CLI

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Log in to Netlify: `netlify login`
3. Initialize Netlify in the project: `netlify init`
4. Set environment variables:
   ```
   netlify env:set MONGODB_URI your-mongodb-connection-string
   ```
5. Deploy the site: `netlify deploy --prod`

### Environment Variables (REQUIRED)

Set the following environment variables in the Netlify dashboard (Settings > Environment):

- `MONGODB_URI`: Your MongoDB connection string

If you're using a MongoDB Atlas cluster, make sure to:
1. Allow connections from anywhere (0.0.0.0/0) in your MongoDB Atlas Network Access settings
2. Create a database user with appropriate permissions
3. Use the connection string format: `mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority`

### Local Development

1. Install dependencies:
   ```
   npm install
   cd frontend && npm install
   cd netlify/functions && npm install
   ```

2. Create a `.env` file in the root with your MongoDB credentials:
   ```
   MONGODB_URI=your-mongodb-connection-string
   ```

3. Run the React app:
   ```
   cd frontend && npm start
   ```

4. To test Netlify functions locally:
   ```
   netlify dev
   ```

## Troubleshooting

- Check Netlify function logs in the Netlify dashboard (Functions > Monitoring)
- Verify environment variables are correctly set
- Make sure MongoDB connection is allowed from Netlify IPs
- If functions are failing, test them locally with `netlify dev`
- Check that all dependencies are correctly installed
- If you're getting a 404 for function routes, make sure the redirect rules are working properly # template1
