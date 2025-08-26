import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconUserCircle, IconMenu2, IconX } from '@tabler/icons-react';

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState('dashboard');
  const [isOpen, setIsOpen] = useState(false);

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (path: string) => {
    navigate(path);
    setActive(path);
    if (window.innerWidth < window.screen.width * 0.25) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("isAdmin");

      navigate("/", { replace: true });
  };

  return (
    <>
      {/* Hamburger icon for mobile */}
      <div className="md:hidden fixed right-3 top-2 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-purple-800 text-white rounded-md shadow-md"
        >
          {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </div>

      {/* SidebarAdmin */}
      <nav
        className={`
          fixed left-0
            top-14 sm:top-16 md:top-20 lg:top-24
            h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] lg:h-[calc(100vh-6rem)]
            w-64 p-4 flex flex-col justify-between
            transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:left-0 md:right-auto md:z-10 
        `}
         style={{ backgroundColor: '#C89FE4', borderRight: '1px solid #830999', borderTop: '1px solid #830999', zIndex: 50  }}
      >
        {/* Navigation */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            className={`w-full text-left px-3 py-2 rounded ${
              active === '/admin-dashboard'
                ? 'bg-purple-800 text-white'
                : 'bg-purple-300 text-purple-900'
            }`}
            onClick={() => handleLinkClick('/admin-dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`w-full text-left px-3 py-2 rounded ${
              active === '/user-log'
                ? 'bg-purple-800 text-white'
                : 'bg-purple-300 text-purple-900'
            }`}
            onClick={() => handleLinkClick('/user-log')}
          >
            All User
          </button>
        </div>

        {/* Bottom user profile */}
        <div className="flex flex-col items-center gap-2 pb-4">
          <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center">
            <IconUserCircle size={30} />
          </div>
          <p className="text-sm text-gray-700 select-none">{name}</p>
          <p className="text-xs text-gray-500 select-none">{email}</p>
          <button onClick={handleLogout} className="mt-2 w-full bg-purple-800 text-white text-sm py-1 rounded-full">
            Logout
          </button>
        </div>
      </nav>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        ></div>
      )}
    </>
  );
};

export default SidebarAdmin;