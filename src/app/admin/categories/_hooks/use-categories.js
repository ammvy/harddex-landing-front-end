"use client";

import { useState, useMemo } from "react";
import { SEED_CATEGORIES } from "../../_data/categories";
export function useCategories() {
  const [categories, setCategories] = useState(SEED_CATEGORIES);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [editingCategory, setEditingCategory] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return categories.filter(c => {
      return !query || c.name.toLowerCase().includes(query);
    });
  }, [categories, q]);
  const PAGE_SIZE = 6;
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginated = filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);
  const saveCategory = item => {
    if (item.id) {
      setCategories(prev => prev.map(x => x.id === item.id ? item : x));
    } else {
      setCategories(prev => [{
        ...item,
        id: Date.now()
      }, ...prev]);
    }
    setEditingCategory(null);
  };
  const deleteCategory = id => {
    setCategories(prev => prev.filter(x => x.id !== id));
    setConfirmDel(null);
  };
  return {
    categories: paginated,
    q,
    setQ: v => {
      setQ(v);
      setPage(1);
    },
    page: curPage,
    pages,
    setPage,
    editingCategory,
    setEditingCategory,
    confirmDel,
    setConfirmDel,
    saveCategory,
    deleteCategory
  };
}