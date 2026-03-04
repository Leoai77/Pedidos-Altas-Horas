import React, { useState, useMemo } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Clock,
  MapPin,
  Phone,
  ChevronRight,
  X,
} from "lucide-react";
import { menuData, MenuItem } from "./data/menu";

type CartItem = MenuItem & { quantity: number };

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("Entradas");
  const [tableNumber, setTableNumber] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(menuData.map((item) => item.category))),
    [],
  );

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQuantity = Math.max(0, i.quantity + delta);
            return { ...i, quantity: newQuantity };
          }
          return i;
        })
        .filter((i) => i.quantity > 0),
    );
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (!tableNumber) {
      alert("Por favor, informe o número da mesa.");
      return;
    }

    let message = `*PEDIDO - MESA ${tableNumber}*\n\n`;
    cart.forEach((item) => {
      message += `${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}\n`;
    });
    message += `\n*Total: ${formatPrice(cartTotal)}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send/?phone=%2B5511949887769&text=${encodedMessage}&type=phone_number&app_absent=0&wame_ctl=1`, "_blank");
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans pb-24">
      {/* Header */}
      <header className="bg-red-700 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">
              Altas Horas
            </h1>
            <p className="text-red-200 text-xs font-medium tracking-widest uppercase">
              Fleming
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 bg-red-800 rounded-full hover:bg-red-900 transition-colors"
          >
            <ShoppingCart size={24} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Category Navigation */}
        <div className="max-w-4xl mx-auto px-4 py-3 overflow-x-auto hide-scrollbar flex gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                document
                  .getElementById(`category-${category}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === category
                  ? "bg-white text-red-700"
                  : "bg-red-800 text-red-100 hover:bg-red-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Info Banner */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border border-stone-100">
          <div className="flex items-center gap-3 text-stone-600">
            <Clock className="text-red-600" size={20} />
            <div className="text-sm">
              <p className="font-semibold text-stone-800">Aberto agora</p>
              <p>18:00 às 02:00</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-stone-600">
            <MapPin className="text-red-600" size={20} />
            <div className="text-sm">
              <p className="font-semibold text-stone-800">Av. Fleming, 123</p>
              <p>Ouro Preto, BH</p>
            </div>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="space-y-10">
          {categories.map((category) => (
            <section
              key={category}
              id={`category-${category}`}
              className="scroll-mt-32"
            >
              <h2 className="text-2xl font-black uppercase italic tracking-tight mb-6 flex items-center gap-4">
                {category}
                <div className="h-px bg-stone-300 flex-1"></div>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {menuData
                  .filter((item) => item.category === category)
                  .map((item) => {
                    const cartItem = cart.find((i) => i.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex flex-col justify-between hover:shadow-md transition-shadow"
                      >
                        <div className="flex gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-stone-800 leading-tight mb-1">
                              {item.name}
                            </h3>
                            {item.description && (
                              <p className="text-sm text-stone-500 mb-2 leading-relaxed line-clamp-2">
                                {item.description}
                              </p>
                            )}
                            <span className="font-bold text-red-700">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                          {item.image && (
                            <div className="w-24 h-24 flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover rounded-xl shadow-sm"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}
                        </div>

                        <div className="mt-auto pt-3 border-t border-stone-50 flex justify-end items-center">
                          {cartItem ? (
                            <div className="flex items-center gap-3 bg-stone-100 rounded-full p-1">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-red-600 hover:bg-stone-50"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="font-semibold w-4 text-center">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 rounded-full bg-red-600 shadow-sm flex items-center justify-center text-white hover:bg-red-700"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item)}
                              className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full font-semibold text-sm hover:bg-red-100 transition-colors"
                            >
                              <Plus size={16} />
                              Adicionar
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Floating Cart Button (Mobile) */}
      {cartItemCount > 0 && !isCartOpen && (
        <div className="fixed bottom-6 left-0 right-0 px-4 z-30 md:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-red-600 text-white rounded-2xl p-4 shadow-xl flex items-center justify-between font-bold"
          >
            <div className="flex items-center gap-3">
              <div className="bg-red-800 w-8 h-8 rounded-full flex items-center justify-center text-sm">
                {cartItemCount}
              </div>
              <span>Ver pedido</span>
            </div>
            <span>{formatPrice(cartTotal)}</span>
          </button>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingCart className="text-red-600" />
                Seu Pedido
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-stone-400 hover:text-stone-600 bg-stone-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
                  <ShoppingCart size={48} className="opacity-20" />
                  <p className="font-medium">Seu carrinho está vazio</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Ver cardápio
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-4 border-b border-stone-100 last:border-0"
                    >
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h4 className="font-semibold text-stone-800">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-400 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center gap-3 bg-stone-100 rounded-full p-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-red-600"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-semibold w-4 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 rounded-full bg-red-600 shadow-sm flex items-center justify-center text-white"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-bold text-stone-800">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-4 bg-stone-50 border-t border-stone-200">
                <div className="mb-4">
                  <label htmlFor="table-number" className="block text-sm font-bold text-stone-700 mb-1">
                    Número da Mesa
                  </label>
                  <input
                    type="number"
                    id="table-number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Ex: 5"
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all bg-white font-medium"
                  />
                </div>
                <div className="flex justify-between items-center mb-4 text-lg">
                  <span className="font-semibold text-stone-600">Total</span>
                  <span className="font-black text-2xl text-red-700">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-600/20"
                >
                  Fazer Pedido no WhatsApp
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
