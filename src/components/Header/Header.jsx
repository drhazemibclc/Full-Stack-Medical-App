import { useEffect, useRef, useContext } from "react";
import logo from '../../assets/images/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import '../../App.css';

const navLinks = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/doctors',
    display: 'Find a Doctor'
  },
  {
    path: '/services',
    display: 'Services'
  },
  {
    path: '/contact',
    display: 'Contact'
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const {user, role, token} = useContext(authContext);

  const handleStickyHeader = () => {
    const handleScroll = () => {
      if (window.scrollY > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky_header');
      } else {
        headerRef.current.classList.remove('sticky_header');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  };

  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener('scroll', handleStickyHeader);
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle('show_menu');

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* === LOGO ===*/}
          <div>
            <Link to="/">
               <img src={logo} alt="Logo" />
            </Link>
            
          </div>

          {/** === menu ===*/}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={navClass =>
                      navClass.isActive
                        ? 'text-primaryColor text-[16px] leading-7 font-[600]'
                        : 'text-textColor text-[16px] leading-7 font-[600] hover:text-primaryColor'
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/** === nav right ===*/}
          <div className="flex items-center space-x-2">
            {token && user ? (
              <Link to={`${role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}`} className="flex items-center">
                <figure className="w-[50px] rounded-full cursor-pointer">
                  <img src={user?.photo} className='w-full rounded-full' alt="Userphoto" />
                </figure>
                {/*<h2 className="ml-5 font-bold">{user?.name}</h2>*/}
              </Link>
            ) : (
              <>
                <Link to='/login'>
                  <button className="bg-primaryColor py-2 px-3 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                    Login
                  </button>
                </Link>
                <Link to='/register'>
                  <button className="bg-primaryColor py-2 px-2 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                    Signup
                  </button>
                </Link>
              </>
            )}
      
            

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className='w-6 h-6 cursor-pointer' />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
