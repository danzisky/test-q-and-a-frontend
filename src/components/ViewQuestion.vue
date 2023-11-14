<template>
  <h2 class="text-center">{{ question.question_text }}</h2>
  <div
    v-for="(choice, index) in props.question.options.split(',')"
    :key="index"
    class="flex justify-content-center mt-3"
  >
    <RadioButton
      v-model="state.selectedChoice"
      :inputId="`rad-${index}`"
      name="dynamic"
      :value="choice"
    />
    <label :for="`rad-${index}`" class="ml-2 text-xl text-center">{{ choice }}</label>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
const emit = defineEmits(['answer','update:modelValue'])
const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  modelValue: {
    default: null,
  },
  choices: {
    type: String,
    required: true,
  },
  onAnswer: {
    type: Function,
    required: true,
  },
});

const state = reactive({
  selectedChoice: props?.modelValue ?? null,
});

watch(state, () => {
  emit('update:modelValue', state.selectedChoice)
  emit('answer', state.selectedChoice === props.question?.correct_answer)
})

</script>
