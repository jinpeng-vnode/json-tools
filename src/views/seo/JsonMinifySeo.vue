<script setup lang="ts">
import { ref, computed } from 'vue'
import MonacoEditor from '../../components/MonacoEditor.vue'
import { Copy, Trash2 } from 'lucide-vue-next'

const input = ref('')
const output = ref('')
const error = ref('')

const savings = computed(() => {
  if (!input.value || !output.value) return null
  const saved = input.value.length - output.value.length
  const pct = ((saved / input.value.length) * 100).toFixed(1)
  return `${saved} chars saved (${pct}%)`
})

function minify() {
  error.value = ''
  if (!input.value.trim()) { output.value = ''; return }
  try { output.value = JSON.stringify(JSON.parse(input.value)) }
  catch (e: any) { error.value = e.message; output.value = '' }
}
function copy() { navigator.clipboard.writeText(output.value) }
function clear() { input.value = ''; output.value = ''; error.value = '' }
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>JSON Minifier — Compress JSON Online</h1>
      <p>Remove all whitespace from JSON to minimize file size. Ideal for production configs, API payloads, and storage optimization.</p>
    </div>
    <div class="toolbar">
      <button class="btn btn-primary" @click="minify">Minify JSON</button>
      <span v-if="savings" class="savings">{{ savings }}</span>
      <div class="toolbar-right">
        <button class="btn-icon" @click="copy" title="Copy"><Copy :size="16" /></button>
        <button class="btn-icon" @click="clear" title="Clear"><Trash2 :size="16" /></button>
      </div>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="editors">
      <div class="editor-panel"><label>Input (Formatted)</label><MonacoEditor v-model="input" language="json" /></div>
      <div class="editor-panel"><label>Output (Minified)</label><MonacoEditor v-model="output" language="json" :read-only="true" /></div>
    </div>
    <section class="seo-content">
      <h2>What is JSON Minification?</h2>
      <p>JSON minification strips all unnecessary whitespace — spaces, tabs, and newlines — producing the most compact valid representation. The data remains identical; only formatting is removed.</p>
      <h2>Benefits of Minifying JSON</h2>
      <ul>
        <li>Reduce HTTP payload size for faster API responses</li>
        <li>Lower storage costs for JSON-based databases and caches</li>
        <li>Speed up JSON parsing in performance-critical applications</li>
        <li>Prepare data for URL parameters or embedded configurations</li>
      </ul>
      <h2>How It Works</h2>
      <p>The tool parses your JSON to validate it, then re-serializes without any formatting characters. Invalid JSON is rejected with a clear error message. The savings counter shows exactly how many bytes you saved.</p>
    </section>
  </div>
</template>

<style scoped>
.page { display: flex; flex-direction: column; gap: 1rem; }
.page-header h1 { font-size: 1.5rem; color: #e1e4e8; }
.page-header p { color: #8b949e; margin-top: 0.25rem; }
.toolbar { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.toolbar-right { margin-left: auto; display: flex; gap: 0.25rem; }
.savings { color: #3fb950; font-size: 0.85rem; }
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
