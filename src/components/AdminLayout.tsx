import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { 
  LogOut, 
  LayoutDashboard, 
  Package, 
  Layers, 
  Settings,
  Menu,
  X
} from 'lucide-react';

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const userEmail = auth.currentUser?.email || '';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-md font-medium transition-colors cursor-pointer ${
      isActive
        ? 'bg-white/10 text-white'
        : 'text-white/70 hover:bg-white/5 hover:text-white'
    }`;

  const navIconClass = (isActive: boolean) => 
    `w-5 h-5 ${isActive ? 'text-primary-blue' : ''}`;

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-white/10 flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-2xl font-heading font-black tracking-wider text-white">DAMINER</h1>
          <p className="text-[11px] text-white/60 tracking-widest uppercase mt-1">Панель керування</p>
        </div>
        <button className="md:hidden text-white/70 hover:text-white" onClick={closeMobileMenu}>
           <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        <NavLink to="/admin/dashboard" className={navLinkClass} onClick={closeMobileMenu}>
          {({ isActive }) => (
            <>
              <LayoutDashboard className={navIconClass(isActive)} />
              Головна
            </>
          )}
        </NavLink>
        <NavLink to="/admin/products" className={navLinkClass} onClick={closeMobileMenu}>
          {({ isActive }) => (
            <>
              <Package className={navIconClass(isActive)} />
              Товари
            </>
          )}
        </NavLink>
        <NavLink to="/admin/categories" className={navLinkClass} onClick={closeMobileMenu}>
          {({ isActive }) => (
            <>
              <Layers className={navIconClass(isActive)} />
              Категорії
            </>
          )}
        </NavLink>
        <NavLink to="/admin/settings" className={navLinkClass} onClick={closeMobileMenu}>
          {({ isActive }) => (
            <>
              <Settings className={navIconClass(isActive)} />
              Налаштування
            </>
          )}
        </NavLink>
      </nav>

      <div className="p-4 border-t border-white/10 shrink-0">
        <div className="flex flex-col gap-3">
          <div className="px-2 text-sm text-white/70 truncate" title={userEmail}>
            {userEmail}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white/90 bg-white/10 rounded-md hover:bg-red-500/20 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Вийти
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-body">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-[#0A192F] text-white shrink-0 z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden" 
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-[#0A192F] text-white z-40 transform transition-transform duration-300 md:hidden flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-[#0A192F] text-white shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-1 text-white/70 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-heading font-black tracking-wider">DAMINER</h1>
          </div>
          <button onClick={handleLogout} className="p-2 text-white/70 hover:text-white">
            <LogOut className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};
