<script setup lang="ts">
import { ref } from 'vue'
import MonacoEditor from '../../components/MonacoEditor.vue'
import { Copy, Download, Trash2 } from 'lucide-vue-next'

const input = ref('')
const output = ref('')
const error = ref('')

function convert() {
  error.value = ''
  if (!input.value.trim()) { output.value = ''; return }
  try {
    const data = JSON.parse(input.value)
    const arr = Array.isArray(data) ? data : [data]
    if (!arr.length) { output.value = ''; return }
    const keys = [...new Set(arr.flatMap(Object.keys))]
    const escape = (v: any) => { const s = String(v ?? ''); return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s }
    output.value = [keys.join(','), ...arr.map(row => keys.map(k => escape(row[k])).join(','))].join('\n')
  } catch (e: any) { error.value = e.message; output.value = '' }
}
function copy() { navigator.clipboard.writeText(output.value) }
function download() {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([output.value], { type: 'text/csv' }))
  a.download = 'data.csv'; a.click()
}
function clear() { input.value = ''; output.value = ''; error.value = '' }
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>JSON to CSV Converter — Export JSON as CSV Online</h1>
      <p>Convert JSON arrays or objects to CSV format. Download as .csv file or copy to clipboard.</p>
    </div>
    <div class="toolbar">
      <button class="btn btn-primary" @click="convert">Convert to CSV</button>
      <div class="toolbar-right">
        <button class="btn-icon" @click="copy" title="Copy"><Copy :size="16" /></button>
        <button class="btn-icon" @click="download" title="Download CSV"><Download :size="16" /></button>
        <button class="btn-icon" @click="clear" title="Clear"><Trash2 :size="16" /></button>
      </div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="editors">
      <div class="editor-panel"><label>JSON Input</label><MonacoEditor v-model="input" language="json" /></div>
      <div class="editor-panel"><label>CSV Output</label><MonacoEditor v-model="output" language="plaintext" :read-only="true" /></div>
    </div>
    <section class="seo-content">
      <h2>How JSON to CSV Conversion Works</h2>
      <p>This tool flattens JSON arrays of objects into comma-separated values. Each object key becomes a column header, and each array element becomes a row. Values containing commas or quotes are properly escaped per RFC 4180.</p>
      <h2>Use Cases</h2>
      <ul>
        <li>Export API response data to spreadsheet software (Excel, Google Sheets)</li>
        <li>Convert database JSON exports to tabular format for analysis</li>
        <li>Prepare JSON datasets for CSV-based import tools</li>
        <li>Quick data inspection without writing conversion scripts</li>
      </ul>
      <h2>Supported Input Formats</h2>
      <p>Pass a JSON array of objects like <code>[{"name":"Alice","age":30},{"name":"Bob","age":25}]</code>, or a single object (treated as a one-row table). Nested objects are serialized as strings in the output.</p>
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
