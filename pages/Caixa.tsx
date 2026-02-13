import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { Transaction, PaymentMethod } from '../types';

const Caixa: React.FC = () => {
  const transactions: Transaction[] = [
    { id: '1', storeId: '1', description: 'Venda #1039 - Pneus', type: 'RECEITA', amount: 1450.00, createdAt: '10:30', method: PaymentMethod.CARTAO },
    { id: '2', storeId: '1', description: 'Pagamento Fornecedor - Óleo', type: 'DESPESA', amount: 320.00, createdAt: '11:15', method: PaymentMethod.PIX },
    { id: '3', storeId: '1', description: 'Venda #1040 - Alinhamento', type: 'RECEITA', amount: 80.00, createdAt: '13:45', method: PaymentMethod.DINHEIRO },
    { id: '4', storeId: '1', description: 'Venda #1041 - Revisão', type: 'RECEITA', amount: 2200.00, createdAt: '14:20', method: PaymentMethod.MISTO },
    { id: '5', storeId: '1', description: 'Compra Material Limpeza', type: 'DESPESA', amount: 50.00, createdAt: '15:00', method: PaymentMethod.DINHEIRO },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Fluxo de Caixa</h2>
        <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600">
          <Calendar size={16} className="mr-2 text-slate-400" />
          <span>Hoje, 24 Out 2024</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500 mb-1">Entradas Hoje</p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-green-600">R$ 3.730,00</h3>
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <p className="text-sm font-medium text-slate-500 mb-1">Saídas Hoje</p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-red-600">R$ 370,00</h3>
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <TrendingDown size={20} />
            </div>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 text-white">
          <p className="text-sm font-medium text-slate-400 mb-1">Saldo Atual</p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">R$ 3.360,00</h3>
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-primary-500">
              <DollarSign size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="font-bold text-slate-800">Extrato Diário</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 font-semibold">Horário</th>
                <th className="px-6 py-3 font-semibold">Descrição</th>
                <th className="px-6 py-3 font-semibold">Método</th>
                <th className="px-6 py-3 font-semibold text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {transactions.map(t => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-500">{t.createdAt}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{t.description}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 uppercase">
                      {t.method}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-bold ${t.type === 'RECEITA' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.type === 'RECEITA' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Caixa;
