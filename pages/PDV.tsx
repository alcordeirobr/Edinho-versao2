import React, { useMemo, useState } from 'react';
import { Product, CartItem, PaymentMethod, ProductStatus } from '../types';
import { Search, ShoppingCart, Trash2, CreditCard, Plus, Minus } from 'lucide-react';
import { listProducts, createTransaction } from '../lib/mockApi';

const PDV: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Produtos do mock central (em memória)
  const products = useMemo(() => listProducts({ storeId: '1' }), []);

  const categories = useMemo(() => {
    const fromProducts = Array.from(new Set(products.map(p => p.category))).sort();
    return ['Todos', ...fromProducts];
  }, [products]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const total = cart.reduce((acc, item) => acc + (item.suggestedPrice * item.quantity), 0);

  const filteredProducts = products
    .filter(p => p.status === ProductStatus.APROVADO) // PDV só mostra itens aprovados
    .filter(p =>
      (selectedCategory === 'Todos' || p.category === selectedCategory) &&
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.labelId.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const finishSale = () => {
    if (cart.length === 0) return;

    // Venda fake: cria transação no mock central e limpa o carrinho
    createTransaction({
      storeId: '1',
      type: 'RECEITA',
      amount: total,
      method: PaymentMethod.MISTO, // por enquanto fixo (depois a gente faz seletor)
      description: `Venda PDV (${cart.reduce((a, b) => a + b.quantity, 0)} itens)`,
      referenceId: `PDV-${Date.now()}`,
    });

    setCart([]);
    alert('Venda registrada (mock) no Caixa!');
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6">
      {/* Product Selection Area */}
      <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nome ou código (Label ID)..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className="flex flex-col text-left bg-white p-4 rounded-xl border border-slate-200 hover:border-primary-400 hover:shadow-md transition-all group"
            >
              <div className="flex justify-between w-full mb-2">
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{product.labelId}</span>
                <span className={`text-xs px-2 py-1 rounded-md border ${
                  product.condition === 'Novo'
                    ? 'border-green-200 text-green-700 bg-green-50'
                    : 'border-amber-200 text-amber-700 bg-amber-50'
                }`}>
                  {product.condition}
                </span>
              </div>

              <h4 className="font-semibold text-slate-800 mb-1 line-clamp-2">{product.name}</h4>
              <p className="text-xs text-slate-500 mb-2">Tam: {product.size}</p>

              <div className="mt-auto pt-2 flex justify-between items-center w-full">
                <span className="text-lg font-bold text-slate-900">R$ {product.suggestedPrice.toFixed(2)}</span>
                <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <Plus size={18} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className="w-full lg:w-96 bg-white rounded-xl shadow-lg border border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-xl flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="text-primary-600" size={24} />
            <h3 className="font-bold text-lg text-slate-800">Cesta</h3>
          </div>
          <span className="bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {cart.reduce((a, b) => a + b.quantity, 0)} items
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 opacity-50">
              <ShoppingCart size={48} />
              <p>Sua cesta está vazia</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex flex-col bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <span className="font-medium text-slate-800 text-sm line-clamp-1">{item.name}</span>
                    <span className="text-xs text-slate-500 block">{item.labelId} - {item.condition}</span>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 ml-2">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center bg-white rounded-md border border-slate-200">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-slate-600 hover:bg-slate-100 rounded-l-md">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-slate-600 hover:bg-slate-100 rounded-r-md">
                      <Plus size={14} />
                    </button>
                  </div>

                  <span className="font-bold text-slate-800">R$ {(item.suggestedPrice * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200 rounded-b-xl">
          <div className="flex justify-between items-center mb-2 text-slate-500">
            <span>Subtotal</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-bold text-slate-900">Total</span>
            <span className="text-xl font-bold text-primary-600">R$ {total.toFixed(2)}</span>
          </div>

          <button
            onClick={finishSale}
            disabled={cart.length === 0}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 shadow-lg shadow-green-600/20 transition-all"
          >
            <CreditCard size={20} />
            <span>Finalizar Venda</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDV;