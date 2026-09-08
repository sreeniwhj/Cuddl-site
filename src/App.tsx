import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WaitlistProvider } from './context/WaitlistContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { OurWhyPage } from './pages/OurWhyPage';
import { WhyThisWorksPage } from './pages/WhyThisWorksPage';
import { FaqsPage } from './pages/FaqsPage';

export default function App() {
  return (
    <BrowserRouter>
      <WaitlistProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="shop/:slug" element={<ProductDetailPage />} />
            <Route path="our-why" element={<OurWhyPage />} />
            <Route path="why-this-works" element={<WhyThisWorksPage />} />
            <Route path="faqs" element={<FaqsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </WaitlistProvider>
    </BrowserRouter>
  );
}
