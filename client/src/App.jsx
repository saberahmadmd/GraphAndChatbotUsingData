import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index.jsx';
import NotFound from './pages/NotFound.jsx';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;