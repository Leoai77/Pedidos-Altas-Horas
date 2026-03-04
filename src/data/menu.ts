export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
};

export const menuData: MenuItem[] = [
  // ENTRADAS
  { id: 'e1', name: 'Jiló Empanado', price: 24.90, category: 'Entradas', image: 'https://i.ytimg.com/vi/Xq3D9Jad71A/maxresdefault.jpg' },
  { id: 'e2', name: 'Torresmo de Barriga', price: 49.90, category: 'Entradas', image: 'https://picsum.photos/seed/porkbelly/400/400' },
  { id: 'e3', name: 'Pastéis Gourmet 8un', description: '2x Carne, 2x queijo, 2x pizza, 2x alho poró c/ catupiry', price: 39.90, category: 'Entradas', image: 'https://picsum.photos/seed/pastel/400/400' },
  { id: 'e4', name: 'Maçã de Peito', description: 'Prato do botecar 2024', price: 39.90, category: 'Entradas', image: 'https://picsum.photos/seed/brisket/400/400' },
  { id: 'e5', name: 'Dadinho de Tapioca', description: 'Com geleia de pimenta', price: 39.90, category: 'Entradas', image: 'https://picsum.photos/seed/tapioca/400/400' },
  { id: 'e6', name: 'Bolinho de Cupim do Altas', price: 39.90, category: 'Entradas', image: 'https://picsum.photos/seed/meatball/400/400' },
  
  // ESPETOS GOURMET
  { id: 'es1', name: 'Boi', price: 14.90, category: 'Espetos Gourmet', image: 'https://picsum.photos/seed/beefskewer/400/400' },
  { id: 'es2', name: 'Boi e Bacon', price: 14.90, category: 'Espetos Gourmet', image: 'https://picsum.photos/seed/baconbeef/400/400' },
  { id: 'es3', name: 'Frango Empanado c/ Catupiry', price: 14.90, category: 'Espetos Gourmet', image: 'https://picsum.photos/seed/friedchicken/400/400' },
  { id: 'es4', name: 'Medalhão de Frango', price: 14.90, category: 'Espetos Gourmet', image: 'https://picsum.photos/seed/chickenbacon/400/400' },
  { id: 'es5', name: 'Medalhão de Muçarela', price: 14.90, category: 'Espetos Gourmet', image: 'https://picsum.photos/seed/cheesebacon/400/400' },
  { id: 'es6', name: 'Almôndegas Recheadas', price: 14.90, category: 'Espetos Gourmet', image: 'https://picsum.photos/seed/stuffedmeatball/400/400' },
  { id: 'es7', name: 'Kafta Recheada', price: 14.90, category: 'Espetos Gourmet', image: 'https://picsum.photos/seed/kafta/400/400' },
  { id: 'es8', name: 'Coraçãozinho', price: 14.90, category: 'Espetos Gourmet', image: 'https://picsum.photos/seed/chickenheart/400/400' },
  { id: 'es9', name: 'Muçarela', price: 14.90, category: 'Espetos Gourmet', image: 'https://picsum.photos/seed/cheeseskewer/400/400' },
  { id: 'es10', name: 'Misto', description: 'boi, lombo, linguiça e bacon', price: 14.90, category: 'Espetos Gourmet', image: 'https://picsum.photos/seed/mixedskewer/400/400' },
  { id: 'es11', name: 'Pão de Alho Poró', price: 14.90, category: 'Espetos Gourmet', image: 'https://picsum.photos/seed/garlicbread/400/400' },
  { id: 'es12', name: 'Pão de Frango c/ Catupiry', price: 14.90, category: 'Espetos Gourmet', image: 'https://picsum.photos/seed/chickenbread/400/400' },
  { id: 'es13', name: 'Pão de Tomate Seco c/ Provolone', price: 14.90, category: 'Espetos Gourmet', image: 'https://picsum.photos/seed/tomatobread/400/400' },
  { id: 'es14', name: 'Pão de 4 Queijos c/ Mel', price: 14.90, category: 'Espetos Gourmet', image: 'https://picsum.photos/seed/cheesebread/400/400' },

  // PORÇÕES
  { id: 'p1', name: 'Fritas Secretas', description: 'Fritas c/ tempero secreto e maionese do Altas', price: 44.90, category: 'Porções', image: 'https://picsum.photos/seed/fries/400/400' },
  { id: 'p2', name: 'Fritas Secretas c/ Cheddar e Bacon', description: 'Fritas c/ tempero secreto, cheddar, bacon e maionese do Altas', price: 49.90, category: 'Porções', image: 'https://picsum.photos/seed/cheddarfries/400/400' },
  { id: 'p3', name: 'Tulipinhas c/ Maionese e Pimenta Biquinho', description: '10 unidades', price: 42.90, category: 'Porções', image: 'https://picsum.photos/seed/chickenwings/400/400' },
  { id: 'p4', name: 'Empanaditos', description: 'Iscas de peito de frango empanado na panko e explosão de catupiry', price: 57.90, category: 'Porções', image: 'https://picsum.photos/seed/chickenstrips/400/400' },
  { id: 'p5', name: 'Iscas de Tilápia c/ Fritas', description: 'Iscas de tilápia empanadas na panko c/ fritas, muçarela e molho da casa', price: 79.90, category: 'Porções', image: 'https://picsum.photos/seed/fishandchips/400/400' },
  { id: 'p6', name: 'Filé Mignon c/ Fritas', description: 'Delicioso contra filé acompanhado de fritas e muçarela', price: 99.90, category: 'Porções', image: 'https://picsum.photos/seed/steakfries/400/400' },

  // CHAPAS
  { id: 'c1', name: 'Picanha c/ Fritas e Mandioca na Manteiga (400g)', description: 'Picanha AA [400g] acompanhada das nossas fritas secretas [200g] e mandioca cozida na manteiga de garrafa [200g]', price: 149.90, category: 'Chapas', image: 'https://picsum.photos/seed/picanha/400/400' },
  { id: 'c2', name: 'Picanha c/ Fritas e Mandioca na Manteiga (600g)', description: 'Picanha AA [600g] acompanhada das nossas fritas secretas [200g] e mandioca cozida na manteiga de garrafa [200g], pode pedir que é sucesso!', price: 199.90, category: 'Chapas', image: 'https://picsum.photos/seed/picanhalarge/400/400' },
  { id: 'c3', name: 'Chapa Altas', description: 'Filé mignon, fritas, mandioquinha, linguiça, pimenta biquinho, queijo, bacon, iscas de frango, torresmo, azeitona', price: 199.90, category: 'Chapas', image: 'https://picsum.photos/seed/mixedgrill/400/400' },
];
