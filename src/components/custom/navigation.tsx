'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Book, Plus, List } from 'lucide-react';
import styles from './navigation.module.css';

const BottomNav = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { name: 'Home', icon: <Home />, id: 'home' },
    { name: 'Inventory', icon: <List />, id: 'inventory' },
    { name: 'Add Item', icon: <Plus />, id: 'add' },
    { name: 'Recipes', icon: <Book />, id: 'recipes' },
  ];

  return (
    <div
      className={
        styles.bottomNav + ' bottom-nav fixed bottom-0 left-0 right-0 z-50'
      }
    >
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 ${
              activeTab === tab.id
                ? styles.bottomNavActive
                : styles.bottomNavInactive
            }`}
          >
            {tab.icon}
            <span>{tab.name}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeIndicator"
                className={`w-1/2 h-1 rounded-full ${styles.bottomNavActiveIndicator}`}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
