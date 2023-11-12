<template>
  <div class="flex flex-col gap-4 w-full p-2 sm:p-6">
    <div></div>
    <div v-for="(answer, index) in answers" :key="index">
      {{ answer }}
      <AddAnswer :answer="answer"/>
    </div>
  </div>
</template>

<script setup>
import AddAnswer from "./AddAnswer.vue";
import apiRoutes from "../composables/useApiRoutes";

const props = defineProps({
  question: {
    type: String,
    default: "",
  },
  answers: {
    type: Object,
  },
});

const saveQuestion = () => {
    return apiRoutes.quiz.createQuestion()
}
</script>

<style></style>
