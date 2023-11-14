<template>
  <div class="p-2 sm:p-4 mx-auto border-round">
    <form class="w-full" @submit.prevent="createQuiz">
        <div class="flex flex-column gap-4 w-max">
            <div :class="inputGroupClass">
                <!-- <label for="title">Title</label> -->
                <InputText type="text" id="title" v-model="quizData.title" placeholder="Title" />
            </div>
            <div :class="inputGroupClass">
                <!-- <label for="description">Description</label> -->
                <InputText type="text" id="description" v-model="quizData.description" placeholder="Description" />
            </div>
            <div :class="inputGroupClass">
                <!-- <label for="difficulty">Difficulty</label> -->
                <Dropdown :options="difficulties" id="difficulty" v-model="quizData.difficulty" placeholder="Select a difficulty" />
            </div>
            <div :class="inputGroupClass">
                <!-- <label for="category">Category</label> -->
                <Dropdown :options="categories" optionLabel="name" optionValue="id" id="category" v-model="quizData.category_id" placeholder="Select a category" />
            </div>
            <Button type="submit" label="Submit" />
        </div>
    </form>
    <div v-if="quiz?.id && authStore.user" class="py-6" >
        <div>
            <Button @click="newQuestion">Add Question</Button>
        </div>
        <div class="py-4 flex flex-wrap gap-2">
            <div class="p-4 bg-gray-500 bg-opacity-10" v-for="(question, index) in questions" :key="index">
                <AddQuestion :quiz="quiz" :question="question"/>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import AddQuestion from "./AddQuestion.vue";
import { computed, nextTick, onMounted, reactive, ref } from "vue"
import { useQuiz } from "@/store/modules/quiz";
import { useAuth } from "@/store/modules/auth";
import apiRoutes from "../composables/useApiRoutes";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const inputGroupClass = ref("flex flex-column gap-2")

const quizStore = useQuiz();
const authStore = useAuth();


const props = defineProps({
    id : {
        required: false
    }
})

const quiz = ref()

const questions = ref(quiz.value?.questions ?? []);

const quizData = reactive({
    title: null,
    description: null,
    difficulty: null,
    category_id: null,
})

const categories = computed(() => {
    return quizStore.categories ?? []
})
const difficulties = computed(() => {
    return quizStore.difficultyLevels ?? []
})
const newQuestion = () => {
    questions.value.push({});
};
const getQuiz = async () => {
    if (props.id) {
        try {
            const res = await apiRoutes.quiz.getQuiz(props.id)
            let resdata = res?.data?.value ?? []
            quiz.value = resdata
    
            // await nextTick()
            setTimeout(() => {
                setData(resdata)
            }, 200);
        } catch (err) {
            show(err)
        }

    }
}
const setData = (data) => {
    console.log(data);
    quizData.title = data?.title ?? null;
    quizData.description = data?.description ?? null;
    quizData.difficulty = data?.difficulty ?? null;
    quizData.category_id = data?.category?.id ?? null;

    questions.value = data?.questions ?? []
}
const createQuiz = async () => {
    try {
        if(props.id) {
            const res = await apiRoutes.quiz.updateQuiz(Number(props.id), {
                ...quizData,
                owner_id: authStore.user?.id,
            })
            show('success', 'Quiz Updated', 'Quiz updated successfully')
        } else {
            const res = await apiRoutes.quiz.createQuiz({
                ...quizData,
                owner_id: authStore.user?.id,
            })
            show('success', 'New Quiz', 'Quiz added successfully')
        }
    } catch(err) {
        show(err)
    }
}
const show = (type = 'info', title = 'Alert', message = '') => {
    toast.add({ severity: type, summary: title, detail: message, life: 3000 });
};

onMounted(() => {
    getQuiz()
})

</script>

<style>

</style>