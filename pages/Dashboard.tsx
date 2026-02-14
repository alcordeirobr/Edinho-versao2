import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { DollarSign, Wrench, Users, AlertTriangle } from 'lucide-react';
import { listTransactions, listServiceOrders, listProducts } from '../lib/mockApi';
import { ServiceOrderStatus } from '../types';

type StatCardProps = {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
};

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="text-white" size={24} />
      </div>
    </div>
  </div>
);

const COLORS = ['#ea580c', '#f97316', '#fb923c', '#fdba74'];

const Dashboard: React.FC = () => {
  const storeId = '1';

  const transactions = useMemo(() => listTransactions({ storeId }), []);
  const serviceOrders = useMemo(() => listServiceOrders({ storeId }), []);
  const products = useMemo(() => listProducts({ storeId }), []);

  const receitaHoje = transactions
    .filter(t => t.type === 'RECEITA')
    .reduce((sum, t) => sum + t.amount, 0);

  const servicosAtivos = serviceOrders.filter(s => s.status !== ServiceOrderStatus.ENTREGUE).length;

  const estoqueBaixo = products.filter(p => (p.stock ?? 0) <= 3).length;

  // Ainda não temos Customer no mock central -> mantemos mockado (sem inventar entidades)
  const novosClientes = 8;

  // Gráfico semanal (mock estável)
  const dataSales = [
    { name: 'Seg', valor: 4000 },
    { name: 'Ter', valor: 3000 },
    { name: 'Qua', valor: 2000 },
    { name: 'Qui', valor: 2780 },
    { name: 'Sex', valor: 5890 },
    { name: 'Sab', valor: 8390 },
    { name: 'Dom', valor: 1400 },
  ];

  // Mix de serviços: deriva das OS por "serviceDescription" (sem inventar tabela de serviços)
  const dataServices = useMemo(() => {
    const map = new Map<string, number>();
    for (const so of serviceOrders) {
      const key = so.serviceDescription || 'Outros';
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .slice(0, 6);
  }, [serviceOrders]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Receita Hoje"
          value={`R$ ${receitaHoje.toFixed(2)}`}
          icon={DollarSign}
          color="bg-emerald-500"
        />
        <StatCard
          title="Serviços Ativos"
          value={`${servicosAtivos}`}
          icon={Wrench}
          color="bg-primary-500"
        />
        <StatCard
          title="Novos Clientes"
          value={`${novosClientes}`}
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Estoque Baixo"
          value={`${estoqueBaixo} Itens`}
          icon={AlertTriangle}
          color="bg-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Faturamento Semanal</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataSales}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Bar dataKey="valor" fill="#ea580c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Mix de Serviços (por OS)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataServices}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataServices.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3 mt-4">
            {dataServices.map((service, idx) => (
              <div key={service.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span className="text-slate-600">{service.name}</span>
                </div>
                <span className="font-semibold text-slate-800">{service.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;