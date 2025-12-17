import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import FloatingChatbot from '@site/src/components/FloatingChatbot';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const particleCount = 40;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.color = `rgba(255, 255, 255, ${this.opacity})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const connectParticles = () => {
      const maxDistance = 150;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <canvas ref={canvasRef} className={styles.particleCanvas} />
      
      {/* Floating Grid Elements */}
      <div className={styles.gridFloaters}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={clsx(styles.gridFloat, styles[`gridFloat${i + 1}`])}></div>
        ))}
      </div>

      {/* 3D Grid Pattern */}
      <div className={styles.grid3D}></div>

      {/* Subtle Glow Overlay */}
      <div className={styles.glowOverlay}></div>

      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroTextContainer}>
            <Heading as="h1" className={clsx('hero__title', styles.hero__title)}>
              {siteConfig.title}
            </Heading>
            
            <p className={clsx('hero__subtitle', styles.hero__subtitle)}>
              {siteConfig.tagline}
            </p>
            
            <p className={styles.heroDescription}>
              Master the future of robotics with comprehensive learning paths, 
              hands-on projects, and cutting-edge AI integration.
            </p>
          </div>
          
          <div className={styles.buttonGroup}>
            <Link
              className={clsx(styles.buttonPrimary, "button button--lg")}
              to="/docs/module-1-robotic-nervous-system/ros2-fundamentals">
              <span className={styles.buttonIcon}>▶</span>
              Start Learning Journey
            </Link>
            
            <Link
              className={clsx(styles.buttonSecondary, "button button--lg")}
              to="/docs/intro">
              <span className={styles.buttonIcon}>📚</span>
              Explore Curriculum
            </Link>
          </div>
          
          {/* Features Quick Preview */}
          <div className={styles.featuresPreview}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🧠</div>
              <h3>Digital Brain</h3>
              <p>Advanced AI & ML integration</p>
            </div>
            <div className={styles.featureDivider}></div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>⚡</div>
              <h3>Physical Body</h3>
              <p>Hardware & sensor integration</p>
            </div>
            <div className={styles.featureDivider}></div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🔗</div>
              <h3>Seamless Bridge</h3>
              <p>ROS2 & real-time systems</p>
            </div>
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