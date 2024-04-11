import styles from '../styles/Footer.module.css'
import Link from 'next/link'

const Footer = () => {
    return ( 
        <>
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerNotice}>
                    <div className={styles.footerLogo}>
                        <h2>News Aggregator</h2>
                    </div>
                    <div className={styles.footerText}>
                        <small>&copy; 2023 News Aggregator. All rights reserved. All trademarks are property of their respective owners in the US and other countries.
                            
                        </small>
                    </div>
                </div>
                <hr className={styles.separator}></hr>
                <div className={styles.footerLinks}>
                    <Link href="/privacy">
                        <small>Privacy Policy</small>
                    </Link>
                    <small>|</small>
                    <Link href="/terms">
                        <small>Terms of Service</small>
                    </Link>
                    <small>|</small>
                    <Link href="/cookies">
                        <small>Cookies</small>
                    </Link>
                    <small>|</small>
                    <Link href="/about">
                        <small>About</small>
                    </Link>
                </div>
            </div>
        </footer>
        </>
     );
}
 
export default Footer;