import WorkShowcase from '@/components/work/WorkShowcase';
import SectionContent from '@/components/section/SectionContent';
import Commisions from '@/components/section/Commisions';
import Header from '@/components/section/home/Header';

const Home = () => (
  <>
    <Header />
    <main className="mt-24 text-center lg:text-left lg:mt-0">
      <Commisions open={true} />
      <section id="latest">
        <SectionContent title="Latest work">
          Click/Tap to edit me. That Biff, what a character. Always trying to
          get away with something. Click/Tap to edit me. That Biff, what a
          character. Always trying to get away with something.
        </SectionContent>
        <WorkShowcase
          className="mt-10"
          works={[
            { title: 'Megura', type: 'VTuber', image: '/images/image1.png' },
            { title: 'Megura1', type: 'VTuber', image: '/images/image2.png' },
            {
              title: 'Megura2',
              type: 'VTuber',
              image: '/images/image3.png',
            },
          ]}
        />
      </section>
    </main>
  </>
);

export default Home;
