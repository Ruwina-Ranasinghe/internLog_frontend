import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconUserCircle, IconMenu2, IconX, IconLayoutDashboard, IconPlus, IconList } from '@tabler/icons-react';

 const UserSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState('/user/dashboard');
  const [isOpen, setIsOpen] = useState(false);

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  // Update active state based on current route
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const handleLinkClick = (path: string) => {
    navigate(path); // Navigate to the route
    setActive(path);
    if (window.innerWidth < window.screen.width * 0.25) {
      setIsOpen(false); // close sidebar on mobile after clicking
    }
  };

  const handleLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
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

      {/* UserSidebar */}
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
         style={{ backgroundColor: 'white', zIndex: 50, marginTop: '10px', borderTop:'1px solid #D6D6D6', borderRight:'1px solid #D6D6D6', borderRadius:'7px'  }}
      >
        {/* Navigation */}
        <div className="flex flex-col m-0 p-0 gap-2.5">
            <button
                className={`flex items-center gap-8 w-full text-left px-3 py-3.5 rounded transition-colors duration-200
                  ${active === '/user/dashboard'
                    ? 'bg-[#F4E5FF] text-purple-800'
                    : 'bg-transparent text-black hover:bg-gray-100'
                }`}
                onClick={() => handleLinkClick('/user/dashboard')}
            >
                <IconLayoutDashboard size={22} className="shrink-0" />
                Dashboard
            </button>

            <button
                className={`flex items-center gap-8 w-full text-left px-3 py-3.5 rounded transition-colors duration-200
                  ${active === '/user/create-task'
                    ? 'bg-[#F4E5FF] text-purple-800'
                    : 'bg-transparent text-black hover:bg-gray-100'
                }`}
                onClick={() => handleLinkClick('/user/create-task')}
            >
                <IconPlus size={22} className="shrink-0" />
                Add a Task
            </button>

            <button
                className={`flex items-center gap-8 w-full text-left px-3 py-3.5 rounded transition-colors duration-200
                  ${active === '/user/view-all-tasks'
                    ? 'bg-[#F4E5FF] text-purple-800'
                    : 'bg-transparent text-black hover:bg-gray-100'
                }`}
                onClick={() => handleLinkClick('/user/view-all-tasks')}
            >
                <IconList size={22} className="shrink-0" />
                My Tasks
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

export default UserSidebar;