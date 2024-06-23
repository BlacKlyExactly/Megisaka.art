import { cn } from '@/utils/cn';

const Bars = ({ className }: { className?: string }) => (
  <svg
    className={cn('text-white', className)}
    width="28"
    height="15"
    viewBox="0 0 28 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line y1="2" x2="28" y2="2" stroke="currentColor" strokeWidth="2" />
    <line y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default Bars;
