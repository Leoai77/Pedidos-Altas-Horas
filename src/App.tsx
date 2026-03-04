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
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans pb-24 selection:bg-gold-500 selection:text-black">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-md text-white sticky top-0 z-40 border-b border-gold-900/50 shadow-lg shadow-black/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-script text-gold-500 tracking-wide">
              Altas Horas
            </h1>
            <p className="text-stone-400 text-[10px] font-medium tracking-[0.2em] uppercase mt-1 ml-1">
              App de Pedidos
            </p>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gold-500 hover:text-gold-400 transition-colors"
          >
            <ShoppingCart size={28} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/20">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Category Navigation */}
        <div className="max-w-4xl mx-auto px-4 py-3 overflow-x-auto hide-scrollbar flex gap-3 border-t border-white/5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                document
                  .getElementById(`category-${category}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === category
                  ? "bg-gold-500 text-black border-gold-500 shadow-lg shadow-gold-500/20"
                  : "bg-stone-900/50 text-stone-400 border-stone-800 hover:border-gold-500/50 hover:text-gold-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Info Banner */}
        <div className="bg-stone-900/50 rounded-2xl p-5 shadow-xl mb-10 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center border border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-4 text-stone-400">
            <div className="p-3 bg-black rounded-full border border-gold-900/30 text-gold-500">
              <Clock size={20} />
            </div>
            <div className="text-sm">
              <p className="font-bold text-stone-200 uppercase tracking-wide text-xs mb-0.5">Aberto agora</p>
              <p className="text-gold-400/80 font-mono">18:00 às 02:00</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <div className="p-3 bg-black rounded-full border border-gold-900/30 text-gold-500">
              <MapPin size={20} />
            </div>
            <div className="text-sm">
              <p className="font-bold text-stone-200 uppercase tracking-wide text-xs mb-0.5">Localização</p>
              <p className="text-gold-400/80">Av. Fleming, 123 - Ouro Preto</p>
            </div>
          </div>
        </div>

        {/* Menu Sections */}
        <div className="space-y-12">
          {categories.map((category) => (
            <section
              key={category}
              id={`category-${category}`}
              className="scroll-mt-40"
            >
              <h2 className="text-3xl font-script text-gold-500 mb-6 flex items-center gap-4">
                {category}
                <div className="h-px bg-gradient-to-r from-gold-900/50 to-transparent flex-1"></div>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {menuData
                  .filter((item) => item.category === category)
                  .map((item) => {
                    const cartItem = cart.find((i) => i.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className="group bg-stone-900 rounded-2xl p-4 shadow-lg border border-white/5 flex flex-col justify-between hover:border-gold-500/30 transition-all duration-300 hover:shadow-gold-900/10 hover:-translate-y-1"
                      >
                        <div className="flex gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="font-bold text-stone-100 leading-tight mb-2 text-lg">
                              {item.name}
                            </h3>
                            {item.description && (
                              <p className="text-sm text-stone-400 mb-3 leading-relaxed line-clamp-2 font-light">
                                {item.description}
                              </p>
                            )}
                            <span className="font-mono font-bold text-gold-400 text-lg">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                          {item.image && (
                            <div className="w-28 h-28 flex-shrink-0 relative overflow-hidden rounded-xl bg-stone-800 border border-white/5">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/5 flex justify-end items-center">
                          {cartItem ? (
                            <div className="flex items-center gap-3 bg-black rounded-full p-1 border border-gold-900/30">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="font-mono font-bold w-6 text-center text-gold-500">
                                {cartItem.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-black hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item)}
                              className="flex items-center gap-2 bg-stone-800/50 text-gold-400 px-5 py-2.5 rounded-full font-medium text-sm hover:bg-gold-500 hover:text-black transition-all duration-300 border border-gold-900/30 hover:border-gold-500 hover:shadow-lg hover:shadow-gold-500/10"
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
        <div className="fixed bottom-6 left-0 right-0 px-4 z-30 md:hidden animate-in slide-in-from-bottom duration-500">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-gold-500 text-black rounded-2xl p-4 shadow-2xl shadow-gold-500/20 flex items-center justify-between font-bold border border-gold-400"
          >
            <div className="flex items-center gap-3">
              <div className="bg-black text-gold-500 w-8 h-8 rounded-full flex items-center justify-center text-sm font-mono border border-gold-600">
                {cartItemCount}
              </div>
              <span className="uppercase tracking-wide text-sm">Ver pedido</span>
            </div>
            <span className="font-mono text-lg">{formatPrice(cartTotal)}</span>
          </button>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="relative w-full max-w-md bg-stone-950 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-white/10">
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-stone-950">
              <h2 className="text-2xl font-script text-gold-500 flex items-center gap-3">
                <ShoppingCart className="text-gold-500" size={24} />
                Seu Pedido
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-stone-500 hover:text-white bg-stone-900 rounded-full transition-colors border border-white/5"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-stone-500 space-y-6">
                  <div className="w-20 h-20 rounded-full bg-stone-900 flex items-center justify-center border border-white/5">
                    <ShoppingCart size={40} className="opacity-30" />
                  </div>
                  <p className="font-medium text-lg">Seu carrinho está vazio</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-gold-500 font-semibold hover:text-gold-400 transition-colors uppercase tracking-wide text-sm border-b border-gold-500/30 pb-0.5 hover:border-gold-500"
                  >
                    Voltar ao cardápio
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-4 border-b border-white/5 last:border-0 group"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl flex-shrink-0 border border-white/5 bg-stone-900"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-semibold text-stone-200 leading-tight pr-4">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-600 hover:text-red-500 transition-colors p-1 -mr-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="flex items-center gap-3 bg-black rounded-full p-1 border border-white/10">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-7 h-7 rounded-full bg-stone-900 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-mono font-bold w-5 text-center text-sm text-gold-500">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-7 h-7 rounded-full bg-gold-500 flex items-center justify-center text-black hover:bg-gold-400 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-mono font-bold text-gold-400">
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
              <div className="p-6 bg-stone-900 border-t border-white/10">
                <div className="mb-6">
                  <label
                    htmlFor="table-number"
                    className="block text-xs font-bold text-gold-500 mb-2 uppercase tracking-widest"
                  >
                    Número da Mesa
                  </label>
                  <input
                    type="number"
                    id="table-number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Ex: 5"
                    className="w-full px-4 py-3.5 rounded-xl border border-white/10 bg-black text-white placeholder-stone-600 focus:ring-1 focus:ring-gold-500 focus:border-gold-500 outline-none transition-all font-mono text-lg"
                  />
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-medium text-stone-400 uppercase tracking-wide text-sm">Total</span>
                  <span className="font-script text-4xl text-gold-500">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gold-500 hover:bg-gold-400 text-black py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20 active:scale-[0.98]"
                >
                  Confirmar Pedido
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
