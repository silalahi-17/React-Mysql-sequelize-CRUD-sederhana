import { useParams, useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '../../components/Input';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    code: '',
    price: '',
    quantity: '',
    status: false,
  });

  const [previewImage, setPreviewImage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then((res) => {
        const data = res.data.data;
        setForm({
          name: data.name,
          code: data.code,
          price: data.price,
          stock: data.quantity, // atau data.stock tergantung backend
          status: data.status || false,
        });
        setPreviewImage(`${import.meta.env.VITE_API_URL}/${data.images.replace('\\', '/')}`);
      })
      .catch((err) => {
        console.error("Gagal ambil data produk:", err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('code', form.code);
    formData.append('price', form.price);
    formData.append('quantity', form.stock);
    if (imageFile) {
      formData.append('images', imageFile);
    }

    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Produk berhasil diupdate!');
      navigate('/');
    } catch (err) {
      console.error('Gagal update produk:', err);
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
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
            placeholder="Kode Produk..."
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
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            value={form.stock}
            onChange={handleChange}
          />

          <div className="form-group mb-3">
            <label>Gambar</label>
            <input type="file" name="images" onChange={handleImageChange} className="form-control" />
            {previewImage && (
              <img
              src={previewImage}
              alt="Preview"
              style={{ marginTop: '10px', maxHeight: '150px' }}
              />
            )}
          </div>

          <button type="submit" className="btn btn-primary">Simpan</button>
          <Link to="/" className="btn btn-secondary ms-2">Kembali</Link>
        </form>
      </div>
    </div>
  );
};

export default Edit;
