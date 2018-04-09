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
  '/to_autors': {
    title: 'Авторам',
    subroutes: {
      '/to_autors': 'Рукописи',
      '/instruments': 'Инструменты',
      '/articles': 'Статьи',
      '/peer_review': 'Рецензирование',
      '/publication': 'Публикация',
    },
  },
  '/magazine': { title: 'Вестник' },
};

export default routes;
