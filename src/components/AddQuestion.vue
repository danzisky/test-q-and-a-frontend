<template>
    <div class="w-full margin-auto">
        <form class="w-full" @submit.prevent="createQuestion">
            <div class="grid grid-cols-2 gap-4">
                <div class="" :class="inputGroupClass">
                    <label for="title">Question</label>
                    <InputText type="text" id="title" v-model="questionData.question_text" placeholder="Question" />
                </div>
                <div :class="inputGroupClass">
                    <label for="answer">Correct Answer</label>
                    <InputText type="text" id="answer" v-model="questionData.correct_answer" placeholder="Correct Answer" />
                </div>
                <div :class="inputGroupClass">
                    <label for="option_1">Option 1</label>
                    <InputText type="text" id="option_1" v-model="options[0]" placeholder="Option 1" />
                </div>
                <div :class="inputGroupClass">
                    <label for="option_2">Option 2</label>
                    <InputText type="text" id="option_2" v-model="options[1]" placeholder="Option 2" />
                </div>
                <div :class="inputGroupClass">
                    <label for="option_3">Option 3</label>
                    <InputText type="text" id="option_3" v-model="options[2]" placeholder="Option 3" />
                </div>
                <div :class="inputGroupClass">
                    <label for="option_4">Option 4</label>
                    <InputText type="text" id="option_4" v-model="options[3]" placeholder="Option 4" />
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
    id: props.question?.id ?? null,
    question_text: props.question?.question_text ?? null,
    correct_answer: props.question?.correct_answer ?? null,
    quiz_id: props.question?.id ?? null,
})

const options = ref([null,null,null,null])
const createQuestion = async () => {
    try {
        if (questionData.id) {
            const res = await apiRoutes.quiz.updateQuestion(questionData.id, {
                question_text: questionData.question_text,
                correct_answer: questionData.correct_answer,
                quiz_id: props.quiz?.id,
                options: options.value?.join(","),
            })
            show('success', 'Quiz Updated', 'Quiz updated successfully')
        } else {
            const res = await apiRoutes.quiz.createQuestion({
                question_text: questionData.question_text,
                correct_answer: questionData.correct_answer,
                quiz_id: props.quiz?.id,
                options: options.value?.join(","),
            })
            show('success', 'New Quiz', 'Quiz added successfully')
        }
    } catch (err) {
        show('error', 'Error!', err)
    }
}
const show = (type = 'info', title = 'Alert', message = '') => {
    toast.add({ severity: type, summary: title, detail: message, life: 3000 });
};

onMounted(() => {
    options.value = props.question?.options?.split(',') ?? [null,null,null,null]
})

</script>

<style></style>