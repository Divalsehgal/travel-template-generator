import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.home__container}>
        <h1 className={styles.home__title}>Trek PDF Generator</h1>
        
        <p className={styles.home__description}>
          Create professional trek pamphlets with templates, upload images, customize itinerary, and export print-ready PDFs.
        </p>

        <div className={styles.home__steps}>
          <div className={styles['home__steps-item']}>
            <div className={styles['home__steps-number']}>1</div>
            <h3 className={styles['home__steps-title']}>Choose Template</h3>
            <p className={styles['home__steps-text']}>Start with a pre-designed template</p>
          </div>

          <div className={styles['home__steps-item']}>
            <div className={styles['home__steps-number']}>2</div>
            <h3 className={styles['home__steps-title']}>Upload Images</h3>
            <p className={styles['home__steps-text']}>Add your trek photos</p>
          </div>

          <div className={styles['home__steps-item']}>
            <div className={styles['home__steps-number']}>3</div>
            <h3 className={styles['home__steps-title']}>Setup Details</h3>
            <p className={styles['home__steps-text']}>Configure itinerary, header, footer, and logo</p>
          </div>

          <div className={styles['home__steps-item']}>
            <div className={styles['home__steps-number']}>4</div>
            <h3 className={styles['home__steps-title']}>Preview & Export</h3>
            <p className={styles['home__steps-text']}>Review and download your PDF</p>
          </div>
        </div>

        <Link to="/projects" className={styles.home__cta}>
          Get Started
        </Link>
      </div>
    </div>
  );
}
