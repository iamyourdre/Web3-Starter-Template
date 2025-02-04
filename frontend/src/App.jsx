import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { WalletProvider } from './contexts/WalletContext';
import BasicLayout from './layouts/BasicLayout';
import Index from './pages/Index';

function App() {
  return (
    <HelmetProvider>
        <WalletProvider>
          <Router>
            <Routes>
              <Route path="/" element={<BasicLayout />} >
                <Route path='/' element={<Index />} />
              </Route>
            </Routes>
          </Router>
        </WalletProvider>
    </HelmetProvider>
  );
}

export default App;