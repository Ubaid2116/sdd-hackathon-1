import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Module 1: Robotic Nervous System with ROS 2',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Master the fundamentals of ROS 2, the communication backbone of modern robotics.
        Build distributed systems that enable seamless coordination. Learn to program.
      </>
    ),
  },
  {
    title: 'Module 2: Digital Twin & Simulation',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Create realistic virtual environments using Gazebo & RViz. Test and validate
        your robotic systems in safe, virtual environments before deploying to real hardware.
      </>
    ),
  },
  {
    title: 'Module 3: AI Robot Brain Development',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Develop perception systems using NVIDIA Isaac ROS. Build AI-powered robots that
        see, understand, and navigate complex environments with precision.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
