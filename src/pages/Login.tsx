import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../types';
import { UserCircle, Lock, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate(RoutePath.DASHBOARD);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30">
            <span className="text-3xl font-bold text-white">E</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Edinho Pneus</h2>
          <p className="text-slate-500 mt-2">Bem-vindo de volta, gerente.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <div className="relative">
              <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                defaultValue="admin@edinho.com"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                defaultValue="password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-primary-600/20 disabled:opacity-70"
          >
            {loading ? (
              <span>Entrando...</span>
            ) : (
              <>
                <span>Acessar Sistema</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-400">
          <p>&copy; 2024 Edinho Pneus Manager</p>
        </div>
      </div>
    </div>
  );
};

export default Login;