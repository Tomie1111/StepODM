import styles from './styles.module.css';

const productData = {
  "Kiosk": {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
    subcategories: {
      "Self-Service Kiosk": [],
      "Retail & Payment Kiosk": [],
      "Advertising & Marketing Kiosk": [],
      "Healthcare Kiosk": []
    }
  },
  "LED Display": {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 2v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2z" /></svg>`,
    subcategories: {
      "Cabinet indoor": [],
      "Cabinet Outdoor": [],
      "Pylon sign": [],
      "Digital signage": [],
      "Floor Stand": []
    }
  },
  "LCD Display": {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="14" rx="2" ry="2" /><line x1="8" y1="20" x2="16" y2="20" /></svg>`,
    subcategories: {
      "LCD indoor": [],
      "LCD Outdoor": []
    }
  },
  "Smart City": {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>`,
    subcategories: {
      "Smart furniture": [],
      "Smart Pole": [],
      "Smart shelter": []
    }
  }
};

export default function Sidebar({ 
  selectedCategory, 
  selectedMainCategory,
  onSelectCategory, 
  onClose,
  isVisible = true,
  className = '' 
}) {
  
  const handleMainCategoryClick = (category) => {
    // Set main category and clear subcategory
    onSelectCategory(category, '');
  };

  const handleSubCategoryClick = (mainCategory, subCategory) => {
    onSelectCategory(mainCategory, subCategory);
    // Removed onClose() - sidebar will stay open when selecting subcategory
  };

  const handleShowAll = () => {
    onSelectCategory('', '');
    onClose();
  };

  return (
    <aside
      className={`${styles.sidebar} ${isVisible ? styles.slideIn : styles.slideOut} ${className}`}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>หมวดหมู่สินค้า</h3>
        <button className={styles.close} onClick={onClose}>×</button>
      </div>

      <nav>
        {Object.entries(productData).map(([category, data]) => (
          <div key={category} className={styles.categoryGroup}>
            <h4 
              className={`${styles.categoryTitle} ${
                selectedMainCategory === category ? styles.activeMainCategory : ''
              }`}
              onClick={() => handleMainCategoryClick(category)}
            >
              <span dangerouslySetInnerHTML={{ __html: data.icon }} />
              <span>{category}</span>
            </h4>
            
            <ul className={styles.menu}>
              {Object.keys(data.subcategories).map((sub) => (
                <li
                  key={sub}
                  className={`${styles.menuItem} ${
                    selectedCategory === sub ? styles.active : ''
                  }`}
                  onClick={() => handleSubCategoryClick(category, sub)}
                >
                  {sub}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <hr className={styles.divider} />

        <ul className={styles.menu}>
          <li
            className={`${styles.menuItem} ${
              !selectedMainCategory && !selectedCategory ? styles.active : ''
            }`}
            onClick={handleShowAll}
          >
            สินค้าทั้งหมด
          </li>
        </ul>
      </nav>
    </aside>
  );
}