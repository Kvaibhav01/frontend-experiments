'use client';

import { useEffect, useRef } from 'react';
import CardParallax from './components/card-parallax';
import CardScale from './components/card-scale';
import { projects } from './data';
import styles from './page.module.scss';
import { useScroll } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <main ref={container} className={styles.main}>
      {projects.map((project, index) => {
        const targetScale = 1 - (projects.length - index) * 0.05;
        return (
          <>
            {/* <CardScale key={index} {...projects} /> */}
            <CardParallax
              key={index}
              index={index}
              {...project}
              range={[index * 0.25, 1]}
              targetScale={targetScale}
              progress={scrollYProgress}
            />
          </>
        );
      })}
    </main>
  );
}
