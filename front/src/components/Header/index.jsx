import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { ShoppingCart, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Header({ onToggleSidebar, cartCount, onCartClick }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    
    { label: 'Kiosk', value: 'Kiosk' },
    { label: 'LED Display', value: 'LED Display' },
    { label: 'LCD Display', value: 'LCD Display' },
    { label: 'Smart City', value: 'Smart City' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    const onClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', onScroll);
    document.addEventListener('mousedown', onClickOutside);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/shop?cat=${encodeURIComponent(category)}`);
    setDropdownOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.left}>
        <button onClick={onToggleSidebar} className={styles.toggleButton}>☰</button>
        <Link to="/shop" className={styles.logo}>STEP ODM</Link>
      </div>

      <nav className={styles.centerNav}>
        <a href="/">หน้าแรก</a>
        <a href="/shop">สินค้าทั้งหมด</a>

        <div className={styles.dropdown} ref={dropdownRef}>
          <button
            className={styles.dropdownToggle}
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            สินค้า <ChevronDown size={16} className={styles.arrow} />
          </button>

          {isDropdownOpen && (
            <div className={styles.dropdownMenu}>
              {categories.map((cat) => (
                <a
                  key={cat.value}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(cat.value);
                  }}
                >
                  {cat.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <a href="#" onClick={(e) => {
          e.preventDefault();
          scrollToFooter();
        }}>
          เกี่ยวกับเรา
        </a>
      </nav>

      {/* <div className={styles.right}>
        <button
          onClick={onCartClick}
          className={styles.cartButton}
          aria-label="Open cart"
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className={styles.cartCount}>
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </button>
      </div> */}
    </header>
  );
}