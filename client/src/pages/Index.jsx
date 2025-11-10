import Navbar from '../components/Navbar/Navbar';
import Home from '../components/Home/Home';
import MainComponent from '../components/MainComponent/MainComponent';
import RecentThings from '../components/RecentThings/RecentThings';
import More from '../components/More/More';
import Footer from '../components/Footer/Footer';
import Chatbot from '../components/Chatbot/Chatbot';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Home />
      <MainComponent />
      <RecentThings />
      <More />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;