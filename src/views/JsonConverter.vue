<script setup lang="ts">
import { ref, watch } from 'vue'
import MonacoEditor from '../components/MonacoEditor.vue'
import { Copy, Trash2 } from 'lucide-vue-next'
import yaml from 'js-yaml'
import { XMLBuilder } from 'fast-xml-parser'

const input = ref('')
const output = ref('')
const format = ref<'yaml' | 'csv' | 'xml'>('yaml')
const error = ref('')

const outputLang = ref('yaml')

watch(format, () => { if (input.value) convert() })

function convert() {
  error.value = ''
  if (!input.value.trim()) { output.value = ''; return }
  try {
    const parsed = JSON.parse(input.value)
    switch (format.value) {
      case 'yaml':
        outputLang.value = 'yaml'
        output.value = yaml.dump(parsed, { indent: 2 })
        break
      case 'csv':
        outputLang.value = 'plaintext'
        output.value = jsonToCsv(parsed)
        break
      case 'xml':
        outputLang.value = 'xml'
        const builder = new XMLBuilder({ format: true, indentBy: '  ' })
        output.value = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n' + builder.build(parsed) + '</root>'
        break
    }
  } catch (e: any) {
    error.value = e.message
    output.value = ''
  }
}

function jsonToCsv(data: any): string {
  const arr = Array.isArray(data) ? data : [data]
  if (arr.length === 0) return ''
  const headers = [...new Set(arr.flatMap(obj => Object.keys(obj)))]
  const rows = arr.map(obj => headers.map(h => {
    const val = obj[h]
    const str = val === null || val === undefined ? '' : String(val)
    return str.includes(',') || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str
  }).join(','))
  return [headers.join(','), ...rows].join('\n')
}

function copy() { navigator.clipboard.writeText(output.value) }
function clear() { input.value = ''; output.value = ''; error.value = '' }
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>JSON Converter</h1>
      <p>Convert JSON to YAML, CSV, or XML format instantly.</p>
    </div>
    <div class="toolbar">
      <button class="btn btn-primary" @click="convert">Convert</button>
      <select v-model="format" class="select">
        <option value="yaml">JSON → YAML</option>
        <option value="csv">JSON → CSV</option>
        <option value="xml">JSON → XML</option>
      </select>
      <button class="btn-icon" @click="copy" title="Copy"><Copy :size="16" /></button>
      <button class="btn-icon" @click="clear" title="Clear"><Trash2 :size="16" /></button>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="editors">
      <div class="editor-panel">
        <label>JSON Input</label>
        <MonacoEditor v-model="input" language="json" />
      </div>
      <div class="editor-panel">
        <label>{{ format.toUpperCase() }} Output</label>
        <MonacoEditor v-model="output" :language="outputLang" :read-only="true" />
      </div>
    </div>
    <section class="seo-content">
      <h2>JSON Conversion Formats</h2>
      <p><strong>YAML</strong>: Human-readable data serialization format, popular for configuration files. <strong>CSV</strong>: Tabular format for spreadsheets and databases. <strong>XML</strong>: Markup language for structured data exchange.</p>
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
.select { padding: 0.5rem; border-radius: 6px; border: 1px solid #30363d; background: #21262d; color: #e1e4e8; font-size: 0.85rem; }
.error { padding: 0.75rem; background: #3d1f1f; border: 1px solid #f85149; border-radius: 6px; color: #f85149; font-size: 0.85rem; }
.editors { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.editor-panel { display: flex; flex-direction: column; gap: 0.5rem; }
.editor-panel label { font-size: 0.8rem; color: #8b949e; text-transform: uppercase; letter-spacing: 0.05em; }
.seo-content { margin-top: 2rem; padding: 1.5rem; background: #161b22; border-radius: 8px; border: 1px solid #30363d; }
.seo-content h2 { font-size: 1.1rem; margin-bottom: 0.5rem; color: #e1e4e8; }
.seo-content p { color: #8b949e; line-height: 1.6; }
@media (max-width: 768px) { .editors { grid-template-columns: 1fr; } }
</style>
