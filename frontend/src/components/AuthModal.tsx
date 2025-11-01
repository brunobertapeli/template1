import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useAuth } from '../AuthContext'
import { supabase } from '../supabase'

export default function AuthModal() {
  const { authModalOpen, closeAuthModal } = useAuth()

  if (!authModalOpen) return null

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal-container">
        <button className="auth-modal-close" onClick={closeAuthModal}>×</button>
        <div className="auth-modal-content">
          <h2 className="auth-modal-title">Sign In / Sign Up</h2>
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'var(--primary)',
                    brandAccent: 'var(--primary-dark)',
                  },
                },
              },
            }}
            providers={['google', 'facebook', 'apple']}
            redirectTo={window.location.origin}
            magicLink={true}
          />
        </div>
      </div>
    </div>
  )
}
