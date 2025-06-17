import { Routes, Route } from 'react-router-dom';
import NewsBanner from './components/Home/Banner';
import Stories from './components/Home/Stories';
import News from './components/Home/News';
import Nav from './components/Home/Nav';
import Count from './components/Home/Count';
import Tab from './components/Home/Tab';
import Hero from './components/Home/Trop';
import About from './Pages/AboutPage/About';
import Team from './Pages/Team';
import Matches from './Pages/Matches';
import Gallery from './Pages/Gallery';
import Contacts from './Pages/Contacts';
import Footer from './components/Home/Footer';
import Video from './components/Videoef';

const Home = () => (
  <>
    <NewsBanner />
    <Stories />
    <Count />
    <Video />
    <News />
    <Tab />
    <Hero />
    <Footer />
  </>
);

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </div>
  );
};

export default App;
