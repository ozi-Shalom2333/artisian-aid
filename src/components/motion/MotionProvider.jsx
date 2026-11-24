import { LazyMotion, MotionConfig } from 'framer-motion';
import { revealTransition } from './settings';

// Animation support is optional; a failed chunk must not block reading or navigation.
const loadFeatures = () => import('./features').then((module) => module.default).catch(() => ({}));

export default function MotionProvider({ children }) {
  return (
    <MotionConfig reducedMotion="user" transition={revealTransition}>
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
