import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom';
import "./navbar.css";

const searchClient = algoliasearch('UIT1CP8PJT', '26acea688267ca9ad0752fc7e7ffba53');

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      setIsPopupOpen(false);
    } else {
      fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
          const filteredResults = products.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSearchResults(filteredResults);
          setIsPopupOpen(true);
        });
    }
  }, [searchQuery]);

  // Cambiar modo oscuro o claro
  const toggleMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const ProductItem = ({ product }) => (
    <div className="product-item">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h4><Highlight attribute="title" hit={product} /></h4>
        <p>{product.description}</p>
        <p className="product-price">{product.price}$</p>
      </div>
    </div>
  );

  return (
    <InstantSearch searchClient={searchClient} indexName="products">
      <nav className={`navbar ${darkMode ? "dark-mode" : "light-mode"}`}>
        <div className="navbar-left">
          <h1>Proyecto DAD Jorge Bolaños</h1>
        </div>
        <div className="navbar-center">
          <ul>
            
              <>
                <li><Link to="/components">Componentes</Link></li>
                <li><Link to="/api">API</Link></li>
                <li><Link to="/use-reducer">UseReducer</Link></li>
                <li><Link to="/informes">Informes</Link></li>

              </>
            
             {/* Barra de búsqueda de Algolia */}
          <SearchBox
            onChange={handleSearchInputChange}
            translations={{ placeholder: 'Buscar productos...' }}
          />

          {/* Pop-up con los resultados de búsqueda */}
          {isPopupOpen && searchResults.length > 0 && (
            <div className="search-popup">
              {searchResults.map(product => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          )}
          </ul>
        </div>
        <div className="navbar-right">
          <button className="mode-button" onClick={toggleMode}>
            {darkMode ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
          </button>
          
         

          {user ? (
            <>
              <Link to="/profile" className="logout-btn">Perfil</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <Link to="/login" className="logout-btn">Login</Link>
          )}
        </div>
      </nav>
    </InstantSearch>
  );
};

export default Navbar;
