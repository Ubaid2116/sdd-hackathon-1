import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import FloatingChatbot from '@site/src/components/FloatingChatbot';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroTextContainer}>
            <Heading as="h1" className={clsx('hero__title', styles.hero__title)}>
              {siteConfig.title}
            </Heading>
            <p className={clsx('hero__subtitle', styles.hero__subtitle)}>{siteConfig.tagline}</p>
          </div>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/module-1-robotic-nervous-system/ros2-fundamentals">
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Bridging the gap between digital brain and physical body in robotics.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <FloatingChatbot />
    </Layout>
  );
}