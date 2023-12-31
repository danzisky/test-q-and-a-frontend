/* eslint-disable no-console */
import { defineStore } from "pinia";

export const useQuiz = defineStore("quiz", {
  state: () => {
    return {
      categories: [],
      difficultyLevels: [],
      selectedCategory: null,
      selectedQuiz: null,
      quizStatus: null,
      selectedDifficulty: null,
      quizzes: [],
      users: [],
    }
  },
  getters: {
    
  },
  actions: { 
    setSelectedQuiz(quiz) {
      this.selectedQuiz = quiz;
    },
    setQuizzes(quizzes) {
      this.quizzes = quizzes;
    },
    setCategories(categories) {
      this.categories = categories;
    },
    setDifficultyLevels(difficultyLevels) {
      this.difficultyLevels = difficultyLevels;
    },
    setCategory(category) {
      this.selectedCategory = category;
    },
    setDifficulty(difficulty) {
      this.selectedDifficulty = difficulty;
    },
    setQuizStatus(status) {
      this.quizStatus = status;
    },
    setUsers(users){
      this.users = users;
    }
  },
})
