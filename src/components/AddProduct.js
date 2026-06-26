import React, { useState } from "react";
import { addProduct } from "../services/data.service";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG, JPEG, and PNG files are allowed!");
      return;
    }

    setProduct((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const postProductData = async () => {
    try {
      await addProduct({
        ...product,
        image: product.image ? product.image.name : null,
      });

      setProduct({ name: "", price: "", description: "", image: null });
      setPreview(null);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postProductData();
  };

  return (
    <section className="auth-screen">
      <div className="auth-card auth-card--wide">
        <h1 className="auth-card__title">Add Product</h1>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="field">
            <span>Product Name</span>
            <input
              className="field-control"
              name="name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field">
            <span>Price</span>
            <input
              className="field-control"
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field">
            <span>Description</span>
            <textarea
              className="field-control field-control--textarea"
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
            />
          </label>

          <label className="button button--outline button--full" htmlFor="product-image">
            Upload Image
            <input
              id="product-image"
              type="file"
              accept=".jpg,.jpeg,.png"
              className="visually-hidden"
              onChange={handleFileChange}
            />
          </label>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" className="image-preview__image" />
            </div>
          )}

          <button
            type="submit"
            className="button button--primary button--full"
            disabled={!product.name || !product.price}
          >
            Add Product
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
