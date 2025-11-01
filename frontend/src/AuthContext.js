import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from './supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    // Check active sessions and sets the user
    const session = supabase.auth.getSession();
    setUser(session?.user || null);
    setLoading(false);

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("Auth state change detected:", { event: _event, hasSession: !!session });
        setUser(session?.user || null);
        setLoading(false);

        // If user logs in, call backend to sync/validate
        if (_event === 'SIGNED_IN' && session?.access_token) {
          console.log("User signed in. Calling backend /api/auth...");
          const token = session.access_token;
          try {
            const response = await fetch('/api/auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token }),
            });
            console.log("Backend /api/auth response status:", response.status);
            const responseBody = await response.json();
            console.log("Backend /api/auth response body:", responseBody);

            if (!response.ok) {
              console.error("Backend /api/auth call failed:", responseBody);
            }
          } catch (error) {
            console.error("Error calling backend /api/auth:", error);
          }
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Expose the auth modal state
  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  // Sign out function
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  // Return the auth context value
  const value = {
    user,
    loading,
    signOut,
    authModalOpen,
    openAuthModal,
    closeAuthModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 