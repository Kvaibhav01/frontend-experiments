'use client';

import Image from 'next/image';
import styles from './style.module.scss';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CardParallax({
  index,
  title,
  description,
  src,
  link,
  color,
  progress,
  range,
  targetScale,
}) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const scaleFactor = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const cardScale = useTransform(progress, range, [1, targetScale]);
  const parallaxFactor = 25;

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div
        style={{
          backgroundColor: color,
          top: `calc(-10% + ${index * parallaxFactor}px)`,
          scale: cardScale,
        }}
        className={styles.card}
      >
        <h2>{title}</h2>
        <div className={styles.body}>
          <div className={styles.description}>
            <p>{description}</p>
            <span>
              <a href={link} target='_blank'>
                See more
              </a>
              <svg
                width='22'
                height='12'
                viewBox='0 0 22 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M15.3172 7.44229L9.69219 13.0673C9.57491 13.1846 9.41585 13.2505 9.25 13.2505C9.08415 13.2505 8.92509 13.1846 8.80781 13.0673C8.69054 12.95 8.62465 12.791 8.62465 12.6251C8.62465 12.4593 8.69054 12.3002 8.80781 12.1829L13.3664 7.6251H1.125C0.95924 7.6251 0.800269 7.55926 0.683058 7.44205C0.565848 7.32484 0.5 7.16586 0.5 7.0001C0.5 6.83434 0.565848 6.67537 0.683058 6.55816C0.800269 6.44095 0.95924 6.3751 1.125 6.3751H13.3664L8.80781 1.81729C8.69054 1.70002 8.62465 1.54096 8.62465 1.3751C8.62465 1.20925 8.69054 1.05019 8.80781 0.932916C8.92509 0.81564 9.08415 0.749756 9.25 0.749756C9.41585 0.749756 9.57491 0.81564 9.69219 0.932916L15.3172 6.55792C15.3753 6.61596 15.4214 6.68489 15.4528 6.76077C15.4843 6.83664 15.5005 6.91797 15.5005 7.0001C15.5005 7.08224 15.4843 7.16357 15.4528 7.23944C15.4214 7.31531 15.3753 7.38425 15.3172 7.44229Z'
                  fill='black'
                />
              </svg>
            </span>
          </div>
          <div className={styles.imageContainer}>
            <motion.div className={styles.inner} style={{ scale: scaleFactor }}>
              <Image fill src={`/images/${src}`} alt={description} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
