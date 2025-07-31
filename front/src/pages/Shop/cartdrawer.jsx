import React from 'react';
import styles from './Cartdrawer.module.css';
import { useCart } from './CartContext';

export default function CartModal({ isOpen, onClose }) {
  const { cartItems, removeFromCart, getTotalPrice, updateQuantity } = useCart();

  return (
    <>
      {isOpen && <div className={styles.drawerOverlay} onClick={onClose} />}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ''}`}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <div className={styles.header}> ตะกร้าสินค้า ({cartItems.length})</div>

        <div className={styles.itemList}>
          {cartItems.length === 0 ? (
            <p>ยังไม่มีสินค้าในตะกร้า</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <img src={item.image} alt={item.name} className={styles.image} />

                <div className={styles.details}>
                  <div className={styles.name}>{item.name}</div>
                  <div className={styles.price}>฿ {item.price.toLocaleString()}</div>
                </div>

                <div className={styles.controls}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>

                <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                  ×
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.total}>
              รวมทั้งหมด: ฿ {getTotalPrice().toLocaleString()}
            </div>
            <button className={styles.checkoutBtn}>ดำเนินการชำระเงิน</button>
          </div>
        )}
      </div>
    </>
  );
}