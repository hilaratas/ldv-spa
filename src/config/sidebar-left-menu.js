export default [
  {
    item: { link: '/main', text: "Главная"}
  },
  {
    item: { link: '/news', text: "Новости**"}
  },
  {
    item: { link: '/specials_and_actions', text: "Акции/спецпредложения**"},
  },
  {
    item: { link: '/catalog', text: "Каталог"},
    children: [
      { item: { link: '/catalog/themed_products', text: "Тематические изделия к празднику"} },
      { item: { link: '/catalog/others', text: "Еще раздел"} }
    ]
  },
  {
    item: { link: '/contacts', text: "Контакты"},
    children: [
      { item: { link: '/contacts/where to watch', text: "Где посмотреть в живую"} },
    ]
  }
]