module.exports = {
  pathPrefix: '',
  siteUrl: 'https://blog.godotdotdot.com',
  siteTitle: '慕阳 GoDotDotDot',
  siteDescription: 'Life is easy, LESS is MORE.',
  author: 'GoDotDotDot',
  postsForArchivePage: 3,
  defaultLanguage: 'en',
  disqusScript:
    process.env.DISQUS_SCRIPT || 'https://godotdotdot.disqus.com/embed.js',
  pages: {
    home: '/',
    blog: 'blog',
    contact: 'contact',
    resume: 'resume',
    tag: 'tags',
  },
  social: {
    github: 'https://github.com/godotdotdot',
    twitter: 'https://twitter.com/GDT_KUI',
    weibo: 'http://weibo.com/godotdotdot',
    rss: '/rss.xml',
  },
  contactFormUrl:
    process.env.CONTACT_FORM_ENDPOINT ||
    'https://getform.io/f/73bdc3b0-1e32-4145-993e-22e1634ab459',
  googleAnalyticTrackingId: process.env.GA_TRACKING_ID || '',
  tags: {
    杂谈: {
      name: '杂谈',
      description: '随心而语，五味杂谈',
      color: '#f0da50',
    },
    javascript: {
      name: 'JavaScript',
      description:
        'JavaScript is an object-oriented programming language used alongside HTML and CSS to give functionality to web pages.',
      color: '#f0da50',
    },
    nodejs: {
      name: 'Node.js',
      description:
        'Node.js is a tool for executing JavaScript in a variety of environments.',
      color: '#90c53f',
    },
    docker: {
      name: 'Docker',
      description:
        'Docker have a complete container solution for you - no matter who you are and where you are on your containerization journey.',
      color: '#eb428e',
      disable: true,
    },
    typescript: {
      name: 'TypeScript',
      description:
        'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
      color: '#257acc',
      disable: true,
    },
    reactjs: {
      name: 'React.js',
      description:
        'React is an open source JavaScript library used for designing user interfaces.',
      color: '#61dbfa',
    },
    kubernetes: {
      name: 'Kubernetes',
      description:
        'Kubernetes (K8s) is an open-source system for automating deployment, scaling, and management of containerized applications.',
      color: '#6f309f',
      disable: true,
    },
    '02-html': {
      name: 'HTML',
      description:
        'A markup language that powers the web. All websites use HTML for structuring the content.',
      color: '#dd3431',
      disable: true,
    },
    '01-css': {
      name: 'CSS',
      description:
        'CSS is used to style the HTML element and to give a very fancy look for the web application.',
      color: '#43ace0',
      disable: true,
    },
    nginx: {
      name: 'Nginx',
      description:
        'A general purpose programming language that is widely used for developing various applications.',
      color: '#f9c646',
    },
    webpack: {
      name: 'Webpack',
      description:
        'webpack is a static module bundler for modern JavaScript applications. ',
      color: '#257acc',
    },
  },
  repos: [
    { name: 'mete' },
    { name: 'koa-session-auth' },
    { name: 'mete-boilerplate' },
    { name: 'wx-gauge' },
    { name: 'with-immutable' },
    { name: 'mete-cli' },
  ],
};
