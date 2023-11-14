<template>
    <div class="w-full margin-auto">
        <form class="w-full" @submit.prevent="createQuiz">
            <div class="flex flex-column gap-4 w-max">
                <div :class="inputGroupClass">
                    <!-- <label for="title">Title</label> -->
                    <InputText type="text" id="title" v-model="question.title" placeholder="Title" />
                </div>
                <div :class="inputGroupClass">
                    <!-- <label for="description">Description</label> -->
                    <InputText type="text" id="description" v-model="question.description" placeholder="Description" />
                </div>
                <div :class="inputGroupClass">
                    <!-- <label for="description">Option 1</label> -->
                    <InputText type="text" id="description" v-model="options[0]" placeholder="Option 1" />
                </div>
                <div :class="inputGroupClass">
                    <!-- <label for="description">Option 2</label> -->
                    <InputText type="text" id="description" v-model="options[1]" placeholder="Option 2" />
                </div>
                <div :class="inputGroupClass">
                    <!-- <label for="description">Option 3</label> -->
                    <InputText type="text" id="description" v-model="options[2]" placeholder="Option 3" />
                </div>
                <div :class="inputGroupClass">
                        <!-- <label for="description">Option 4</label> -->
                        <InputText type="text" id="description" v-model="options[3]" placeholder="Option 4" />
                    </div>
                <Button type="submit" label="Submit" />
            </div>
        </form>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue"
import { useQuiz } from "@/store/modules/quiz";
import { useAuth } from "@/store/modules/auth";
import apiRoutes from "../composables/useApiRoutes";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const inputGroupClass = ref("flex flex-column gap-2")

const authStore = useAuth();

const props = defineProps({
    quiz: {
        type: Object,
        required: true,
    },
    question: {
        type: Object,
        default: {},
    },
})

const questionData = reactive({
    id: props.quiz?.id ?? null,
    question_text: props.quiz?.question_text ?? null,
    correct_answer: props.quiz?.correct_answer ?? null,
    quiz_id: props.quiz?.id ?? null,
})

const options = ref([])
const createQuiz = async () => {
    try {
        if (quizData.id) {
            const res = await apiRoutes.question.updateQuestion(questionData.id, {
                ...quizData,
                quiz_id: props.quiz?.id,
                options: options.value.join(","),
            })
            show('success', 'Quiz Updated', 'Quiz updated successfully')
        } else {
            const res = await apiRoutes.question.createQuestion({
                ...quizData,
                owner_id: authStore.user?.id,
            })
            show('success', 'New Quiz', 'Quiz added successfully')
        }
    } catch (err) {
        show(err)
    }
}
const show = (type = 'info', title = 'Alert', message = '') => {
    toast.add({ severity: type, summary: title, detail: message, life: 3000 });
};

onMounted(() => {
    options.value = props.question?.options?.split(',')
})

</script>

<style></style>