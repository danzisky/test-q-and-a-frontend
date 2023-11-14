<template>
  <div class="flex flex-col flex-column gap-2">
    <div v-for="(result, index) in results" :key="index">
        <div class="p-4 flex flex-column gap-1">
            <div class="flex gap-2">
                <Tag severity="warning" value="Warning">
                    <div>
                        Quiz: {{ result.quiz?.title }}
                    </div>
                </Tag>
                <Tag value="Primary">{{ result.quiz.questions?.length }} questions</Tag>
            </div>
            <div>
                Category: {{ result.quiz.category.name }} 
            </div>
            <div class="font-bold">
                Score: {{ result.score }}
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useAuth } from "@/store/modules/auth";
import { useQuiz } from "@/store/modules/quiz";
const authStore = useAuth();
const quizStore = useQuiz();
const results = computed(() => {
    return authStore.user?.results?.reverse()
})

</script>

<style>

</style>