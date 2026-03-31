import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Super Admin",
      email: "superadmin@kms.com",
      role: "superadmin",
    },
    {
      id: 2,
      name: "Admin",
      email: "admin@kms.com",
      role: "admin",
    },
  ]);

  const addUser = (user) => {
    setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
  };

  const updateUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  return useContext(UserContext);
}
