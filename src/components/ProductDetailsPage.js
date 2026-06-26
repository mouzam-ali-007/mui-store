import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import { getProductById } from "../services/data.service";
import { formatProduct } from "../utils/product";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getProductById(id).then((data) => {
      if (!isMounted) {
        return;
      }

      setProduct(formatProduct(data));
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="page-section">
      <ProductDetails product={product} loading={loading} />
    </div>
  );
};

export default ProductDetailsPage;
