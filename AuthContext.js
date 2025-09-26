import React, { createContext, useContext, useMemo, useState } from 'react';

const DEMO_ACCOUNT = { email: 'demo@skillswap.app', password: 'password', name: 'Demo User', location: 'Lahore, PK', work: 'Freelancer', bio: 'Love swapping skills!', website: '' };

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [createdAccount, setCreatedAccount] = useState(null);

  const login = (email, password) => {
    const isDemo = email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password;
    const isCreated = createdAccount && email === createdAccount.email && password === createdAccount.password;
    if (isDemo) {
      setUser({ email: DEMO_ACCOUNT.email, name: DEMO_ACCOUNT.name, location: DEMO_ACCOUNT.location, work: DEMO_ACCOUNT.work, bio: DEMO_ACCOUNT.bio, website: DEMO_ACCOUNT.website });
      return true;
    }
    if (isCreated) {
      setUser({ email: createdAccount.email, name: createdAccount.name, location: createdAccount.location || '', work: createdAccount.work || '', bio: createdAccount.bio || '', website: createdAccount.website || '' });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const updateProfile = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
    if (createdAccount && createdAccount.email === (user?.email || '')) {
      setCreatedAccount({ ...createdAccount, ...updates });
    }
  };

  const value = useMemo(() => ({ user, login, logout, updateProfile, createdAccount, setCreatedAccount, demo: DEMO_ACCOUNT }), [user, createdAccount]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


