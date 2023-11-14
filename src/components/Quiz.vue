<template>
  <div>
    <Tag severity="warning" value="Warning" class="text-2xl">{{ timerCount }} seconds remaining</Tag>
    <div v-if="!authStore.user" class="text-center">
      Please select a user
    </div>
    <div v-else>
      <div v-if="quizStore.quizStatus !== 'FINISHED'">
        <h1 class="text-center">Quiz</h1>
        <p class="text-center" v-if="currentQuestionIndex < questions.length">
          {{ currentQuestionIndex + 1 }} / {{ questions.length }}
        </p>
        <div
          v-for="(question, index) in questions"
          :key="index"
        >
          <ViewQuestion
            v-if="index == currentQuestionIndex"
            :question="question"
            :choices="question.choices"
            @answer="handleAnswer"
            v-model="answers[index]"
  
          />
        </div>
        <div class="py-4 text-center">
          <Button v-if="(currentQuestionIndex+1) > 1" @click="currentQuestionIndex--">Previous</Button>
          <Button v-if="((currentQuestionIndex + 1) > 0) && ((currentQuestionIndex + 1) < questions.length)" @click="currentQuestionIndex++" class="ml-2">Next</Button>
        </div>
        <div  class="text-center mt-6">
          <Button
            @click="finishQuiz"
            class="text-2xl"
            raised
            text
            label="Finish!"
          ></Button>
        </div>
      </div>
  
      <div v-if="quizStore.quizStatus === 'FINISHED'" class="text-center">
        <h2>Quiz Completed!</h2>
        <p>Your Score: {{ score }} / {{ questions.length }}</p>
        <Button
          @click="backToQuizSelection"
          class="text-2xl"
          raised
          text
          label="Back to Quiz Selection"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import ViewQuestion from "./ViewQuestion.vue";
import { useQuiz } from "@/store/modules/quiz";
import { useAuth } from "@/store/modules/auth";
import apiRoutes from "../composables/useApiRoutes";
import { useToast } from "primevue/usetoast";

const toast = useToast()
const quizStore = useQuiz();
const authStore = useAuth();
const questions = quizStore.selectedQuiz.questions;
const answers = ref([]);

const currentQuestionIndex = ref(0);
const score = ref(0);
const timerCount = ref(60);

const handleAnswer = (isCorrect) => {
  if (isCorrect) {
    score.value++;
  }

  /* if (currentQuestionIndex.value < questions.length - 1) {
    currentQuestionIndex.value++;
  } */
};

const finishQuiz = () => {
  storeResults()
  quizStore.setQuizStatus("FINISHED");
};
const storeResults = async () => {
  try {
    const res = await apiRoutes.quiz.createResult({
      score: score.value,
      time_taken : String(60 - (timerCount.value ?? 0)),
      quiz_id: quizStore.selectedQuiz?.id,
      user_id: authStore.user?.id
    })
    show('info', 'Results Saved!', 'Your result has been saved successfully')
  } catch (err) {
    show('error', 'Error!', err)
  }
}
const show = (type = 'info', title = 'Alert', message = '') => {
  toast.add({ severity: type, summary: title, detail: message, life: 3000 });
};
const backToQuizSelection = () => {
  quizStore.setQuizStatus("NOT_STARTED");
};
async function minusOne() {
  timerCount.value--
  // await nextTick()
  if (quizStore.quizStatus === 'FINISHED') {
    return
  }
  if(timerCount.value > 1) {
    setTimeout(() => {
      minusOne()
    }, 1000);
  } else {
    finishQuiz()
    timerCount.value = 0
    setTimeout(() => {
      alert('Time Up!!')
    }, 200);
  }
}
onMounted(() => {
  minusOne()
})
/* watch(timerCount, ) {
  if(timerCount.value < 1) {
    finishQuiz()
  }
} */
</script>
