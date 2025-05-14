const titles = {
  HOME: 'Home',
};

export default [
  {
    component: 'NotFound',
    path: '/404',
    title: titles.HOME,
    menu: '404',
    parent: false,
  },
  {
    component: 'Denied',
    path: '/denied',
    title: titles.HOME,
    menu: 'Denied',
    parent: false,
  },
  {
    component: 'Home',
    path: '/',
    title: titles.HOME,
    menu: 'Denied',
    parent: false,
  },
];