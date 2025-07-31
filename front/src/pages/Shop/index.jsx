import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import ProductCard from '../../components/ProductCard';
import Modal from '../../components/Modal';
import CartModal from './cartdrawer';
import styles from './styles.module.css';
import { useCart } from './CartContext';
import Footer from '../../components/Footer';

export default function Shop() {
  const [selected, setSelected] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [isCartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
  const { addToCart, cartItems } = useCart();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  
  const handleCategorySelect = (mainCategory, subCategory, closeSidebar = false) => {
    setSelectedMainCategory(mainCategory);
    setSelectedSubCategory(subCategory);
    
    
    if (isMobile && closeSidebar) {
      setSidebarVisible(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 850;
      setIsMobile(mobile);
      
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const cat = query.get('cat');
    if (cat) {
      setSelectedMainCategory(cat);
      setSelectedSubCategory('');
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://172.16.2.61:5150/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, []);

  
  const filteredProducts = products.filter((product) => {
    const productMain = product.category;

    const subcategories = Array.isArray(product.subcategory)
      ? product.subcategory
      : typeof product.subcategory === 'string'
      ? [product.subcategory]
      : [];

    if (!selectedMainCategory && !selectedSubCategory) {
      return true; 
    }

    if (selectedSubCategory) {      
      return subcategories.includes(selectedSubCategory);
    }

    if (selectedMainCategory) {      
      return productMain === selectedMainCategory;
    }

    return true;
  });

  return (
    <>
      <Header
        onToggleSidebar={toggleSidebar}
        cartCount={cartItems.length}
        onCartClick={() => setCartOpen(true)}
      />

      {sidebarVisible && isMobile && (
        <div className={styles.backdrop} onClick={() => setSidebarVisible(false)} />
      )}

      <div className={styles.container}>
        {(!isMobile || sidebarVisible) && (
          <Sidebar
            isVisible={sidebarVisible}
            onClose={() => setSidebarVisible(false)}
            selectedCategory={selectedSubCategory}
            selectedMainCategory={selectedMainCategory}
            onSelectCategory={handleCategorySelect}
            className={isMobile && sidebarVisible ? 'open' : ''}
          />
        )}

        <main
          className={`${styles.main} ${
            !sidebarVisible && !isMobile ? styles.fullWidthMain : ''
          }`}
        >
          <h1 className={styles.title}>
            {selectedSubCategory || selectedMainCategory || 'สินค้า'}
          </h1>
          <p className={styles.totalCount}>
            สินค้าทั้งหมด {filteredProducts.length} รายการ
          </p>

          <div className={styles.grid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onClick={() => setSelected(product)}
                />
              ))
            ) : (
              <p>ไม่มีสินค้าภายใต้หมวดหมู่นี้</p>
            )}
          </div>
        </main>
      </div>

      <Modal product={selected} onClose={() => setSelected(null)} onAddToCart={addToCart} />
      <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      <Footer />
    </>
  );
}