import React, { useState } from 'react';
import { Truck, MapPin, Key } from 'lucide-react';
import { CourierOrder, CourierStatus } from '../types';
import { listCourierOrders, setCourierStatus } from '../lib/mockApi';

const Courier: React.FC = () => {
  const [orders, setOrders] = useState<CourierOrder[]>(() => listCourierOrders({ storeId: '1' }));

  const refresh = () => {
    setOrders(listCourierOrders({ storeId: '1' }));
  };

  const getStatusColor = (status: CourierStatus) => {
    switch (status) {
      case CourierStatus.PENDENTE: return 'bg-slate-100 text-slate-600';
      case CourierStatus.ACEITO: return 'bg-blue-100 text-blue-700';
      case CourierStatus.COLETADO: return 'bg-orange-100 text-orange-700';
      case CourierStatus.ENTREGUE: return 'bg-green-100 text-green-700';
      case CourierStatus.CANCELADO: return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const handleAdvance = (id: string, status: CourierStatus) => {
    if (status === CourierStatus.ACEITO) {
      setCourierStatus(id, CourierStatus.COLETADO);
      refresh();
      return;
    }
    if (status === CourierStatus.COLETADO) {
      setCourierStatus(id, CourierStatus.ENTREGUE);
      refresh();
      return;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Truck className="text-primary-500" />
            Courier & Entregas
          </h2>
          <p className="text-slate-500 text-sm">Acompanhamento de coletas e entregas em tempo real.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Status do Entregador</p>
          <p className="text-green-600 font-bold flex items-center justify-end gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Online
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 relative overflow-hidden">
            {order.status === CourierStatus.ACEITO && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500"></div>}

            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pedido #{order.id}</span>
                  <h3 className="text-lg font-bold text-slate-800 mt-1">{order.description}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <div className="w-2 h-2 rounded-full bg-slate-300 ring-4 ring-slate-100"></div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Origem (Store ID: {order.fromStoreId})</p>
                    <p className="text-sm font-medium text-slate-900">Oficina Central</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <MapPin size={12} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Destino (Store ID: {order.toStoreId})</p>
                    <p className="text-sm font-medium text-slate-900">Filial Zona Norte</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex md:flex-col items-center justify-center gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 min-w-[170px]">
              {order.status !== CourierStatus.ENTREGUE && order.status !== CourierStatus.CANCELADO && (
                <div className="text-center">
                  <p className="text-xs text-slate-400">Previsão</p>
                  <p className="text-lg font-bold text-slate-800">{order.estimatedArrival}</p>
                </div>
              )}

              {order.otp && order.status === CourierStatus.ACEITO && (
                <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
                  <Key size={16} className="text-slate-500" />
                  <span className="font-mono font-bold text-lg tracking-widest text-slate-800">{order.otp}</span>
                </div>
              )}

              {(order.status === CourierStatus.ACEITO || order.status === CourierStatus.COLETADO) && (
                <button
                  onClick={() => handleAdvance(order.id, order.status)}
                  className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-700 transition-colors"
                >
                  {order.status === CourierStatus.ACEITO ? 'Marcar como Coletado' : 'Marcar como Entregue'}
                </button>
              )}

              <button className="flex-1 md:flex-none w-full bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courier;