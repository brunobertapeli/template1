import React from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon, UsersIcon, SparklesIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function About() {
  return (
    <div className="about-page">
      <section className="about-header">
        <div className="container">
          <div className="about-header-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}
            >
              <img
                src="/images/about-team.svg"
                alt="Team members illustration showing connected team avatars"
                data-codedeck-image="true"
                style={{ maxWidth: '500px', width: '100%', height: 'auto' }}
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="page-title"
            >
              About Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="page-subtitle"
            >
              Building the future of web development with lightweight solutions
            </motion.p>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <div className="container">
          <div className="mission-content">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Our Mission
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              We created React+Node.JS Lite to provide developers with a minimalist, 
              AI-friendly template that focuses on performance and simplicity. Our goal 
              is to streamline web application development by removing unnecessary 
              complexity and focusing on what truly matters.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="values-title"
          >
            Our Values
          </motion.h2>
          
          <div className="values-grid">
            {[
              {
                icon: <CodeBracketIcon className="value-icon" />,
                title: "Simplicity",
                description: "We believe in clean, readable code that's easy to maintain and extend."
              },
              {
                icon: <SparklesIcon className="value-icon" />,
                title: "Performance",
                description: "Every component is optimized for speed and efficiency."
              },
              {
                icon: <UsersIcon className="value-icon" />,
                title: "Developer Experience",
                description: "Tools and documentation designed to make development a pleasure."
              },
              {
                icon: <HeartIcon className="value-icon" />,
                title: "Community",
                description: "Building with and for a community of like-minded developers."
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="value-icon-wrapper">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-team">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="team-intro"
          >
            We're a small, dedicated team of web developers and designers passionate about creating 
            efficient, AI-friendly tools for the modern web.
          </motion.p>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Join Us On This Journey
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Try React+Node.JS Lite today and experience the power of simplicity.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="cta-buttons"
            >
              <button className="btn-primary">Get Started</button>
              <button className="btn-outline">Learn More</button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
} 