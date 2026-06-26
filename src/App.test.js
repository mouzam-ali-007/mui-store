import { formatProduct } from "./utils/product";

test("formatProduct decorates raw product data for the UI", () => {
  const product = formatProduct({
    id: 99,
    name: "Evening Bag",
    price: 12000,
    image: "/bag.jpg",
  });

  expect(product.brand).toBe("Luma Devaux");
  expect(product.category).toBe("women");
  expect(product.images).toHaveLength(2);
  expect(product.sizes).toContain("Classic");
});
