import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ToastContainer } from '@/components/ui/Toast';
import { SignIn } from '@/screens/SignIn';
import { NewMakeover } from '@/screens/NewMakeover';
import { Result } from '@/screens/Result';
import { Gallery } from '@/screens/Gallery';
import { GalleryEmpty } from '@/screens/GalleryEmpty';
import { ConceptDetail } from '@/screens/ConceptDetail';
import { Dev } from '@/screens/Dev';
import { MOCK_USER } from '@/data/mockData';
import type { MockUser } from '@/types';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [user, setUser] = useState<MockUser | null>(MOCK_USER);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    setUser(MOCK_USER);
    setAuthChecked(true);
  }, []);

  if (!authChecked) return null;

  if (!user) {
    return (
      <BrowserRouter>
        <ScrollToTop />
        <ToastContainer />
        <Routes>
          <Route path="/signin" element={<SignIn onAuthSuccess={setUser} />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ToastContainer />
      <Layout user={user} onSignOut={() => setUser(null)}>
        <Routes>
          <Route path="/signin" element={<Navigate to="/gallery" replace />} />
          <Route path="/new-makeover" element={<NewMakeover />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/dev/gallery-empty" element={<GalleryEmpty />} />
          <Route path="/concept/:id" element={<ConceptDetail />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="/" element={<Navigate to="/gallery" replace />} />
          <Route path="*" element={<Navigate to="/gallery" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
