import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import GLBViewer from "../../components/GLBViewer";
import styles from "./styles.module.css";

export default function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    fetch(`http://172.16.2.61:5150/api/products/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid JSON");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setActiveIndex(0);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [id]);

  if (!product) return <div className={styles.loading}>Loading...</div>;

  const imageUrls = Array.isArray(product.images)
    ? product.images.map((img) => ({
        type: "image",
        url: `http://172.16.2.61:5150/uploads/${img}`,
      }))
    : [];

  const modelItem = product.model3d
    ? {
        type: "model3d",
        url: `http://172.16.2.61:5150/uploads/${product.model3d}`,
      }
    : null;

  const mediaItems = [...imageUrls, ...(modelItem ? [modelItem] : [])];

  if (mediaItems.length === 0) {
    return <div className={styles.loading}>No media to display</div>;
  }

  const handleArrow = (dir) => {
    setActiveIndex((prev) =>
      dir === "left"
        ? (prev - 1 + mediaItems.length) % mediaItems.length
        : (prev + 1) % mediaItems.length
    );
  };

  const handleCategorySelect = (main, sub) => {
    const query = sub
      ? `?cat=${encodeURIComponent(main)}&sub=${encodeURIComponent(sub)}`
      : `?cat=${encodeURIComponent(main)}`;
    navigate(`/shop${query}`);
  };

  return (
    <>
      <Header
        onToggleSidebar={toggleSidebar}
        cartCount={0}
        onCartClick={() => {}}
        onSelectCategory={handleCategorySelect}
      />

      <div className={`${styles.containerWrap}`}>
        <Sidebar
          isVisible={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onSelectCategory={handleCategorySelect}
        />

        <main className={`${styles.main} ${!sidebarOpen ? styles.fullWidthMain : ""}`}>
          <div className={styles.header}>
            <Link to="/shop" className={styles.back}>
              ← กลับหน้าสินค้า
            </Link>
          </div>

          <div className={styles.grid}>
            {/* Image/Model Display */}
            <div className={styles.imageBox}>
              <button
                className={`${styles.arrowButton} ${styles.arrowLeft}`}
                onClick={() => handleArrow("left")}
              >
                &#10094;
              </button>

              {mediaItems[activeIndex]?.type === "model3d" ? (
                <GLBViewer url={mediaItems[activeIndex].url} />
              ) : mediaItems[activeIndex] ? (
                <img
                  src={mediaItems[activeIndex].url}
                  alt="Product"
                  className={styles.mainImage}
                />
              ) : (
                <div style={{ height: 300 }}>Loading image...</div>
              )}

              <button
                className={`${styles.arrowButton} ${styles.arrowRight}`}
                onClick={() => handleArrow("right")}
              >
                &#10095;
              </button>

              <div className={styles.thumbnailList}>
                {mediaItems.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`${styles.thumbnailWrapper} ${
                      idx === activeIndex ? styles.activeThumbnail : ""
                    }`}
                  >
                    {item.type === "model3d" ? (
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#f3f3f3",
                          borderRadius: 4,
                          fontSize: 12,
                          fontWeight: "bold",
                          color: "#444",
                        }}
                      >
                        3D
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={`Thumbnail ${idx}`}
                        className={styles.thumbnail}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Info Section */}
            <div className={styles.info}>
              <h2 className={styles.productName}>{product.productName}</h2>
              <div className={styles.category}>
                {product.category} / {product.subcategory}
              </div>
              <div className={styles.price}>
                ฿{product.price?.toLocaleString()}
              </div>

              <div className={styles.section}>รายละเอียด</div>
              <p>{product.description}</p>

              <div className={styles.section}>สเปคสินค้า</div>
              <ul>
                {(Array.isArray(product.specification)
                  ? product.specification
                  : []
                ).map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>

              <div className={styles.actionButtons}>
                {product.datasheet && (
                  <a
                    className={styles.downloadBtn}
                    href={`http://172.16.2.61:5150/uploads/${product.datasheet}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📄 Download Datasheet
                  </a>
                )}
                <button className={styles.addToCartBtn}>
                  เพิ่มในรายการเสนอราคา
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}