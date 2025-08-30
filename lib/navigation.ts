export const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'Articles', href: '/articles' },
  { name: 'Technology', href: '/technology' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

export const socialLinks = [
  { 
    name: 'Facebook', 
    href: 'https://facebook.com/thetechnologian', 
    icon: 'facebook' 
  },
  { 
    name: 'Instagram', 
    href: 'https://instagram.com/thetechnologian', 
    icon: 'instagram' 
  }
]

export const footerSections = [
  {
    title: 'Navigation',
    links: navigationLinks
  },
  {
    title: 'Categories',
    links: [
      { name: 'Latest Tech', href: '/category/latest-tech' },
      { name: 'Reviews', href: '/category/reviews' },
      { name: 'Tutorials', href: '/category/tutorials' },
      { name: 'News', href: '/category/news' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Archives', href: '/archives' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ]
  }
]