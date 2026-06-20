import { useState, useMemo } from "react";
import { SEED_USERS } from "../../_data/users";
const PAGE_SIZE = 6;
export function useUsers() {
  const [allUsers, setAllUsers] = useState(SEED_USERS);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return allUsers.filter(u => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term));
  }, [allUsers, q]);
  const pages = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const curPage = Math.min(page, pages);
  const paginatedUsers = useMemo(() => {
    return filtered.slice((curPage - 1) * PAGE_SIZE, curPage * PAGE_SIZE);
  }, [filtered, curPage]);
  const saveUser = user => {
    if (user.id === 0) {
      const nextId = Math.max(0, ...allUsers.map(u => u.id)) + 1;
      setAllUsers(prev => [...prev, {
        ...user,
        id: nextId
      }]);
    } else {
      setAllUsers(prev => prev.map(u => u.id === user.id ? user : u));
    }
    setEditingUser(null);
  };
  const deleteUser = id => {
    setAllUsers(prev => prev.filter(u => u.id !== id));
    setConfirmDel(null);
  };
  return {
    users: paginatedUsers,
    q,
    setQ,
    page: curPage,
    pages,
    setPage,
    editingUser,
    setEditingUser,
    confirmDel,
    setConfirmDel,
    saveUser,
    deleteUser
  };
}