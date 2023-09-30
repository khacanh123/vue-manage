import { defineStore } from "pinia";

import firebase from "@/utils/firebase";

export const useManageProject = defineStore({
  id: "ManageProject",
  state: () => ({
    project: {},
  }),
  actions: {
    async getProjectByKey(key) {
      const todoRef = await firebase
        .database()
        .ref("list-project")
        .orderByChild("key")
        .equalTo(key);
      todoRef.on("value", (snapshot) => {
        const todos = snapshot.val();
        const data = [];
        for (let id in todos) {
          data.push({ id, ...todos[id] });
        }
        console.log(data);
        this.project = data[0];
      });
    },
    async updateProject(data) {
      await firebase
        .database()
        .ref("list-project/" + data.id)
        .update(data);
      // this.getListIssueActive(1);
    },
  },
});
