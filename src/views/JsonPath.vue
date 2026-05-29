<script setup lang="ts">
import { ref } from 'vue'
import MonacoEditor from '../components/MonacoEditor.vue'
import { Trash2 } from 'lucide-vue-next'
import { JSONPath } from 'jsonpath-plus'

const input = ref('')
const path = ref('$.store.book[*].author')
const output = ref('')
const error = ref('')

function query() {
  error.value = ''
  if (!input.value.trim() || !path.value.trim()) { output.value = ''; return }
  try {
    const json = JSON.parse(input.value)
    const result = JSONPath({ path: path.value, json })
    output.value = JSON.stringify(result, null, 2)
  } catch (e: any) {
    error.value = e.message
    output.value = ''
  }
}

function clear() { input.value = ''; output.value = ''; error.value = '' }
function loadSample() {
  input.value = JSON.stringify({
    store: {
      book: [
        { category: "reference", author: "Nigel Rees", title: "Sayings of the Century", price: 8.95 },
        { category: "fiction", author: "Evelyn Waugh", title: "Sword of Honour", price: 12.99 },
        { category: "fiction", author: "Herman Melville", title: "Moby Dick", price: 8.99 },
      ],
      bicycle: { color: "red", price: 19.95 }
    }
  }, null, 2)
  query()
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>JSON Path Query</h1>
      <p>Extract data from JSON using JSONPath expressions.</p>
    </div>
    <div class="toolbar">
      <input v-model="path" class="path-input" placeholder="Enter JSONPath expression (e.g. $.store.book[*].author)" @keyup.enter="query" />
      <button class="btn btn-primary" @click="query">Query</button>
      <button class="btn" @click="loadSample">Load Sample</button>
      <button class="btn-icon" @click="clear" title="Clear"><Trash2 :size="16" /></button>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="editors">
      <div class="editor-panel">
        <label>JSON Input</label>
        <MonacoEditor v-model="input" language="json" />
      </div>
      <div class="editor-panel">
        <label>Query Result</label>
        <MonacoEditor v-model="output" language="json" :read-only="true" />
      </div>
    </div>
    <section class="seo-content">
      <h2>JSONPath Syntax Reference</h2>
      <ul>
        <li><code>$</code> — Root object</li>
        <li><code>.</code> — Child operator</li>
        <li><code>..</code> — Recursive descent</li>
        <li><code>[*]</code> — All array elements</li>
        <li><code>[0,1]</code> — Array indices</li>
        <li><code>[?(@.price&lt;10)]</code> — Filter expression</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 1rem; }
.page-header h1 { font-size: 1.5rem; color: #e1e4e8; }
.page-header p { color: #8b949e; margin-top: 0.25rem; }
.toolbar { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.path-input { flex: 1; min-width: 200px; padding: 0.5rem 0.75rem; border-radius: 6px; border: 1px solid #30363d; background: #0d1117; color: #e1e4e8; font-family: monospace; font-size: 0.85rem; }
.path-input:focus { outline: none; border-color: #58a6ff; }
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
.seo-content { margin-top: 2rem; padding: 1.5rem; background: #161b22; border-radius: 8px; border: 1px solid #30363d; }
.seo-content h2 { font-size: 1.1rem; margin-bottom: 0.5rem; color: #e1e4e8; }
.seo-content ul { padding-left: 1.5rem; }
.seo-content li { color: #8b949e; line-height: 1.8; }
.seo-content code { background: #21262d; padding: 0.15rem 0.4rem; border-radius: 3px; font-size: 0.85rem; color: #e1e4e8; }
@media (max-width: 768px) { .editors { grid-template-columns: 1fr; } }
</style>
