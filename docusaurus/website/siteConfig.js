/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

const users = [
  {
    caption: "Hackdoor",
    image: "/cezanne/img/users/hackdoor.png",
    infoLink: "https://www.hackdoor.io",
    pinned: true
  }
];

const siteConfig = {
  title: "Cezanne",
  tagline: "Create social and OpenGraph images with Node.js",
  url: "https://cezanne.js.org",
  baseUrl: "/cezanne/",

  projectName: "cezanne",
  organizationName: "Hackdoor-io",

  headerLinks: [
    { doc: "introduction", label: "Introduction" },
    { doc: "configuration", label: "Configuration" },
    { doc: "generatingImages", label: "APIs" }
  ],

  users,

  headerIcon: "/img/cezanne_icon.svg",
  footerIcon: "/img/cezanne_icon.svg",
  favicon: "/img/cezanne_icon.svg",

  colors: {
    primaryColor: "#AA8DE8",
    secondaryColor: "#102E49"
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  copyright: `Copyright © ${new Date().getFullYear()} Hackdoor.io`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "default"
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ["https://buttons.github.io/buttons.js"],

  onPageNav: "separate",
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: "img/undraw_online.svg",
  twitterImage: "img/undraw_tweetstorm.svg",

  enableUpdateBy: true,
  enableUpdateTime: false,

  repoUrl: "https://github.com/Hackdoor-io/cezanne/"
};

module.exports = siteConfig;
