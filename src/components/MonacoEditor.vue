<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as monaco from 'monaco-editor'

const props = withDefaults(defineProps<{
  modelValue?: string
  language?: string
  readOnly?: boolean
  placeholder?: string
}>(), { modelValue: '', language: 'json', readOnly: false, placeholder: '' })

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const container = ref<HTMLDivElement>()
let editor: monaco.editor.IStandaloneCodeEditor | null = null

onMounted(() => {
  if (!container.value) return
  editor = monaco.editor.create(container.value, {
    value: props.modelValue,
    language: props.language,
    theme: 'vs-dark',
    readOnly: props.readOnly,
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on',
  })
  editor.onDidChangeModelContent(() => {
    emit('update:modelValue', editor!.getValue())
  })
})

watch(() => props.modelValue, (val) => {
  if (editor && val !== editor.getValue()) {
    editor.setValue(val)
  }
})

watch(() => props.language, (lang) => {
  if (editor) {
    const model = editor.getModel()
    if (model) monaco.editor.setModelLanguage(model, lang)
  }
})

onBeforeUnmount(() => { editor?.dispose() })
</script>

<template>
  <div ref="container" class="editor-container"></div>
</template>

<style scoped>
.editor-container { width: 100%; height: 100%; min-height: 400px; border-radius: 8px; overflow: hidden; border: 1px solid #30363d; }
</style>
