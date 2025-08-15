import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { GlobalStyles } from './styles/global';
import Navigation from './components/Navigation';
import Home from './routes/Home';
import About from './routes/About';
import Settings from './routes/Settings';

function App() {
  return (
    <ThemeProvider>
      <GlobalStyles />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
