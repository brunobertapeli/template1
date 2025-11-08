import React from 'react'
import { motion } from 'framer-motion'
import {
  CodeBracketIcon,
  ServerIcon,
  CubeIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  CloudArrowUpIcon,
  WrenchScrewdriverIcon,
  CommandLineIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

interface FeatureData {
  id: string
  title: string
  icon: JSX.Element
  description: string
  benefits: string[]
  code: string
}

// Mock feature data
const featuresData: FeatureData[] = [
  {
    id: 'react-frontend',
    title: 'React Frontend',
    icon: <CodeBracketIcon className="feature-detail-icon" />,
    description: "Our lightweight React implementation gives you the power of React with optimal performance.",
    benefits: [
      'Minimal bundle size for fast loading',
      'Component-based architecture for easy maintenance',
      'Optimized rendering for snappy user experience',
      'Built-in responsive layouts'
    ],
    code: `// Simple component example
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`
  },
  {
    id: 'nodejs-backend',
    title: 'Node.js Backend',
    icon: <ServerIcon className="feature-detail-icon" />,
    description: "Scalable serverless functions that deploy effortlessly to Netlify.",
    benefits: [
      'Zero-config serverless deployment',
      'Automatic scaling based on demand',
      'Efficient API endpoints with minimal overhead',
      'Built-in security best practices'
    ],
    code: `// Serverless function example
exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);

    // Process data
    const result = await processData(data);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data: result })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false })
    };
  }
};`
  },
  {
    id: 'mongodb-database',
    title: 'MongoDB Database',
    icon: <CubeIcon className="feature-detail-icon" />,
    description: "Flexible document database that scales with your application needs.",
    benefits: [
      'Document-based storage for flexible schema design',
      'Horizontal scaling capabilities',
      'Real-time data synchronization',
      'Powerful query engine'
    ],
    code: `// MongoDB connection and query example
const { MongoClient } = require('mongodb');

async function fetchUsers() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const database = client.db('myapp');
    const users = database.collection('users');

    const query = { status: 'active' };
    return await users.find(query).toArray();
  } finally {
    await client.close();
  }
}`
  },
  {
    id: 'supabase-auth',
    title: 'Supabase Auth',
    icon: <ShieldCheckIcon className="feature-detail-icon" />,
    description: "Complete authentication system with minimal configuration required.",
    benefits: [
      'Social login with Google, Twitter, GitHub',
      'Email/password authentication with verification',
      'JWT-based secure session management',
      'Row-level security integration'
    ],
    code: `// Supabase authentication example
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Sign up a new user
async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({
    email,
    password
  });

  return { user, error };
}`
  },
  {
    id: 'stripe-payments',
    title: 'Stripe Payments',
    icon: <CreditCardIcon className="feature-detail-icon" />,
    description: "Secure payment processing with subscription management built-in.",
    benefits: [
      'Simple payment form integration',
      'Subscription billing with multiple plans',
      'Usage-based billing capabilities',
      'Comprehensive payment dashboard'
    ],
    code: `// Stripe payment processing example
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

async function checkout(priceId) {
  const stripe = await stripePromise;

  // Call your backend to create the Checkout session
  const session = await fetch('/.netlify/functions/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId })
  }).then(res => res.json());

  // Redirect to Checkout
  const result = await stripe.redirectToCheckout({
    sessionId: session.id
  });
}`
  },
  {
    id: 'netlify-deployment',
    title: 'Netlify Deployment',
    icon: <CloudArrowUpIcon className="feature-detail-icon" />,
    description: "Push-to-deploy pipeline with integrated CI/CD for seamless updates.",
    benefits: [
      'One-click deployment from GitHub',
      'Automatic HTTPS and custom domains',
      'Preview deployments for pull requests',
      'Edge network for fast global delivery'
    ],
    code: `# netlify.toml configuration
[build]
  command = "npm run build"
  publish = "frontend/dist"
  functions = "netlify/functions"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`
  },
]

export default function Features() {
  return (
    <div className="features-page">
      <FeaturesHeader />
      <FeaturesOverview />
      <DetailedFeatures />
      <FeatureComparison />
      <CallToAction />
    </div>
  )
}

function FeaturesHeader() {
  return (
    <section className="features-header">
      <div className="features-header-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}
        >
          <img
            src="/images/features-icon.svg"
            alt="Features section icon showing multiple feature blocks with checkmarks"
            data-codedeck-image="true"
            style={{ maxWidth: '400px', width: '100%', height: 'auto' }}
          />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="page-title"
        >
          Powerful Features
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="page-subtitle"
        >
          Everything you need to build and scale your SaaS application
        </motion.p>
      </div>
    </section>
  )
}

interface OverviewFeature {
  icon: JSX.Element
  title: string
  description: string
}

function FeaturesOverview() {
  const overviewFeatures: OverviewFeature[] = [
    {
      icon: <CodeBracketIcon className="overview-icon" />,
      title: 'Modern Frontend',
      description: 'Lightweight React components with optimal performance'
    },
    {
      icon: <ServerIcon className="overview-icon" />,
      title: 'Serverless Backend',
      description: 'Node.js functions that scale automatically with demand'
    },
    {
      icon: <WrenchScrewdriverIcon className="overview-icon" />,
      title: 'Developer Experience',
      description: 'Optimized workflow with hot reloading and easy debugging'
    },
    {
      icon: <CommandLineIcon className="overview-icon" />,
      title: 'CLI Tools',
      description: 'Built-in commands for common development tasks'
    },
    {
      icon: <UserGroupIcon className="overview-icon" />,
      title: 'User Management',
      description: 'Complete authentication and user profile systems'
    },
    {
      icon: <CreditCardIcon className="overview-icon" />,
      title: 'Billing System',
      description: 'Subscription management with multiple pricing tiers'
    }
  ]

  return (
    <section className="features-overview">
      <div className="container">
        <h2 className="section-title">At a Glance</h2>
        <div className="overview-grid">
          {overviewFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="overview-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="overview-icon-wrapper">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DetailedFeatures() {
  return (
    <section className="detailed-features">
      <div className="container">
        <h2 className="section-title">Core Features</h2>
        <p className="section-subtitle">Dive deeper into what makes React+Node.JS Lite powerful</p>

        <div className="detailed-features-list">
          {featuresData.map((feature) => (
            <motion.div
              key={feature.id}
              id={feature.id}
              className="feature-detail"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="feature-detail-content">
                <div className="feature-detail-icon-wrapper">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p className="feature-detail-description">{feature.description}</p>

                <h4>Key Benefits</h4>
                <ul className="feature-benefits">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="feature-code-block">
                <div className="code-window">
                  <div className="code-window-header">
                    <div className="window-button red"></div>
                    <div className="window-button yellow"></div>
                    <div className="window-button green"></div>
                    <div className="code-window-title">{feature.title}</div>
                  </div>
                  <div className="code-content">
                    <pre>{feature.code}</pre>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureComparison() {
  return (
    <section className="feature-comparison">
      <div className="container">
        <h2 className="section-title">Why Choose React+Node.JS Lite</h2>
        <p className="section-subtitle">Compare with alternatives and see why we're the best choice</p>

        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>React+Node.JS Lite</th>
                <th>Traditional MERN</th>
                <th>Serverless Alternatives</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bundle Size</td>
                <td><span className="checkmark">✓</span> Minimal (50KB+)</td>
                <td>150KB+</td>
                <td>100KB+</td>
              </tr>
              <tr>
                <td>Setup Time</td>
                <td><span className="checkmark">✓</span> Minutes</td>
                <td>Hours</td>
                <td>Hours</td>
              </tr>
              <tr>
                <td>Deployment</td>
                <td><span className="checkmark">✓</span> One-click</td>
                <td>Manual configuration</td>
                <td>Some configuration</td>
              </tr>
              <tr>
                <td>Authentication</td>
                <td><span className="checkmark">✓</span> Built-in (Supabase)</td>
                <td>Custom implementation</td>
                <td>Third-party integration</td>
              </tr>
              <tr>
                <td>Payment Processing</td>
                <td><span className="checkmark">✓</span> Built-in (Stripe)</td>
                <td>Requires integration</td>
                <td>Requires integration</td>
              </tr>
              <tr>
                <td>Maintenance</td>
                <td><span className="checkmark">✓</span> Minimal</td>
                <td>Regular updates needed</td>
                <td>Moderate</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

function CallToAction() {
  return (
    <section className="features-cta">
      <div className="container">
        <div className="cta-content">
          <h2>Ready to Build Your SaaS?</h2>
          <p>Get started with React+Node.JS Lite today and launch faster than ever.</p>
          <div className="cta-buttons">
            <button className="btn-primary btn-large">Start Building</button>
            <button className="btn-outline btn-large">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  )
}
