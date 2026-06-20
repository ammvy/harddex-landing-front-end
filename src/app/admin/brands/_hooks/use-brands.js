"use client";

import { useState, useMemo } from "react";
import { SEED_BRANDS } from "../../_data/brands";
export function useBrands() {
  const [brands, setBrands] = useState(SEED_BRANDS);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [editingBrand, setEditingBrand] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return brands.filter(b => {
      return !query || b.name.toLowerCase().includes(query);
    });
  }, [brands, q]);
  const PAGE_SIZE = 6;
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginated = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);
  const saveBrand = item => {
    if (item.id) {
      setBrands(prev => prev.map(x => x.id === item.id ? item : x));
    } else {
      setBrands(prev => [{
        ...item,
        id: Date.now()
      }, ...prev]);
    }
    setEditingBrand(null);
  };
  const deleteBrand = id => {
    setBrands(prev => prev.filter(x => x.id !== id));
    setConfirmDel(null);
  };
  return {
    brands: paginated,
    q,
    setQ: v => {
      setQ(v);
      setPage(1);
    },
    page: curPage,
    pages,
    setPage,
    editingBrand,
    setEditingBrand,
    confirmDel,
    setConfirmDel,
    saveBrand,
    deleteBrand
  };
}