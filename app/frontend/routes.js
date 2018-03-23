const routes = {
  '/': {
    title: 'О журнале',
    subroutes: {
      '/editorial_board': 'Редколлегия',
      '/distribution_and_subscription': 'Распространение и подписка',
      '/address': 'Адрес редакции',
    },
  },
  '/jubilees': { title: 'Юбиляры' },
  '/news': { title: 'Новости' },
  '/to_autors': { title: 'Авторам' },
  '/magazine': { title: 'Вестник' },
};

export default routes;
