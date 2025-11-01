import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckIcon,
  XMarkIcon,
  CreditCardIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  
  const plans = [
    {
      name: 'Starter',
      description: 'Everything you need to get started with your SaaS project',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        { name: 'Up to 5 users', included: true },
        { name: 'Basic analytics', included: true },
        { name: '10 GB storage', included: true },
        { name: 'Email support', included: true },
        { name: 'API access', included: false },
        { name: 'Custom domains', included: false },
        { name: 'White labeling', included: false },
        { name: 'Priority support', included: false }
      ],
      highlighted: false,
      ctaText: 'Start Free Trial'
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses and teams',
      monthlyPrice: 79,
      yearlyPrice: 790,
      features: [
        { name: 'Up to 20 users', included: true },
        { name: 'Advanced analytics', included: true },
        { name: '50 GB storage', included: true },
        { name: 'Email and chat support', included: true },
        { name: 'API access', included: true },
        { name: 'Custom domains', included: true },
        { name: 'White labeling', included: false },
        { name: 'Priority support', included: false }
      ],
      highlighted: true,
      ctaText: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      description: 'Advanced features for large-scale applications',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        { name: 'Unlimited users', included: true },
        { name: 'Custom analytics', included: true },
        { name: '250 GB storage', included: true },
        { name: 'Email, chat, and phone support', included: true },
        { name: 'API access', included: true },
        { name: 'Custom domains', included: true },
        { name: 'White labeling', included: true },
        { name: 'Priority support', included: true }
      ],
      highlighted: false,
      ctaText: 'Contact Sales'
    }
  ];

  return (
    <div className="pricing-page">
      <PricingHeader />
      <PricingPlans plans={plans} isYearly={isYearly} setIsYearly={setIsYearly} />
      <PricingFaq />
      <EnterpriseContact />
      <PricingTestimonial />
    </div>
  );
}

function PricingHeader() {
  return (
    <section className="pricing-header">
      <div className="pricing-header-content">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="page-title"
        >
          Simple, Transparent Pricing
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="page-subtitle"
        >
          Choose the perfect plan for your business needs
        </motion.p>
      </div>
    </section>
  );
}

function PricingPlans({ plans, isYearly, setIsYearly }) {
  return (
    <section className="pricing-plans-section">
      <div className="container">
        <div className="pricing-toggle">
          <span className={!isYearly ? 'active' : ''}>Monthly</span>
          <div 
            className={`toggle-switch ${isYearly ? 'yearly' : 'monthly'}`} 
            onClick={() => setIsYearly(!isYearly)}
          >
            <div className="toggle-knob"></div>
          </div>
          <span className={isYearly ? 'active' : ''}>Yearly <span className="discount-badge">20% off</span></span>
        </div>
        
        <div className="pricing-plans">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`pricing-plan ${plan.highlighted ? 'highlighted' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.highlighted && (
                <div className="popular-badge">
                  <SparklesIcon className="popular-icon" /> Most Popular
                </div>
              )}
              
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>
              
              <div className="plan-price">
                <span className="currency">$</span>
                <span className="amount">{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                <span className="period">/{isYearly ? 'year' : 'month'}</span>
              </div>
              
              {isYearly && (
                <div className="monthly-equivalent">
                  ${Math.round(plan.yearlyPrice / 12)}/mo when billed annually
                </div>
              )}
              
              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={feature.included ? 'included' : 'not-included'}>
                    {feature.included ? (
                      <CheckIcon className="feature-icon included" />
                    ) : (
                      <XMarkIcon className="feature-icon not-included" />
                    )}
                    {feature.name}
                  </li>
                ))}
              </ul>
              
              <button className={`btn-plan-cta ${plan.highlighted ? 'highlighted' : ''}`}>
                {plan.ctaText}
                {plan.name !== 'Enterprise' && <ArrowRightIcon className="icon-sm" />}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingFaq() {
  const [openItem, setOpenItem] = useState(null);
  
  const faqItems = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards including Visa, Mastercard, and American Express, as well as PayPal. For Enterprise plans, we also offer invoicing options."
    },
    {
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial on all our plans. No credit card required to start, and you can cancel anytime during the trial period."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee. If you're not satisfied with our service within the first 30 days, contact our support team for a full refund."
    },
    {
      question: "What happens when I reach my user limit?",
      answer: "You'll receive a notification when you're approaching your user limit. You can then choose to upgrade to a higher tier plan or stay on your current plan, but new users won't be able to be added until space becomes available."
    }
  ];
  
  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };
  
  return (
    <section className="pricing-faq">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${openItem === index ? 'open' : ''}`}
              onClick={() => toggleItem(index)}
            >
              <div className="faq-question">
                <h3>{item.question}</h3>
                <div className="faq-icon">
                  <span className="vertical"></span>
                  <span className="horizontal"></span>
                </div>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnterpriseContact() {
  return (
    <section className="enterprise-contact">
      <div className="container">
        <div className="enterprise-card">
          <div className="enterprise-content">
            <h2>Need a custom solution?</h2>
            <p>Our enterprise plan can be tailored to your organization's specific requirements. Contact our sales team to discuss your needs.</p>
            <ul className="enterprise-features">
              <li>
                <CheckIcon className="enterprise-icon" />
                Custom integration support
              </li>
              <li>
                <CheckIcon className="enterprise-icon" />
                Dedicated account manager
              </li>
              <li>
                <CheckIcon className="enterprise-icon" />
                SLA guarantees
              </li>
              <li>
                <CheckIcon className="enterprise-icon" />
                Custom development options
              </li>
            </ul>
          </div>
          <div className="enterprise-action">
            <button className="btn-enterprise">
              Contact Enterprise Sales
            </button>
            <a href="#" className="enterprise-link">Schedule a demo</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingTestimonial() {
  return (
    <section className="pricing-testimonial">
      <div className="container">
        <div className="testimonial-card">
          <div className="quote-mark">"</div>
          <blockquote>
            React+Node.JS Lite has dramatically accelerated our development process. What would have taken us months to build from scratch was deployed in just a couple of weeks.
          </blockquote>
          <div className="testimonial-author">
            <div className="author-avatar">
              <img src="https://via.placeholder.com/60" alt="Testimonial author" />
            </div>
            <div className="author-info">
              <h4>Sarah Johnson</h4>
              <p>CTO, TechStart Inc</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 