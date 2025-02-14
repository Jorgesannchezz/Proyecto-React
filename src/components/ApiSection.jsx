import React, { useState, useEffect } from 'react';

const ApiSection = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    const response = await fetch(`https://fakestoreapi.com/products?limit=5&page=${currentPage}`);
    const data = await response.json();
    setProducts(data);
    setTotalPages(10); // Para este ejemplo, asumimos que hay 10 páginas
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <div className="container">
      <h2>Productos de la API</h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4" key={product.id}>
            <div className="card">
              <img src={product.image} alt={product.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <button className="btn btn-primary">Añadir a Favoritos</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button 
          className="btn btn-secondary" 
          disabled={currentPage <= 1} 
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Anterior
        </button>
        <span className="mx-3">Página {currentPage} de {totalPages}</span>
        <button 
          className="btn btn-secondary" 
          disabled={currentPage >= totalPages} 
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ApiSection;
