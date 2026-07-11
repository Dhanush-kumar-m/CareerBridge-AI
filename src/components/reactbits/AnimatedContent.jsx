import { useRef, useEffect } from 'react';

const AnimatedContent = ({
  children,
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power3.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  yOffset,
  xOffset,
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let activeCtx = null;

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        gsap.set(el, {
          visibility: 'visible',
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1
        });
        return;
      }

      let scrollerTarget = container || document.getElementById('snap-main-container') || null;

      if (typeof scrollerTarget === 'string') {
        scrollerTarget = document.querySelector(scrollerTarget);
      }

      const axis = direction === 'horizontal' ? 'x' : 'y';
      const activeDistance = yOffset !== undefined ? yOffset : (xOffset !== undefined ? xOffset : distance);
      const offset = reverse ? -activeDistance : activeDistance;
      const startPct = (1 - threshold) * 100;

      const ctx = gsap.context(() => {
        gsap.set(el, {
          [axis]: offset,
          scale,
          opacity: animateOpacity ? initialOpacity : 1,
          visibility: 'visible'
        });

        const tl = gsap.timeline({
          paused: true,
          delay,
          onComplete: () => {
            if (onComplete) onComplete();
            if (disappearAfter > 0) {
              gsap.to(el, {
                [axis]: reverse ? distance : -distance,
                scale: 0.8,
                opacity: animateOpacity ? initialOpacity : 0,
                delay: disappearAfter,
                duration: disappearDuration,
                ease: disappearEase,
                onComplete: () => onDisappearanceComplete?.()
              });
            }
          }
        });

        tl.to(el, {
          [axis]: 0,
          scale: 1,
          opacity: 1,
          duration,
          ease
        });

        ScrollTrigger.create({
          trigger: el,
          scroller: scrollerTarget,
          start: `top ${startPct}%`,
          once: true,
          onEnter: () => tl.play()
        });
      }, el);

      activeCtx = ctx;
    });

    return () => {
      if (activeCtx) {
        activeCtx.revert();
      }
    };
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete,
    yOffset,
    xOffset
  ]);

  return (
    <div ref={ref} className={className} style={{ visibility: 'hidden' }} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;
