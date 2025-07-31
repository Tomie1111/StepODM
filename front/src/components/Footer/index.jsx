import React from 'react';
import styles from './styles.module.css';

// Font Awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faLine,
  faLinkedinIn,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer id="footer" className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={`${styles.footerSection} ${styles.services}`}>
          <h3 className={styles.footerTitle}>บริการของเรา</h3>
          <ul>
            <li>Kiosk</li>
            <li>Display / AV</li>
            <li>Industrial PC</li>
            <li>AI Platform</li>
            <li>Solutions</li>
          </ul>
        </div>

        <div className={`${styles.footerSection} ${styles.company}`}>
          <h3 className={styles.footerTitle}>เกี่ยวกับบริษัท</h3>
          <ul>
            <li><a href="https://step-solutions.com/" target="_blank" rel="noopener noreferrer">เกี่ยวกับเรา</a></li>
            <li><a href="https://step-solutions.com/our-factory/" target="_blank" rel="noopener noreferrer">โรงงานของเรา</a></li>
            <li><a href="https://step-solutions.com/blog/" target="_blank" rel="noopener noreferrer">ข่าวสารและกิจกรรม</a></li>
            <li><a href="https://step-solutions.com/career/" target="_blank" rel="noopener noreferrer">สมัครงาน</a></li>
            <li><a href="https://step-solutions.com/contact-us/" target="_blank" rel="noopener noreferrer">ติดต่อเรา</a></li>
          </ul>
        </div>

        <div className={`${styles.footerSection} ${styles.about}`}>
          <div className={styles.aboutLeft}>
            <h2 className={styles.footerTitle}>STEP SOLUTIONS</h2>
            <p>
              บริษัท สเตป โซลูชั่นส์ จำกัด พร้อมที่จะนำเทคโนโลยีเพื่อเปลี่ยนรูปแบบการนำเสนอสินค้าและบริการของคุณ ให้ทันสมัยและสามารถตอบโจทย์ด้วยระบบอัตโนมัติ
            </p>
          </div>
          <div className={styles.aboutRight}>
            <p className={styles.footerLabel}><strong>เยี่ยมชมเราได้ที่:</strong></p>
            <p>75 Nimitmai Road, Samwa Tawan Ok, Klong Samwa, Bangkok 10510</p>
            <p className={styles.footerLabel}><strong>เวลาทำการ:</strong> จันทร์ – ศุกร์ 8.30 น. – 17.30 น.</p>
            <p className={styles.footerLabel}><strong>Email:</strong><a href="mailto:sales@step-solutions.com"> sales@step-solutions.com</a></p>
            <div className={styles.footerSocial}>
              <a href="https://www.facebook.com/step.solutions.company" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="https://www.instagram.com/step.solutions/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="https://line.me/R/ti/p/@esv1182i" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLine} /></a>
              <a href="https://www.linkedin.com/company/step-solutions-th" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              <a href="http://www.youtube.com/@stepsolutions5859" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} /></a>
              <a href="https://maps.app.goo.gl/PGqDMQdDQssk9Toq9" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLocationDot} /></a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerHashtags}>
        <p>#DigitalSignage #คีออส #KioskDesign #DisplayAV #Videowall #Horion #IndustrialPC #Interactiveอุปกรณ์อัจฉริยะ #LEDOutdoor #VideoAnalytic #AIPlatform #ระบบคิว #DriveThru #FaceRecognition</p>
      </div>

      <div className={styles.footerBottom}>
        <p>© 2025 Step Solutions Co., Ltd. All Rights Reserved.</p>
        <button className={styles.lineContactBtn}>
          <a href="https://line.me/R/ti/p/@esv1182i" target="_blank" rel="noopener noreferrer">สอบถาม - สั่งซื้อ ผ่าน @LINE สะดวกกว่า</a>
        </button>
      </div>
    </footer>
  );
}