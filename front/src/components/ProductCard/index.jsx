import { Link } from 'react-router-dom';
import styles from './styles.module.css';

export default function ProductCard({ product, onClick }) {
  const formattedPrice =
    typeof product.price === 'number'
      ? `฿${product.price.toLocaleString()}`
      : 'ไม่มีราคา';

  const firstImage = product.images?.[0]
    ? `http://172.16.2.61:5150/uploads/${product.images[0]}`
    : '/placeholder.jpg';

  return (
    <div className={styles.card} onClick={onClick}>
      <img src={firstImage} alt={product.productName} className={styles.image} />
      <h3 className={styles.name}>{product.productName}</h3>
      <p className={styles.desc}>
        {product.category} / {product.subcategory[0]}
      </p>
      <p className={styles.price}>{formattedPrice}</p>

      <div
        className={styles.detailContainer}
        onClick={(e) => e.stopPropagation()} // ❗ Stop click from triggering modal
      >
        <Link to={`/detail/${product._id}`} className={styles.detailLink}>
          รายละเอียด
        </Link>
      </div>
    </div>
  );
}