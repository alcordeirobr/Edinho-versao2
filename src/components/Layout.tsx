import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Trello, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  Truck, 
  Shield, 
  LogOut, 
  Menu, 
  X,
  Bell,
  User
} from 'lucide-react';
import { RoutePath } from '../types';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: RoutePath.DASHBOARD },
    { icon: Trello, label: 'Kanban Oficina', path: RoutePath.KANBAN },
    { icon: ShoppingCart, label: 'PDV', path: RoutePath.PDV },
    { icon: Package, label: 'Estoque', path: RoutePath.ESTOQUE },
    { icon: DollarSign, label: 'Caixa', path: RoutePath.CAIXA },
    { icon: Truck, label: 'Courier', path: RoutePath.COURIER },
    { icon: Shield, label: 'Admin', path: RoutePath.ADMIN },
  ];

  const handleLogout = () => {
    navigate(RoutePath.LOGIN);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-dark-900 text-white transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-dark-900 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white">E</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Edinho<span className="text-primary-500">Pneus</span></span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => {
                    navigate(item.path);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center px-4 py-3 rounded-lg transition-colors
                    ${isActive(item.path) 
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                  `}
                >
                  <item.icon size={20} className="mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button 
            onClick={handleLogout}
            className="flex items-center px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:px-8">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <Menu size={24} />
          </button>

          <div className="flex-1 px-4">
            <h1 className="text-lg font-semibold text-slate-800 hidden sm:block">
              {menuItems.find(i => isActive(i.path))?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-900">Edinho Admin</p>
                <p className="text-xs text-slate-500">Gerente Geral</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                <User size={20} className="text-slate-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;