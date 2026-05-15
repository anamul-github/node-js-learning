import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const url = req.url;
  const method = req.method;

  const urlParts = url?.split("/");
  const productId = urlParts?.[2];
  const id = productId ? Number(productId) : null;

  // Get All Products
  if (url === "/products" && method === "GET") {
    const products = readProduct();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products retrieved successfully",
        data: products,
      })
    );

    return;
  }

  // Get Single Product
  if (method === "GET" && id !== null && !Number.isNaN(id)) {
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not found",
        })
      );

      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product retrieved successfully",
        data: product,
      })
    );

    return;
  }

  // Fallback response
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Product route not found",
    })
  );
};