import React from 'react';
import styles from './Marquee.module.css';

const DiaryPetMarquee = () => {
    const petEntries = [
        "Fluffy's first walk today! 🐶",
        "Whiskers caught a toy mouse! 🐱",
        "Polly learned a new trick! 🦜",
        "Bubbles swam in circles! 🐠",
        "Hoppy munched on fresh carrots! 🐰"
    ];

    return (
        <div className={styles.marqueeContainer}>
            <div className={styles.marqueeWrapper}>
                {petEntries.map((entry, index) => (
                    <React.Fragment key={index}>
                        <div className={styles.marqueeItem}>{entry}</div>
                        <div aria-hidden="true" className={styles.marqueeItem}>{entry}</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default DiaryPetMarquee;