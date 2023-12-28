import { create } from "zustand";

const organizationStore = create((set) => ({
  selectedOrganization: null,
  setSelectedOrganization: (newOrg) => set({ selectedOrganization: newOrg }),

  selectedOrgIndex: null,
  setSelectedOrgIndex: (newIndex) => set({ selectedOrgIndex: newIndex }),
}));

export default organizationStore;
