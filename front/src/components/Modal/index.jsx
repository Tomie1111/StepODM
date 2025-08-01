import styles from './styles.module.css';

export default function Modal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const firstImage = Array.isArray(product.images) && product.images[0]
    ? `https://backend-catalog.eds-center.com/uploads/${product.images[0]}`
    : '/placeholder.jpg';

  const specList =
    typeof product.specification === 'string'
      ? product.specification.split('\n').filter(Boolean)
      : Array.isArray(product.specification)
      ? product.specification
      : [];

  const datasheetUrl = product.datasheet
    ? `https://backend-catalog.eds-center.com/uploads/${product.datasheet}`
    : null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>×</button>

        <div className={styles.grid}>
          <div className={styles.imageWrapper}>
            <img
              src={firstImage}
              alt={product.productName}
              className={styles.image}
            />
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>{product.productName}</h2>
            <p className={styles.category}>
              หมวดหมู่: {product.category} / {product.subcategory[0]}
            </p>

            <h3 className={styles.section}>คุณสมบัติเด่น</h3>
            <ul className={styles.specs}>
              {specList.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>

            <h3 className={styles.section}>รายละเอียด</h3>
            <p className={styles.desc}>{product.description}</p>

            <div className={styles.actions}>
              {datasheetUrl && (
                <a
                  href={datasheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.downloadBtn}
                >
                  โหลด Data sheet
                </a>
              )}
              <button
                className={styles.addBtn}
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
              >
                เพิ่มในรายการเสนอราคา
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}