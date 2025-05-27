import Input from '../../components/Input';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const Tambah = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    code: '',
    price: '',
    quantity: '',
    images: null,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, images: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', form.name);
    data.append('code', form.code);
    data.append('price', form.price);
    data.append('quantity', form.quantity);
    data.append('status', form.status);
    if (form.images) {
      data.append('images', form.images);
    }

    try {
      await axios.post('http://localhost:5000/api/products', data);
      navigate('/');
    } catch (err) {
      console.error('Gagal tambah produk:', err);
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            name="code"
            type="text"
            placeholder="Code Produk..."
            label="Code"
            value={form.code}
            onChange={handleChange}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={form.price}
            onChange={handleChange}
          />
          <Input
            name="quantity"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={form.quantity}
            onChange={handleChange}
          />
          <div className="form-group mb-3">
            <label>Gambar</label>
            <input
              type="file"
              name="images"
              onChange={handleImageChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
