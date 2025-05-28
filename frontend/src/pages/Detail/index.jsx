import { Link, useParams } from 'react-router-dom';
import './index.scss';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then(response => {
        setProduct(response.data.data);
      })
      .catch(error => {
        console.error('Gagal mengambil data produk:', error);
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table mt-3">
        <tbody>
          <tr>
            <td>ID</td>
            <td>: {product.id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>: {product.name}</td>
          </tr>
          <tr>
            <td>Code</td>
            <td>: {product.code}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>: Rp {product.price.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>: {product.quantity}</td>
          </tr>
          <tr>
            <td>Image</td>
            <td>:
              <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${product.images}`}
                  alt={product.name}
                  style={{ width: '100px', height: '100px', objectFit: 'contain', borderRadius: '5px' }}
                />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;
