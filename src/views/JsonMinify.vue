<script setup lang="ts">
import { ref, computed } from 'vue'
import MonacoEditor from '../components/MonacoEditor.vue'
import { Copy, Trash2 } from 'lucide-vue-next'

const input = ref('')
const output = ref('')
const error = ref('')

const stats = computed(() => {
  if (!input.value || !output.value) return null
  const saved = input.value.length - output.value.length
  const pct = ((saved / input.value.length) * 100).toFixed(1)
  return { original: input.value.length, minified: output.value.length, saved, pct }
})

function minify() {
  error.value = ''
  if (!input.value.trim()) { output.value = ''; return }
  try {
    output.value = JSON.stringify(JSON.parse(input.value))
  } catch (e: any) {
    error.value = e.message
    output.value = ''
  }
}

function copy() { navigator.clipboard.writeText(output.value) }
function clear() { input.value = ''; output.value = ''; error.value = '' }
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>JSON Minifier / Compressor</h1>
      <p>Remove all whitespace and compress JSON to minimize file size.</p>
    </div>
    <div class="toolbar">
      <button class="btn btn-primary" @click="minify">Minify JSON</button>
      <button class="btn-icon" @click="copy" title="Copy"><Copy :size="16" /></button>
      <button class="btn-icon" @click="clear" title="Clear"><Trash2 :size="16" /></button>
    </div>
    <div v-if="stats" class="stats">
      <span>Original: {{ stats.original }} chars</span>
      <span>Minified: {{ stats.minified }} chars</span>
      <span class="saved">Saved: {{ stats.saved }} chars ({{ stats.pct }}%)</span>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="editors">
      <div class="editor-panel">
        <label>Input (formatted)</label>
        <MonacoEditor v-model="input" language="json" />
      </div>
      <div class="editor-panel">
        <label>Output (minified)</label>
        <MonacoEditor v-model="output" language="json" :read-only="true" />
      </div>
    </div>
    <section class="seo-content">
      <h2>Why Minify JSON?</h2>
      <p>Minifying JSON removes unnecessary whitespace, reducing file size for faster network transfers. This is essential for API responses, configuration files, and data storage optimization.</p>
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
.stats { display: flex; gap: 1.5rem; padding: 0.75rem 1rem; background: #161b22; border-radius: 6px; border: 1px solid #30363d; font-size: 0.85rem; color: #8b949e; }
.saved { color: #3fb950; }
.error { padding: 0.75rem; background: #3d1f1f; border: 1px solid #f85149; border-radius: 6px; color: #f85149; font-size: 0.85rem; }
.editors { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.editor-panel { display: flex; flex-direction: column; gap: 0.5rem; }
.editor-panel label { font-size: 0.8rem; color: #8b949e; text-transform: uppercase; letter-spacing: 0.05em; }
.seo-content { margin-top: 2rem; padding: 1.5rem; background: #161b22; border-radius: 8px; border: 1px solid #30363d; }
.seo-content h2 { font-size: 1.1rem; margin-bottom: 0.5rem; color: #e1e4e8; }
.seo-content p { color: #8b949e; line-height: 1.6; }
@media (max-width: 768px) { .editors { grid-template-columns: 1fr; } }
</style>
