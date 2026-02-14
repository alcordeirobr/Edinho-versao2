import React from 'react';
import { Package, Search, Filter, Download, CheckCircle, AlertOctagon } from 'lucide-react';
import { ProductStatus } from '../types';
import { listProducts, approveProduct } from '../lib/mockApi';

const Estoque: React.FC = () => {
  // Agora vem do mock central (em memória)
  const inventory = listProducts({ storeId: '1' });

  const handleApprove = (id: string) => {
    approveProduct(id);
    // como o mock é em memória, o jeito mais simples aqui (sem hooks ainda)
    // é forçar re-render com um reload leve.
    // depois a gente troca por hooks e state.
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Package className="text-primary-500" />
            Gestão de Estoque
          </h2>
          <p className="text-slate-500 text-sm mt-1">Gerencie produtos, conferência e preços.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
            <Filter size={18} className="mr-2" />
            Filtros
          </button>
          <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 shadow-sm">
            <Download size={18} className="mr-2" />
            Exportar
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-b border-slate-200">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome ou Label ID..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none bg-white"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold border-b border-slate-200">Label ID</th>
              <th className="p-4 font-semibold border-b border-slate-200">Produto</th>
              <th className="p-4 font-semibold border-b border-slate-200">Tamanho/Cond</th>
              <th className="p-4 font-semibold border-b border-slate-200">Preço Sugerido</th>
              <th className="p-4 font-semibold border-b border-slate-200">Estoque</th>
              <th className="p-4 font-semibold border-b border-slate-200">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 text-slate-500 font-mono">{item.labelId}</td>
                <td className="p-4 font-medium text-slate-900">{item.name}</td>
                <td className="p-4 text-slate-500">
                  <div className="flex flex-col">
                    <span>{item.size}</span>
                    <span className="text-xs text-slate-400">{item.condition}</span>
                  </div>
                </td>
                <td className="p-4 text-slate-900 font-medium">R$ {item.suggestedPrice.toFixed(2)}</td>
                <td className="p-4 text-slate-700">{item.stock} un.</td>
                <td className="p-4">
                  {item.status === ProductStatus.EM_CONFERENCIA ? (
                    <button
                      onClick={() => handleApprove(item.id)}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-200 transition-colors"
                      title="Clique para aprovar (fake)"
                    >
                      <AlertOctagon size={12} className="mr-1" />
                      Em Conferência (Aprovar)
                    </button>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                      <CheckCircle size={12} className="mr-1" />
                      Aprovado
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-sm text-slate-500">
        <span>Mostrando {inventory.length} de {inventory.length} itens</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 border border-slate-300 rounded hover:bg-white disabled:opacity-50" disabled>Ant</button>
          <button className="px-3 py-1 border border-slate-300 rounded hover:bg-white">Prox</button>
        </div>
      </div>
    </div>
  );
};

export default Estoque;