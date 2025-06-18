"use client";

import { useEffect, useState } from 'react';
import styles from '@/style/detail-page.module.scss';
import { motion } from 'motion/react';

const NotionList = () => {
    const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const parentElement = document.querySelector('.notion');
            if(!parentElement) return;
            
            const h3Elements = parentElement.querySelectorAll('h3');
            
            const headingList = Array.from(h3Elements).map((h3, index) => {
                if (!h3.id) {
                    h3.id = `heading-${index}`;
                }
                
                return {
                    id: h3.id,
                    text: h3.textContent || `Heading ${index + 1}`
                };
            });
            
            setHeadings(headingList);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    if (headings.length === 0) {
        return null;
    }

    return (
        <motion.ul 
            initial={{ opacity: 0,}}
            animate={{ opacity: 1,}}
            transition={{ duration: 0.5 }}
            className={`${styles["notion-list"]} notion-list-column`}>
            <li><h2>List</h2></li>
            {headings.map((heading) => (
                <li key={heading.id} className="notion-text">
                    <a 
                        href={`#${heading.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToHeading(heading.id);
                        }}
                        className="notion-list-link"
                    >
                        <p>{heading.text.substring(0, 12)}...</p>
                    </a>
                </li>
            ))}
        </motion.ul>
    );
};

export default NotionList;