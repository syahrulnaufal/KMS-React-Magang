import { createContext, useContext, useState, useEffect } from "react";

const SystemContext = createContext();

export function SystemProvider({ children }) {
  const [systems, setSystems] = useState(() => {
    const saved = localStorage.getItem("systems");

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: "HR System",
            description: "Sistem manajemen HR",
            status: "Active",
            menus: [
              { id: 1, name: "Quick Start", path: "quick-start" },
              { id: 2, name: "Installation", path: "installation" },
              { id: 3, name: "Setup", path: "setup" },
            ],
          },
          {
            id: 2,
            name: "Finance System",
            description: "Sistem pengelolaan keuangan",
            status: "Active",
            menus: [
              { id: 4, name: "Components", path: "components" },
              { id: 5, name: "Interactivity", path: "interactivity" },
              { id: 6, name: "Managing State", path: "state" },
            ],
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("systems", JSON.stringify(systems));
  }, [systems]);

  // tambah system
  const addSystem = (system) => {
    setSystems([
      ...systems,
      {
        id: Date.now(),
        menus: [],
        ...system,
      },
    ]);
  };

  // hapus system
  const deleteSystem = (id) => {
    setSystems(systems.filter((sys) => sys.id !== id));
  };

  // tambah menu ke system
  const addMenu = (systemId, menu) => {
    setSystems(
      systems.map((sys) =>
        sys.id === systemId
          ? {
              ...sys,
              menus: [...(sys.menus || []), { id: Date.now(), ...menu }],
            }
          : sys
      )
    );
  };

  // hapus menu
  const deleteMenu = (systemId, menuId) => {
    setSystems(
      systems.map((sys) =>
        sys.id === systemId
          ? {
              ...sys,
              menus: sys.menus.filter((m) => m.id !== menuId),
            }
          : sys
      )
    );
  };

  return (
    <SystemContext.Provider
      value={{
        systems,
        addSystem,
        deleteSystem,
        addMenu,
        deleteMenu,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystems() {
  return useContext(SystemContext);
}
