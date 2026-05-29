<script setup lang="ts">
import { ref } from 'vue'
import MonacoEditor from '../components/MonacoEditor.vue'
import { Trash2 } from 'lucide-vue-next'
import { diff } from 'json-diff'

const left = ref('')
const right = ref('')
const result = ref('')
const error = ref('')

function compare() {
  error.value = ''
  if (!left.value.trim() || !right.value.trim()) { result.value = ''; return }
  try {
    const a = JSON.parse(left.value)
    const b = JSON.parse(right.value)
    const d = diff(a, b)
    result.value = d ? JSON.stringify(d, null, 2) : 'No differences found. Objects are identical.'
  } catch (e: any) {
    error.value = e.message
    result.value = ''
  }
}

function clear() { left.value = ''; right.value = ''; result.value = ''; error.value = '' }
function loadSample() {
  left.value = '{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}'
  right.value = '{\n  "name": "John",\n  "age": 31,\n  "city": "Boston",\n  "email": "john@example.com"\n}'
  compare()
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>JSON Diff</h1>
      <p>Compare two JSON objects and visualize the differences.</p>
    </div>
    <div class="toolbar">
      <button class="btn btn-primary" @click="compare">Compare</button>
      <button class="btn" @click="loadSample">Load Sample</button>
      <button class="btn-icon" @click="clear" title="Clear"><Trash2 :size="16" /></button>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="editors">
      <div class="editor-panel">
        <label>Left (Original)</label>
        <MonacoEditor v-model="left" language="json" />
      </div>
      <div class="editor-panel">
        <label>Right (Modified)</label>
        <MonacoEditor v-model="right" language="json" />
      </div>
    </div>
    <div v-if="result" class="diff-result">
      <label>Diff Result</label>
      <pre>{{ result }}</pre>
    </div>
    <section class="seo-content">
      <h2>How JSON Diff Works</h2>
      <p>This tool performs a deep comparison of two JSON objects, identifying added, removed, and modified properties. Keys with <code>__added</code> suffix indicate new properties, <code>__deleted</code> indicates removed ones, and changed values show both old and new values.</p>
    </section>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 1rem; }
.page-header h1 { font-size: 1.5rem; color: #e1e4e8; }
.page-header p { color: #8b949e; margin-top: 0.25rem; }
.toolbar { display: flex; align-items: center; gap: 0.5rem; }
.btn { padding: 0.5rem 1rem; border-radius: 6px; border: 1px solid #30363d; background: #21262d; color: #e1e4e8; cursor: pointer; font-size: 0.85rem; }
.btn:hover { background: #30363d; }
.btn-primary { background: #238636; border-color: #2ea043; color: #fff; }
.btn-primary:hover { background: #2ea043; }
.btn-icon { padding: 0.5rem; border-radius: 6px; border: 1px solid #30363d; background: #21262d; color: #8b949e; cursor: pointer; display: flex; align-items: center; }
.btn-icon:hover { color: #e1e4e8; background: #30363d; }
.error { padding: 0.75rem; background: #3d1f1f; border: 1px solid #f85149; border-radius: 6px; color: #f85149; font-size: 0.85rem; }
.editors { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.editor-panel { display: flex; flex-direction: column; gap: 0.5rem; }
.editor-panel label { font-size: 0.8rem; color: #8b949e; text-transform: uppercase; letter-spacing: 0.05em; }
.diff-result { padding: 1rem; background: #161b22; border: 1px solid #30363d; border-radius: 8px; }
.diff-result label { font-size: 0.8rem; color: #8b949e; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.5rem; }
.diff-result pre { color: #e1e4e8; font-size: 0.85rem; white-space: pre-wrap; word-break: break-all; }
.seo-content { margin-top: 2rem; padding: 1.5rem; background: #161b22; border-radius: 8px; border: 1px solid #30363d; }
.seo-content h2 { font-size: 1.1rem; margin-bottom: 0.5rem; color: #e1e4e8; }
.seo-content p { color: #8b949e; line-height: 1.6; }
.seo-content code { background: #21262d; padding: 0.15rem 0.4rem; border-radius: 3px; font-size: 0.85rem; }
@media (max-width: 768px) { .editors { grid-template-columns: 1fr; } }
</style>
