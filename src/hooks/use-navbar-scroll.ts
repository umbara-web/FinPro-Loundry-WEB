import { useScroll, useTransform } from 'framer-motion';

export function useNavbarScrollAnimations() {
  const { scrollY } = useScroll();

  const width = useTransform(scrollY, [0, 100], ['100%', '90%']);
  const maxWidth = useTransform(scrollY, [0, 100], ['100%', '72rem']);
  const top = useTransform(scrollY, [0, 100], [0, 20]);
  const borderRadius = useTransform(scrollY, [0, 100], [0, 24]);
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(4px)', 'blur(12px)']
  );
  const border = useTransform(
    scrollY,
    [0, 100],
    ['1px solid rgba(0,0,0,0.05)', '1px solid rgba(255,255,255,0.2)']
  );
  const shadow = useTransform(
    scrollY,
    [0, 100],
    [
      'none',
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    ]
  );

  return {
    scrollY,
    width,
    maxWidth,
    top,
    borderRadius,
    backdropBlur,
    border,
    shadow,
  };
}
