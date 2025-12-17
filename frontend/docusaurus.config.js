import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "RoboNerve AI Textbook",
  tagline: "Bridging the Digital and Physical",
  favicon: "img/favicon.ico",

  url: "https://physical-ai-textbook-by-ubaid.vercel.app",
  baseUrl: "/",

  organizationName: "Panaversity",
  projectName: "physical-ai-textbook",

  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl:
            "https://github.com/Panaversity/physical-ai-textbook/tree/main/frontend/",
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.com/Panaversity/physical-ai-textbook/tree/main/frontend/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig: ({
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "RoboNerve AI",
      logo: {
        alt: "Panaversity Logo",
        src: "img/logo.png",
        height: 43,
        width: 40,
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Textbook",
        },
        {
          href: "https://github.com/Ubaid2116",
          label: "GitHub",
          position: "right",
        },
        {
          type: "custom-AuthLink",
          position: "right",
          label: "Account",
          authType: "login",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Build with ❤️ by UBAID © ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  }),
};

export default config;
