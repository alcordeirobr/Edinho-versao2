import React, { useState } from 'react';
import { ServiceOrder, ServiceOrderStatus } from '../types';
import { Plus, MoreHorizontal, AlertCircle, User, DollarSign } from 'lucide-react';
import { listServiceOrders, moveServiceOrder } from '../lib/mockApi';

const columns = [
  { id: ServiceOrderStatus.AGUARDANDO, label: 'AGUARDANDO', color: 'bg-slate-100 border-slate-200' },
  { id: ServiceOrderStatus.EM_SERVICO, label: 'EM SERVIÇO', color: 'bg-blue-50 border-blue-100' },
  { id: ServiceOrderStatus.FINALIZADO, label: 'FINALIZADO', color: 'bg-green-50 border-green-100' },
  { id: ServiceOrderStatus.ENTREGUE, label: 'ENTREGUE', color: 'bg-slate-200 border-slate-300' },
];

const Kanban: React.FC = () => {
  const [orders, setOrders] = useState<ServiceOrder[]>(() => listServiceOrders({ storeId: '1' }));

  const moveCard = (id: string, newStatus: ServiceOrderStatus) => {
    // atualiza o "banco" em memória
    moveServiceOrder(id, newStatus);
    // atualiza a UI mantendo o comportamento atual
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Ordens de Serviço</h2>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-sm transition-colors">
          <Plus size={20} />
          <span>Nova O.S.</span>
        </button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex h-full space-x-6 min-w-[1000px] pb-4">
          {columns.map(col => (
            <div
              key={col.id}
              className={`flex-1 flex flex-col rounded-xl border-t-4 ${col.color.replace('bg-', 'border-').split(' ')[0]} bg-slate-50 min-w-[280px]`}
            >
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white rounded-t-lg">
                <h3 className="font-semibold text-slate-700">{col.label}</h3>
                <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full font-bold">
                  {orders.filter(c => c.status === col.id).length}
                </span>
              </div>

              <div className="p-3 flex-1 overflow-y-auto space-y-3">
                {orders.filter(c => c.status === col.id).map(card => (
                  <div
                    key={card.id}
                    className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow group relative"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(card.priority)}`}>
                        {card.priority === 'high' ? 'Urgente' : card.priority === 'medium' ? 'Normal' : 'Baixa'}
                      </span>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>

                    <div className="mb-3">
                      <h4 className="font-bold text-slate-800">
                        {card.vehicle}{' '}
                        <span className="text-slate-400 font-normal text-sm">({card.plate})</span>
                      </h4>
                      <p className="text-sm text-slate-600">{card.customerName}</p>
                    </div>

                    <div className="flex items-center text-sm text-slate-600 mb-3 bg-slate-50 p-2 rounded">
                      <AlertCircle size={14} className="mr-2 text-primary-500" />
                      {card.serviceDescription}
                    </div>

                    <div className="flex justify-between items-center text-sm text-slate-500 mb-3">
                      {card.assignedTo && (
                        <div className="flex items-center" title="Mecânico Responsável">
                          <User size={14} className="mr-1" />
                          <span>{card.assignedTo}</span>
                        </div>
                      )}
                      <div className="flex items-center text-slate-900 font-semibold ml-auto">
                        <DollarSign size={14} className="mr-0.5" />
                        {card.totalEstimated.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex justify-between mt-2 pt-2 border-t border-slate-50">
                      <button
                        disabled={col.id === ServiceOrderStatus.AGUARDANDO}
                        onClick={() => {
                          const statuses = columns.map(c => c.id);
                          const currIdx = statuses.indexOf(col.id);
                          if (currIdx > 0) moveCard(card.id, statuses[currIdx - 1] as ServiceOrderStatus);
                        }}
                        className="text-xs text-slate-400 hover:text-primary-600 disabled:opacity-30 font-medium"
                      >
                        &larr; Voltar
                      </button>

                      <button
                        disabled={col.id === ServiceOrderStatus.ENTREGUE}
                        onClick={() => {
                          const statuses = columns.map(c => c.id);
                          const currIdx = statuses.indexOf(col.id);
                          if (currIdx < statuses.length - 1) moveCard(card.id, statuses[currIdx + 1] as ServiceOrderStatus);
                        }}
                        className="text-xs text-primary-600 hover:text-primary-700 disabled:opacity-30 font-bold"
                      >
                        Avançar &rarr;
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Kanban;