const defaultDetails = [
  {
    label: "Craft",
    value: "Premium finish designed for day-to-night styling.",
  },
  {
    label: "Delivery",
    value: "Express dispatch available in 3-5 working days.",
  },
  {
    label: "Care",
    value: "Store in a dust bag and wipe gently with a soft cloth.",
  },
];

const titleCase = (value) =>
  value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const formatProduct = (item) => {
  if (!item) {
    return null;
  }

  const name = item.name || item.title || "Signature Piece";
  const numericPrice = Number(item.price || 0);
  const normalizedCategory = String(item.category || "women").trim().toLowerCase();
  const categoryLabel = titleCase(normalizedCategory);

  return {
    ...item,
    id: item.id,
    name,
    description:
      item.description ||
      "A polished statement piece with a refined silhouette and versatile everyday styling.",
    image: item.image || "/banner1.jpg",
    brand: item.brand || "Luma Devaux",
    price: numericPrice,
    oldPrice: item.oldPrice || Math.round(numericPrice * 1.2),
    discount: item.discount || 20,
    rating: item.rating || 4.9,
    reviews: item.reviews || 58,
    express: item.express ?? true,
    inStock: item.in_stock ?? item.inStock ?? true,
    category: normalizedCategory,
    categoryLabel,
    details: item.details?.length ? item.details : defaultDetails,
    images: item.images?.length ? item.images : [item.image || "/banner1.jpg", item.image || "/banner1.jpg"],
    sizes: item.sizes?.length ? item.sizes : ["Mini", "Classic", "Large"],
  };
};
