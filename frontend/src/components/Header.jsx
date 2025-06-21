import { FaGamepad, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-tech-dark/90 backdrop-blur-xl border-b border-tech-blue/20 sticky top-0 z-40">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-tech-blue to-tech-purple rounded-xl flex items-center justify-center">
              <FaGamepad className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-display font-bold gradient-text">
              TECH STORE
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-tech-white hover:text-tech-blue transition-colors duration-300 font-tech font-medium">
              FEATURES
            </a>
            <a href="#games" className="text-tech-white hover:text-tech-purple transition-colors duration-300 font-tech font-medium">
              GAMES
            </a>
            <a href="#about" className="text-tech-white hover:text-tech-cyan transition-colors duration-300 font-tech font-medium">
              ABOUT
            </a>
            <a href="#contact" className="text-tech-white hover:text-tech-emerald transition-colors duration-300 font-tech font-medium">
              CONTACT
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-tech-white hover:text-tech-blue transition-colors duration-300"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-tech-blue/20">
            <nav className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-tech-white hover:text-tech-blue transition-colors duration-300 font-tech font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                FEATURES
              </a>
              <a
                href="#games"
                className="text-tech-white hover:text-tech-purple transition-colors duration-300 font-tech font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                GAMES
              </a>
              <a
                href="#about"
                className="text-tech-white hover:text-tech-cyan transition-colors duration-300 font-tech font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                ABOUT
              </a>
              <a
                href="#contact"
                className="text-tech-white hover:text-tech-emerald transition-colors duration-300 font-tech font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                CONTACT
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;