import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Heart, 
  BookOpen, 
  Menu, 
  X, 
  ChevronRight,
  Home,
  Baby,
  Briefcase,
  HeadphonesIcon,
  UserCircle,
  HeartPulse,
  Stethoscope,
  LogOut
} from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import { tokenService, authService } from '@/services/api';

type NavItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  description: string;
};

const navigation: NavItem[] = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
    description: 'Return to the main page',
  },
  {
    name: 'Pregnancy-Guide',
    href: '/tracker',
    icon: Calendar,
    description: 'Pregnancy ',
  },
  {
    name: 'Health Monitoring',
    href: '/pregnancy',
    icon: Briefcase,
    description: 'Balance work and family life',
  },
  {
    name: 'Baby Care',
    href: '/baby-care',
    icon: Baby,
    description: 'Track cycles and fertility',
  },
  {
    name: 'Postpartum',
    href: '/postpartum',
    icon: Stethoscope,
    description: 'Trimester guides and health insights',
  }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await tokenService.isAuthenticated();
      setIsAuthenticated(authStatus);
    };
    checkAuth();
  }, []);
  
  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setIsAuthenticated(false);
    navigate('/login');
    setIsOpen(false);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-500',
        scrolled ? 
          'py-3 backdrop-blur-lg bg-background/80 shadow-sm' : 
          'py-5 bg-transparent'
      )}
    >
      <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div 
            className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="h-5 w-5" />
          </motion.div>
          <span className="font-medium text-xl">EmpowerNest</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <nav className="flex space-x-1 mr-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'relative px-3 py-2 rounded-md text-sm font-medium transition-all',
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </span>
                {location.pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-primary/10 rounded-md"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>
          
          {/* Theme Toggle */}
          <ThemeToggle />
          
          {/* Authentication Button */}
          {isAuthenticated ? (
            <Button variant="outline" size="sm" className="rounded-full" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="rounded-full">
                <UserCircle className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          )}
          
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Theme Toggle (Mobile) */}
          <ThemeToggle />
          
          {/* Authentication Button (Mobile) */}
          {isAuthenticated ? (
            <Button variant="outline" size="sm" className="rounded-full" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Logout</span>
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm" className="rounded-full">
                <UserCircle className="h-4 w-4" />
                <span className="sr-only">Login</span>
              </Button>
            </Link>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="md:hidden overflow-hidden"
      >
        <div className="container px-4 py-3 mx-auto space-y-1 bg-card/50 backdrop-blur-sm rounded-b-xl mt-3 border border-t-0">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center justify-between p-3 rounded-md transition-all',
                location.pathname === item.href
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.description}</div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
          
          {/* Mobile Logout Button (in menu) */}
          {isAuthenticated && (
            <div className="p-3 mt-2 border-t border-muted">
              <Button variant="destructive" className="w-full rounded-full" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </motion.div>
    </header>
  );
}

export default Navigation;
