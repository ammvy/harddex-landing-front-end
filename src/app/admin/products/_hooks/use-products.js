"use client";

import { useState, useMemo } from "react";
import { SEED_PRODUCTS } from "../../_data/products";
import { SEED_BRANDS } from "../../_data/brands";
import { SEED_CATEGORIES } from "../../_data/categories";
export function useProducts() {
  const [products, setProducts] = useState(SEED_PRODUCTS);
  const [q, setQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const brands = SEED_BRANDS;
  const categories = SEED_CATEGORIES;
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return products.filter(p => {
      const brandName = brands.find(b => b.id === p.brandId)?.name.toLowerCase() || "";
      const matchesQuery = !query || p.name.toLowerCase().includes(query) || p.description && p.description.toLowerCase().includes(query) || brandName.includes(query);
      const matchesCategory = categoryFilter === "all" || p.categoryId === Number(categoryFilter);
      return matchesQuery && matchesCategory;
    });
  }, [products, q, categoryFilter, brands]);
  const PAGE_SIZE = 6;
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginated = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);
  const saveProduct = item => {
    if (item.id) {
      setProducts(prev => prev.map(x => x.id === item.id ? item : x));
    } else {
      setProducts(prev => [{
        ...item,
        id: Date.now()
      }, ...prev]);
    }
    setEditing(null);
  };
  const deleteProduct = id => {
    setProducts(prev => prev.filter(x => x.id !== id));
    setConfirmDel(null);
  };
  return {
    products: paginated,
    brands,
    categories,
    q,
    setQ: v => {
      setQ(v);
      setPage(1);
    },
    categoryFilter,
    setCategoryFilter: v => {
      setCategoryFilter(v);
      setPage(1);
    },
    page: curPage,
    pages,
    setPage,
    editing,
    setEditing,
    confirmDel,
    setConfirmDel,
    saveProduct,
    deleteProduct
  };
}