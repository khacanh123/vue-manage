import { defineStore } from "pinia";

import firebase from "@/utils/firebase";

export const useIssueActive = defineStore({
  id: "issue",
  state: () => ({
    allIssue: [],
    listComment: [],
  }),
  // getter
  // actions
  actions: {
    async getListIssueActive(idproject) {
      const todoRef = await firebase.database().ref("ListBacklog");
      todoRef.on("value", (snapshot) => {
        const todos = snapshot.val();
        const todoList = [];
        for (let id in todos) {
          todoList.push({ id, ...todos[id] });
        }
        this.allIssue = todoList.filter(
          (item) => item.idProject == idproject && item.activeSprint == 2
        );
      });
    },
    async updateInfoIssue(data) {
      await firebase
        .database()
        .ref("list-tasks/" + data.id)
        .update(data);
    },
    async getListCommentOfIssue(id) {
      const todoRef = await firebase
        .database()
        .ref("ListCommentIssue")
        .orderByChild("idIssue")
        .equalTo(id);
      todoRef.on("value", (snapshot) => {
        const todos = snapshot.val();
        const data = [];
        for (let id in todos) {
          data.push({ id, ...todos[id] });
        }
        this.listComment = todos;
      });
    },
    async addCommentOfIssue(data) {
      const comment = await firebase.database().ref("ListCommentIssue");
      comment.push(data);
      this.getListCommentOfIssue(data.idIssue);
    },
    async updateStatusIssue(data, status) {
      const convertData = data;
      convertData.status = status;
      await firebase
        .database()
        .ref("list-tasks/" + data.id)
        .update(convertData);
      // this.getListIssueActive(1);
    },
  },
});
