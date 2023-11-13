<template>
  <div class="w-full margin-auto">
    <form @submit.prevent="createQuiz">
        <div class="flex flex-column gap-4 w-max">
            <div :class="inputGroupClass">
                <label for="title">Title</label>
                <InputText type="text" id="title" v-model="quiz.title" placeholder="Title" />
            </div>
            <div :class="inputGroupClass">
                <label for="description">Description</label>
                <InputText type="text" id="description" v-model="quiz.description" placeholder="Description" />
            </div>
            <div :class="inputGroupClass">
                <label for="difficulty">Difficulty</label>
                <Dropdown :options="difficulties" id="difficulty" v-model="quiz.difficulty" placeholder="Select a difficulty" />
            </div>
            <div :class="inputGroupClass">
                <label for="category">Category</label>
                <Dropdown :options="categories" optionLabel="name" optionValue="id" id="category" v-model="quiz.category_id" placeholder="Select a category" />
            </div>
            <Button type="submit" label="Submit" />
        </div>
    </form>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue"
import { useQuiz } from "@/store/modules/quiz";
import apiRoutes from "../composables/useApiRoutes";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const inputGroupClass = ref("flex flex-column gap-2")

const quizStore = useQuiz();
const categories = computed(() => {
    return quizStore.categories ?? []
})
const difficulties = computed(() => {
    return quizStore.difficultyLevels ?? []
})
const quiz = reactive({
    title: null,
    description: null,
    difficulty: null,
    category_id: null,
    owner_id: 1,
})
const createQuiz = async () => {
    try {
        const res = await apiRoutes.quiz.createQuiz(quiz)
    } catch(err) {
        show(err)
    }
}
const show = (type = 'info', title = 'Alert', message = '') => {
    toast.add({ severity: type, summary: title, detail: message, life: 3000 });
};

</script>

<style>

</style>