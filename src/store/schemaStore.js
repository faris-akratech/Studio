import { create } from "zustand";

const schemaStore = create((set) => ({
  selectedOrganizationSchemas: null,
  setSelectedOrganizationSchemas: (newOrg) => set({ selectedOrganizationSchemas: newOrg }),

  selectedSchema: null,
  setSelectedSchema: (newSchema) => set({ selectedSchema: newSchema }),
}));

export default schemaStore;
