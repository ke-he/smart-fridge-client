'use client';

import { motion } from 'framer-motion';
import styles from './navigation.module.css';
import Link from 'next/link';
import { useRoute } from '@/contexts/route.context';

const BottomNav = () => {
  const { activeTabId, setActiveTabId, tabs } = useRoute();

  return (
    <div
      className={
        styles.bottomNav + ' bottom-nav fixed bottom-0 left-0 right-0 z-50'
      }
    >
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => (
          <Link key={tab.id} href={tab.path} passHref>
            <button
              onClick={() => setActiveTabId(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 ${
                activeTabId === tab.id
                  ? styles.bottomNavActive
                  : styles.bottomNavInactive
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
              {activeTabId === tab.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`w-1/2 h-1 rounded-full ${styles.bottomNavActiveIndicator}`}
                />
              )}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
