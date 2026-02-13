import React from 'react';
import { Shield, UserPlus, Settings, Lock } from 'lucide-react';

const Admin: React.FC = () => {
  const users = [
    { name: 'Edinho Admin', email: 'admin@edinho.com', role: 'Administrador', status: 'Ativo' },
    { name: 'Carlos Mecânico', email: 'carlos@edinho.com', role: 'Mecânico', status: 'Ativo' },
    { name: 'Ana Caixa', email: 'ana@edinho.com', role: 'Caixa', status: 'Ativo' },
    { name: 'Roberto Motoboy', email: 'beto@edinho.com', role: 'Courier', status: 'Férias' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">Painel Administrativo</h2>
          <p className="text-slate-300 max-w-xl">Gerencie usuários, permissões e configurações globais do sistema Edinho Pneus Manager.</p>
        </div>
        <Shield className="absolute right-0 bottom-0 text-slate-800 opacity-20 transform translate-x-1/4 translate-y-1/4" size={240} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Settings size={20} className="text-slate-400" />
              Usuários do Sistema
            </h3>
            <button className="text-primary-600 hover:bg-primary-50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
              <UserPlus size={16} />
              Novo Usuário
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {users.map((user, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium mb-1">
                    {user.role}
                  </span>
                  <p className="text-xs text-green-600 font-medium">{user.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-6">
            <Lock size={20} className="text-slate-400" />
            Permissões e Segurança
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <p className="font-medium text-slate-900">Autenticação em Dois Fatores</p>
                <p className="text-xs text-slate-500">Exigir para administradores</p>
              </div>
              <div className="w-11 h-6 bg-primary-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <p className="font-medium text-slate-900">Backups Automáticos</p>
                <p className="text-xs text-slate-500">Diário às 03:00 AM</p>
              </div>
              <div className="w-11 h-6 bg-primary-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div>
                <p className="font-medium text-slate-900">Acesso API Externa</p>
                <p className="text-xs text-slate-500">Integração Gemini AI</p>
              </div>
              <div className="w-11 h-6 bg-slate-300 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;