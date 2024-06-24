import WorkShowcase from '@/components/work/WorkShowcase';

const Portfolio = () => (
  <main className="py-10 min-h-screen flex flex-col justify-center">
    <WorkShowcase
      className="mt-10"
      works={[
        { title: 'Megura', type: 'VTuber', image: '/image1.png' },
        { title: 'Megura1', type: 'VTuber', image: '/image2.png' },
        { title: 'Megura2', type: 'VTuber', image: '/image3.png' },
      ]}
    />
  </main>
);

export default Portfolio;
