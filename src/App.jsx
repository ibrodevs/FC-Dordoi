import { Routes, Route } from 'react-router-dom';
import NewsBanner from './components/Home/Banner';
import Stories from './components/Home/Stories';
import News from './components/Home/News';
import Nav from './components/Home/Nav';
import Count from './components/Home/Count';
import Tab from './components/Home/Tab';
import Hero from './components/Home/Trop';
import About2 from './Pages/AboutPage/About.jsx';
import About from './components/Home/About';
import Team from './Pages/Team';
import Matches from './Pages/Matches';
import Gallery from './Pages/Gallery';
import Contacts from './Pages/Contacts';
import Footer from './components/Home/Footer';
import Photo from './components/Home/Photo';

const Home = () => (
  <>
    <NewsBanner />
    <Stories />
    <About />
     <Photo url="https://yt3.googleusercontent.com/9Stf2JZZHeP8JdDwhxM39324uHVgSEPR7p5RCskpGqrU3JjEXKevWkQw15oaflnF1pAf_R63UVs=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" alt="Моё фото" />
    <News />
    <Count />
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
        <Route path="/about" element={<About2 />} />
        <Route path="/team" element={<Team />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </div>
  );
};

export default App;
