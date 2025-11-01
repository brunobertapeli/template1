import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon, 
  CodeBracketIcon, 
  ServerIcon, 
  CubeIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

// Import pages
import Features from './pages/features';
import Pricing from './pages/pricing';
import Documentation from './pages/documentation';
import About from './pages/about';

// Auth components
import { AuthProvider, useAuth } from './AuthContext';
import AuthModal from './components/AuthModal';
import UserDropdown from './components/UserDropdown';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
          <AuthModal />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
    </>
  );
}

function AuthButtons() {
  const { user, openAuthModal } = useAuth();

  if (user) {
    return <UserDropdown />;
  }

  return (
    <div className="auth-buttons">
      <button className="btn-secondary" onClick={openAuthModal}>Sign In</button>
      <button className="btn-primary" onClick={openAuthModal}>Sign Up</button>
    </div>
  );
}

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, openAuthModal, signOut } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <CodeBracketIcon className="icon" />
          <span>React+Node.JS Lite</span>
        </div>
        
        <nav className="desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/documentation">Documentation</Link>
          <Link to="/about">About</Link>
        </nav>
        
        <AuthButtons />
        
        <button 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/documentation">Documentation</Link>
            <Link to="/about">About</Link>
            {user ? (
              <>
                <div className="mobile-user-info">
                  <span>{user.email}</span>
                </div>
                <button className="btn-secondary" onClick={signOut}>Sign Out</button>
              </>
            ) : (
              <>
                <button className="btn-secondary" onClick={openAuthModal}>Sign In</button>
                <button className="btn-primary" onClick={openAuthModal}>Sign Up</button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-title"
        >
          Build SaaS Applications Faster
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hero-subtitle"
        >
          The ready-to-deploy template with React, Node.js, MongoDB, Supabase Auth, and Stripe payment integration.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hero-cta"
        >
          <button className="btn-primary btn-large">
            Get Started <ArrowRightIcon className="icon-sm" />
          </button>
          <button className="btn-outline btn-large">View Demo</button>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="hero-image"
      >
        <div className="code-window">
          <div className="code-window-header">
            <div className="window-button red"></div>
            <div className="window-button yellow"></div>
            <div className="window-button green"></div>
          </div>
          <div className="code-content">
            <pre>{`function App() {
  return (
    <SaaSTemplate
      auth={supabaseAuth}
      payments={stripeIntegration}
      database={mongoDB}
      deployment="netlify"
    />
  );
}`}</pre>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: <CodeBracketIcon className="feature-icon" />,
      title: "React Frontend",
      description: "Lightweight, fast, and modern React setup optimized for SaaS applications."
    },
    {
      icon: <ServerIcon className="feature-icon" />,
      title: "Node.js Backend",
      description: "Scalable serverless functions ready to deploy on Netlify."
    },
    {
      icon: <CubeIcon className="feature-icon" />,
      title: "MongoDB Database",
      description: "Flexible document database perfect for rapid development."
    },
    {
      icon: <ShieldCheckIcon className="feature-icon" />,
      title: "Supabase Auth",
      description: "Complete authentication system with social login options."
    }
  ];

  return (
    <section id="features" className="features">
      <h2 className="section-title">Everything You Need</h2>
      <p className="section-subtitle">All the essential components for your next SaaS project</p>
      
      <div className="features-grid">
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className="feature-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="feature-icon-wrapper">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="features-cta-button">
        <Link to="/features" className="btn-primary">
          View All Features
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <CodeBracketIcon className="icon" />
          <span>React+Node.JS Lite</span>
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h4>Product</h4>
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/documentation">Documentation</Link>
          </div>
          
          <div className="footer-column">
            <h4>Resources</h4>
            <a href="#blog">Blog</a>
            <a href="#tutorials">Tutorials</a>
            <a href="#support">Support</a>
          </div>
          
          <div className="footer-column">
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} React+Node.JS Lite. All rights reserved.</p>
      </div>
    </footer>
  );
} 