import { Link } from 'react-router-dom';
import './index.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/products`)
      .then(response => {
        console.log('Data produk dari backend:', response.data);
        setProducts(response.data.data);
      })
      .catch(error => {
        console.log('Error ambil data:', error);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apakah kamu yakin ingin menghapus produk ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
      // Update state, filter produk yg sudah dihapus
      setProducts(products.filter(product => product.id !== id));
      alert('Produk berhasil dihapus');
    } catch (error) {
      console.error('Gagal hapus produk:', error);
      alert('Gagal menghapus produk');
    }
  };

  const filteredProducts = products.filter(prod => {
    const term = search.toLowerCase();
    return (
      prod.name.toLowerCase().includes(term) ||
      prod.code.toLowerCase().includes(term)
    );
  });


  return (
    <div className="main">
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-center">Code</th>
            <th className="text-center">Price</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Image</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="border px-4 py-2">{product.id}</td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.code}</td>
                <td className="border px-4 py-2">Rp {product.price.toLocaleString()}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/${product.images}`}
                    alt={product.name}
                    style={{ width: '100px', height: '100px', objectFit: 'contain', borderRadius: '5px' }}
                  />
                </td>
                <td className="border px-4 py-2 text-center">
                  <Link to={`/detail/${product.id}`} className="btn btn-sm btn-info me-1">Detail</Link>
                  <Link to={`/edit/${product.id}`} className="btn btn-sm btn-warning me-1">Edit</Link>
                  <Link onClick={() => handleDelete(product.id)} className="btn btn-sm btn-danger me-1">Delete</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                <p className="text-muted">Produk tidak ditemukan</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Home;
