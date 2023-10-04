import { defineStore } from "pinia";

import firebase from "@/utils/firebase";

export const useManageProject = defineStore({
  id: "ManageProject",
  state: () => ({
    project: {},
    allTask: [],
    taskActive: [],
    itemTask: {},
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
        // console.log(data);
        this.project = data[0];
      });
    },
    async getTaskByCode(code) {
      const todoRef = await firebase
        .database()
        .ref("list-tasks")
        .orderByChild("code")
        .equalTo(code);
      todoRef.on("value", (snapshot) => {
        const todos = snapshot.val();
        const data = [];
        for (let id in todos) {
          data.push({ id, ...todos[id] });
        }
        this.itemTask = data[0];
      });
    },
    async getTaskByProjectKey(key) {
      const todoRef = await firebase
        .database()
        .ref("list-tasks")
        .orderByChild("projectKey")
        .equalTo(key);
      todoRef.on("value", (snapshot) => {
        const todos = snapshot.val();
        const data = [];
        for (let id in todos) {
          data.push({ id, ...todos[id] });
        }
        this.allTask = data;
      });
    },
    async moveTask(data, status) {
      const convertData = data;
      if (status == 1) {
        // move task to activesprint
        convertData.isInBlacklog = false;
        convertData.isInNewSprint = false;
        convertData.activeSprint = this.project.activesprint.sprintCode;
        await firebase
          .database()
          .ref("list-tasks/" + data.id)
          .update(convertData);
      } else if (status == 2) {
        // move task to newsprint
        convertData.isInBlacklog = false;
        convertData.isInNewSprint = true;
        convertData.activeSprint = "";
        await firebase
          .database()
          .ref("list-tasks/" + data.id)
          .update(convertData);
      } else {
        // move task to blacklog
        convertData.isInBlacklog = true;
        convertData.isInNewSprint = false;
        convertData.activeSprint = "";
        await firebase
          .database()
          .ref("list-tasks/" + data.id)
          .update(convertData);
      }

      // this.getListIssueActive(1);
    },
    async getTaskInActiveSprint(key, activesprint) {
      // await this.getProjectByKey(key)
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
        const activeSprint = data[0].activesprint.sprintCode;
        this.project = data[0];
        firebase
          .database()
          .ref("list-tasks")
          .orderByChild("projectKey")
          .equalTo(key)
          .once("value")
          .then((snapshot) => {
            const tasks = [];
            snapshot.forEach((childSnapshot) => {
              const task = childSnapshot.val();
              if (
                task.activeSprint === activeSprint &&
                !task.isInBlacklog &&
                !task.isInNewSprint
              ) {
                tasks.push(task);
              }
            });
            // Now you have the filtered tasks in the 'tasks' array
            // console.log(tasks);
            this.taskActive = tasks;
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
          });
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
