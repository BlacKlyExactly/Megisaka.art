import Loader from '@/components/ui/Loader';

const LoadingScreen = () => (
  <div className="w-screen h-screen fixed top-0 left-0 z-10 bg-crimson flex items-center justify-center">
    <Loader className="w-20 h-20 fill-[#1f1f1f] text-crimson" />
  </div>
);

export default LoadingScreen;
