import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Upload, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: null },
  { to: '/create', label: 'Create', icon: CreditCard },
  { to: '/bulk', label: 'Bulk', icon: Upload },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/30">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-1 group">
          <motion.span
            className="text-xl md:text-2xl font-black tracking-tight"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Shadow</span>
            <span className="text-white ml-1">ID</span>
            <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent ml-1 text-lg md:text-xl font-extrabold italic">Gen</span>
          </motion.span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5',
                pathname === to
                  ? 'gradient-primary text-primary-foreground shadow-neon'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              {Icon && <Icon className="w-3.5 h-3.5" />}
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-muted-foreground hover:text-foreground">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          className="lg:hidden border-t border-border/30 bg-card/95 backdrop-blur-xl"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="container mx-auto px-4 py-3 space-y-1">
            {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                  pathname === to
                    ? 'gradient-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
