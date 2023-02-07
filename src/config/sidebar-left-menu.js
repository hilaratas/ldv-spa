export default [
  {
    item: { link: '#', text: "Главная"}
  },
  {
    item: { link: '#', text: "Акции/спецпредложения"},
    children: [
      { item: { link: '#', text: "Акции"} },
      { item: { link: '#', text: "Спецпредложения"}, }
    ]
  },
  {
    item: { link: '#', text: "Каталог"},
    children: [
      { item: { link: '#', text: "Тематические изделия к празднику"} },
      { item: { link: '#', text: "Еще раздел"} }
    ]
  },
  {
    item: { link: '#', text: "Контакты"},
    children: [{ item: { link: '#', text: "Где посмотреть в живую"} }, { item: { link: '#', text: "Еще раздел"} }]
  }
]