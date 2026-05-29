<script setup lang="ts">
import { ref } from 'vue'
import MonacoEditor from '../components/MonacoEditor.vue'
import { Copy, Download, Trash2 } from 'lucide-vue-next'

const input = ref('')
const output = ref('')
const indent = ref(2)
const error = ref('')

function format() {
  error.value = ''
  if (!input.value.trim()) { output.value = ''; return }
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed, null, indent.value)
  } catch (e: any) {
    error.value = e.message
    output.value = ''
  }
}

function copy() { navigator.clipboard.writeText(output.value) }
function download() {
  const blob = new Blob([output.value], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'formatted.json'
  a.click()
}
function clear() { input.value = ''; output.value = ''; error.value = '' }
function loadSample() {
  input.value = '{"name":"JSON Tools","version":"1.0","features":["format","validate","minify","convert","diff","path"],"nested":{"key":"value","array":[1,2,3]}}'
  format()
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>JSON Formatter & Beautifier</h1>
      <p>Paste your JSON data and format it with proper indentation and syntax highlighting.</p>
    </div>
    <div class="toolbar">
      <button class="btn btn-primary" @click="format">Format JSON</button>
      <button class="btn" @click="loadSample">Load Sample</button>
      <select v-model="indent" class="select">
        <option :value="2">2 Spaces</option>
        <option :value="4">4 Spaces</option>
        <option :value="1">1 Tab</option>
      </select>
      <div class="toolbar-right">
        <button class="btn-icon" @click="copy" title="Copy"><Copy :size="16" /></button>
        <button class="btn-icon" @click="download" title="Download"><Download :size="16" /></button>
        <button class="btn-icon" @click="clear" title="Clear"><Trash2 :size="16" /></button>
      </div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="editors">
      <div class="editor-panel">
        <label>Input</label>
        <MonacoEditor v-model="input" language="json" />
      </div>
      <div class="editor-panel">
        <label>Output</label>
        <MonacoEditor v-model="output" language="json" :read-only="true" />
      </div>
    </div>
    <section class="seo-content">
      <h2>What is JSON Formatting?</h2>
      <p>JSON (JavaScript Object Notation) formatting transforms compact JSON data into a human-readable format with proper indentation and line breaks. This tool helps developers debug APIs, inspect data structures, and prepare JSON for documentation.</p>
      <h2>Features</h2>
      <ul>
        <li>Pretty-print JSON with customizable indentation (2 spaces, 4 spaces, or tabs)</li>
        <li>Syntax highlighting with Monaco Editor</li>
        <li>Real-time error detection and reporting</li>
        <li>Copy to clipboard and download formatted output</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 1rem; }
.page-header h1 { font-size: 1.5rem; color: #e1e4e8; }
.page-header p { color: #8b949e; margin-top: 0.25rem; }
.toolbar { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.toolbar-right { margin-left: auto; display: flex; gap: 0.25rem; }
.btn { padding: 0.5rem 1rem; border-radius: 6px; border: 1px solid #30363d; background: #21262d; color: #e1e4e8; cursor: pointer; font-size: 0.85rem; }
.btn:hover { background: #30363d; }
.btn-primary { background: #238636; border-color: #2ea043; color: #fff; }
.btn-primary:hover { background: #2ea043; }
.btn-icon { padding: 0.5rem; border-radius: 6px; border: 1px solid #30363d; background: #21262d; color: #8b949e; cursor: pointer; display: flex; align-items: center; }
.btn-icon:hover { color: #e1e4e8; background: #30363d; }
.select { padding: 0.5rem; border-radius: 6px; border: 1px solid #30363d; background: #21262d; color: #e1e4e8; font-size: 0.85rem; }
.error { padding: 0.75rem; background: #3d1f1f; border: 1px solid #f85149; border-radius: 6px; color: #f85149; font-size: 0.85rem; }
.editors { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.editor-panel { display: flex; flex-direction: column; gap: 0.5rem; }
.editor-panel label { font-size: 0.8rem; color: #8b949e; text-transform: uppercase; letter-spacing: 0.05em; }
.seo-content { margin-top: 2rem; padding: 1.5rem; background: #161b22; border-radius: 8px; border: 1px solid #30363d; }
.seo-content h2 { font-size: 1.1rem; margin-bottom: 0.5rem; color: #e1e4e8; }
.seo-content p, .seo-content li { color: #8b949e; line-height: 1.6; }
.seo-content ul { padding-left: 1.5rem; margin-top: 0.5rem; }
@media (max-width: 768px) { .editors { grid-template-columns: 1fr; } }
</style>
