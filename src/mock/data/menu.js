export default [
  {
    text: 'Main',
    header: true
  },
  {
    text: 'Dashboard',
    icon: 'icon-home2'
  },
  {
    text: 'Starter kit',
    isOpen: false,
    children: [
      {
        text: 'Horizontal navigation'
      },
      {
        text: 'No sidebar',
        onClick(item) {
          console.warn(`${item.text} clicked`)
        }
      },
      {
        text: '1 sidebar'
      },
      {
        text: '2 sidebars'
      }
    ]
  }
]
