let vars = {
  menus: [
    {
      key: "/admin/about-us",
      name: "Бидний тухай",
      link: "/admin/about-us",
    },
    { key: "/admin/contact", name: "Холбоо барих", link: "/admin/contact" },
    { key: "/admin/news", name: "Мэдээ мэдээлэл", link: "/admin/news" },
    { key: "/admin/category", name: "Төрөл", link: "/admin/category" },
    {
      key: "/admin/sub-category",
      name: "Жижиг төрөл",
      link: "/admin/sub-category",
    },
    { key: "/admin/brand", name: "Брэнд", link: "/admin/brand" },
    { key: "/admin/product", name: "Бараа", link: "/admin/product" },
  ],
};
let getVars = (name) => {
  return vars[name];
};
export { vars, getVars };
