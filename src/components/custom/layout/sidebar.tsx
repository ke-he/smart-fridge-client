'use client';

import { motion } from 'framer-motion';
import styles from './sidebar.module.css';
import Link from 'next/link';
import { useRoute } from '@/contexts/route.context';

const SidebarNav = () => {
    const { activeTabId, setActiveTabId, tabs } = useRoute();

    return (
        <div className={styles.sidebarNav + ' sidebar-nav fixed top-0 left-0 h-full w-64 z-50'}>
            <div className="flex flex-col items-start py-6 px-5">
                {tabs.map((tab) => (
                    <Link key={tab.id} href={tab.path} passHref>
                        <button
                            onClick={() => setActiveTabId(tab.id)}
                            className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl transition-all ${
                                activeTabId === tab.id
                                    ? styles.sidebarNavActive
                                    : styles.sidebarNavInactive
                            }`}
                        >
                            {tab.icon}
                            <span className={styles.sidebarText}>{tab.name}</span>
                            {activeTabId === tab.id && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className={`h-full w-1 rounded-full ${styles.sidebarNavActiveIndicator}`}
                                />
                            )}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SidebarNav;
