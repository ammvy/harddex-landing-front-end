"use client";

import { useState, useMemo } from "react";
import { SEED_COMPONENTS } from "../../_data/components";
import { SEED_PRODUCTS } from "../../_data/products";
import { SEED_MANUFACTURERS } from "../../_data/manufacturers";
export function useComponents() {
  const [components, setComponents] = useState(SEED_COMPONENTS);
  const [q, setQ] = useState("");
  const [productFilter, setProductFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const products = SEED_PRODUCTS;
  const manufacturers = SEED_MANUFACTURERS;
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return components.filter(c => {
      const matchesQuery = !query || c.name.toLowerCase().includes(query) || c.description && c.description.toLowerCase().includes(query);
      const matchesProduct = productFilter === "all" || c.productId === Number(productFilter);
      return matchesQuery && matchesProduct;
    });
  }, [components, q, productFilter]);
  const PAGE_SIZE = 6;
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginated = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);
  const saveComponent = item => {
    if (item.id) {
      setComponents(prev => prev.map(x => x.id === item.id ? item : x));
    } else {
      setComponents(prev => [{
        ...item,
        id: Date.now()
      }, ...prev]);
    }
    setEditing(null);
  };
  const deleteComponent = id => {
    setComponents(prev => prev.filter(x => x.id !== id));
    setConfirmDel(null);
  };
  return {
    components: paginated,
    products,
    manufacturers,
    q,
    setQ: v => {
      setQ(v);
      setPage(1);
    },
    productFilter,
    setProductFilter: v => {
      setProductFilter(v);
      setPage(1);
    },
    page: curPage,
    pages,
    setPage,
    editing,
    setEditing,
    confirmDel,
    setConfirmDel,
    saveComponent,
    deleteComponent
  };
}