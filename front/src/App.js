import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Shop from './pages/Shop';
import Detail from './pages/Detail';
import { CartProvider } from './pages/Shop/CartContext';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Main shop route */}
          <Route path="/shop" element={<Shop />} />

          {/* Detail page route */}
          <Route path="/detail/:id" element={<Detail />} />

          {/* Redirect root path to /shop */}
          <Route path="/" element={<Navigate to="/shop" replace />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;