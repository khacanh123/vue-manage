import { defineStore } from "pinia";

export const useManageStatus = defineStore({
  id: "statusApp",
  state: () => ({
    openSideBar: true,
    activeID: "",
  }),
  actions: {
    toggleSideBar() {
      this.openSideBar = !this.openSideBar;
    },
    checkCloseSideBar(route) {
      if (route.path.includes("/active-sprint")) {
        this.openSideBar = false;
      }
    },
    setActiveID(id) {
      this.activeID = id;
    },
  },
});
