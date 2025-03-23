// Simulação de uma API com dados fictícios
// Isso pode ser facilmente substituído por chamadas reais à API no futuro

// Dados do cardápio
const menuItems = [
  {
    id: "1",
    name: "X-Burger",
    description:
      "Hambúrguer artesanal com queijo cheddar, alface, tomate e molho especial.",
    price: 18.9,
    imageUrl: "https://via.placeholder.com/100?text=X-Burger",
    category: "burger",
  },
  {
    id: "2",
    name: "X-Bacon",
    description:
      "Hambúrguer artesanal com queijo cheddar, bacon crocante, alface, tomate e molho especial.",
    price: 22.9,
    imageUrl: "https://via.placeholder.com/100?text=X-Bacon",
    category: "burger",
  },
  {
    id: "3",
    name: "X-Salada",
    description:
      "Hambúrguer artesanal com queijo, alface, tomate, cebola, picles e molho.",
    price: 19.9,
    imageUrl: "https://via.placeholder.com/100?text=X-Salada",
    category: "burger",
  },
  {
    id: "4",
    name: "Refrigerante Lata",
    description:
      "Lata 350ml. Opções: Coca-Cola, Guaraná, Sprite, Fanta Laranja.",
    price: 5.5,
    imageUrl: "https://via.placeholder.com/100?text=Refrigerante",
    category: "drink",
  },
  {
    id: "5",
    name: "Suco Natural",
    description:
      "Suco natural de frutas da estação. Opções: Laranja, Abacaxi, Morango e Melancia.",
    price: 8.9,
    imageUrl: "https://via.placeholder.com/100?text=Suco",
    category: "drink",
  },
  {
    id: "6",
    name: "Batata Frita",
    description: "Porção de batatas fritas crocantes com sal.",
    price: 12.5,
    imageUrl: "https://via.placeholder.com/100?text=Batata",
    category: "side",
  },
  {
    id: "7",
    name: "Onion Rings",
    description: "Anéis de cebola empanados e fritos.",
    price: 14.9,
    imageUrl: "https://via.placeholder.com/100?text=Onion",
    category: "side",
  },
  {
    id: "8",
    name: "Sorvete",
    description: "Sorvete de creme com calda de chocolate.",
    price: 9.9,
    imageUrl: "https://via.placeholder.com/100?text=Sorvete",
    category: "dessert",
  },
  {
    id: "9",
    name: "Combo X-Burger",
    description: "X-Burger + Batata Frita + Refrigerante",
    price: 32.9,
    imageUrl: "https://via.placeholder.com/100?text=Combo",
    category: "combo",
  },
  {
    id: "10",
    name: "Combo X-Bacon",
    description: "X-Bacon + Batata Frita + Refrigerante",
    price: 36.9,
    imageUrl: "https://via.placeholder.com/100?text=Combo+Bacon",
    category: "combo",
  },
];

// Categorias
const categories = [
  { id: "all", name: "Todos" },
  { id: "burger", name: "Lanches" },
  { id: "combo", name: "Combos" },
  { id: "drink", name: "Bebidas" },
  { id: "side", name: "Acompanhamentos" },
  { id: "dessert", name: "Sobremesas" },
];

// Banners promocionais
const banners = [
  {
    id: 1,
    image: "https://via.placeholder.com/350x150?text=Promo+1",
    title: "50% OFF nos combos",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/350x150?text=Promo+2",
    title: "Novos sabores de shake",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/350x150?text=Promo+3",
    title: "Frete grátis na primeira compra",
  },
];

// Categorias da tela inicial
const homeCategories = [
  { id: 1, name: "Lanches", icon: "fast-food", category: "burger" },
  { id: 2, name: "Bebidas", icon: "beer", category: "drink" },
  { id: 3, name: "Sobremesas", icon: "ice-cream", category: "dessert" },
  { id: 4, name: "Combos", icon: "restaurant", category: "combo" },
];

// Simulação de API com delay para parecer mais realista
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// API Mock
export const api = {
  // Buscar todo o cardápio
  getMenu: async () => {
    await delay(800);
    return [...menuItems];
  },

  // Buscar items por categoria
  getMenuByCategory: async (categoryId) => {
    await delay(600);
    if (categoryId === "all") {
      return [...menuItems];
    }
    return menuItems.filter((item) => item.category === categoryId);
  },

  // Buscar categorias
  getCategories: async () => {
    await delay(400);
    return [...categories];
  },

  // Buscar banners
  getBanners: async () => {
    await delay(500);
    return [...banners];
  },

  // Buscar categorias da home
  getHomeCategories: async () => {
    await delay(300);
    return [...homeCategories];
  },

  // Buscar um item específico por ID
  getItemById: async (id) => {
    await delay(300);
    return menuItems.find((item) => item.id === id);
  },

  // Simular envio de pedido (para ser substituído por uma chamada real à API)
  placeOrder: async (orderData) => {
    await delay(1500);
    return {
      success: true,
      orderId: "ORD-" + Math.floor(Math.random() * 10000),
      estimatedTime: "30-45 minutos",
      ...orderData,
    };
  },

  // Simular cadastro de usuário
  registerUser: async (userData) => {
    await delay(1000);
    return {
      success: true,
      userId: "USR-" + Math.floor(Math.random() * 10000),
      ...userData,
    };
  },
};

// Exportar os dados diretamente para acesso rápido quando necessário
export const menuData = menuItems;
export const categoriesData = categories;
export const bannersData = banners;
export const homeCategoriesData = homeCategories;
