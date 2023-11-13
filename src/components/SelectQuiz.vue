<template>
  <div class="text-center mb-2 text-2xl">Select Quiz</div>
  <div class="text-center">
    <SelectButton text raised rounded class="large" severity="info" v-model="state.selectQuiz"  :options="quizzesByCategory" aria-labelledby="basic" />
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue';
import { useQuiz } from '@/store/modules/quiz';

const props = defineProps({
  categoryId: {
    required: true
  }
})

const quizStore = useQuiz();

const state = reactive({
    selectQuiz: null,
});

const quizzesByCategory = computed(() => {
  return quizStore.quizzes.filter(q => q.category?.id == props.categoryId).map(q => q.title)
})

watch(
  () => state.selectQuiz,
  async (value) => {
    const q = quizStore.quizzes.find(q => q.title === value)
    console.log(q)
    quizStore.setSelectedQuiz(q);
  }
);

</script>
