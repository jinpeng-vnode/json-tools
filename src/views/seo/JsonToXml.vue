<script setup lang="ts">
import { ref } from 'vue'
import { XMLBuilder } from 'fast-xml-parser'
import MonacoEditor from '../../components/MonacoEditor.vue'
import { Copy, Download, Trash2 } from 'lucide-vue-next'

const input = ref('')
const output = ref('')
const error = ref('')

function convert() {
  error.value = ''
  if (!input.value.trim()) { output.value = ''; return }
  try {
    const parsed = JSON.parse(input.value)
    const builder = new XMLBuilder({ indentBy: '  ', format: true })
    output.value = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n' + builder.build(parsed) + '</root>'
  } catch (e: any) { error.value = e.message; output.value = '' }
}
function copy() { navigator.clipboard.writeText(output.value) }
function download() {
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([output.value], { type: 'application/xml' }))
  a.download = 'data.xml'; a.click()
}
function clear() { input.value = ''; output.value = ''; error.value = '' }
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>JSON to XML Converter — Convert JSON to XML Online</h1>
      <p>Transform JSON data into well-formed XML. Useful for legacy system integration, SOAP APIs, and data exchange.</p>
    </div>
    <div class="toolbar">
      <button class="btn btn-primary" @click="convert">Convert to XML</button>
      <div class="toolbar-right">
        <button class="btn-icon" @click="copy" title="Copy"><Copy :size="16" /></button>
        <button class="btn-icon" @click="download" title="Download XML"><Download :size="16" /></button>
        <button class="btn-icon" @click="clear" title="Clear"><Trash2 :size="16" /></button>
      </div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="editors">
      <div class="editor-panel"><label>JSON Input</label><MonacoEditor v-model="input" language="json" /></div>
      <div class="editor-panel"><label>XML Output</label><MonacoEditor v-model="output" language="xml" :read-only="true" /></div>
    </div>
    <section class="seo-content">
      <h2>When to Convert JSON to XML</h2>
      <p>While JSON dominates modern APIs, many enterprise systems, SOAP services, and legacy platforms still require XML. This converter bridges the gap — paste your JSON and get standards-compliant XML output instantly.</p>
      <h2>Conversion Rules</h2>
      <ul>
        <li>Object keys become XML element names</li>
        <li>Arrays generate repeated elements with the same tag</li>
        <li>Primitive values become text content of their parent element</li>
        <li>Output is wrapped in a &lt;root&gt; element for well-formedness</li>
      </ul>
      <h2>Features</h2>
      <ul>
        <li>Formatted output with proper indentation</li>
        <li>XML declaration header included</li>
        <li>Download as .xml file or copy to clipboard</li>
        <li>Handles deeply nested JSON structures</li>
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
