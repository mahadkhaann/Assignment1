import React, { createContext, useState } from 'react';

export const SkillContext = createContext();

export function SkillProvider({ children }) {
  const [skills, setSkills] = useState([
    { id: '1', title: 'Web Development', desc: 'Learn to build websites with HTML, CSS, JS', ownerEmail: 'demo@skillswap.app', likeCount: 3 },
    { id: '2', title: 'Mobile Apps', desc: 'React Native and Flutter basics', ownerEmail: 'demo@skillswap.app', likeCount: 5 },
    { id: '3', title: 'Data Science', desc: 'Python, Pandas, Machine Learning', ownerEmail: 'demo@skillswap.app', likeCount: 2 },
    { id: '4', title: 'Video Editing', desc: 'Adobe Premiere Pro & CapCut tricks', ownerEmail: 'demo@skillswap.app', likeCount: 1 },
    { id: '5', title: 'Public Speaking', desc: 'Boost your confidence and communication', ownerEmail: 'demo@skillswap.app', likeCount: 4 },
  ]);

  const addSkill = (skill) => {
    const withId = { ...skill, id: String(Date.now()) };
    setSkills((prev) => [...prev, withId]);
    return withId;
  };

  const updateSkill = (id, updates) => {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteSkill = (id) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const likeSkill = (id) => {
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, likeCount: (s.likeCount || 0) + 1 } : s)));
  };

  return (
    <SkillContext.Provider value={{ skills, setSkills, addSkill, updateSkill, deleteSkill, likeSkill }}>
      {children}
    </SkillContext.Provider>
  );
}
