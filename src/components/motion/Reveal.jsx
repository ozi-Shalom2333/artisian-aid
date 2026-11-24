import { useState } from 'react';
import * as m from 'framer-motion/m';
import useReducedMotionPreference from '../../hooks/useReducedMotionPreference';
import { revealTransition } from './settings';

const elements = { div: m.div, section: m.section, article: m.article };
const resting = { y: 0 };
const entering = { y: 12 };
const viewport = { once: true, amount: 'some', margin: '0px 0px -24px 0px' };

export default function Reveal({
  as = 'div',
  delay = 0,
  className = '',
  onFocusCapture,
  children,
  ...props
}) {
  const reducedMotion = useReducedMotionPreference();
  const [focused, setFocused] = useState(false);
  const supported = typeof IntersectionObserver === 'function';
  const immediate = reducedMotion || focused || !supported;
  const Element = elements[as];

  return (
    <Element
      {...props}
      className={`motion-reveal ${className}`.trim()}
      initial={immediate ? false : entering}
      animate={immediate ? resting : undefined}
      whileInView={immediate ? undefined : resting}
      viewport={viewport}
      transition={
        immediate
          ? { duration: 0, delay: 0 }
          : { ...revealTransition, delay: Math.min(0.09, Math.max(0, delay)) }
      }
      onFocusCapture={(event) => {
        // A keyboard target must never wait for a scroll reveal.
        setFocused(true);
        onFocusCapture?.(event);
      }}
    >
      {children}
    </Element>
  );
}
