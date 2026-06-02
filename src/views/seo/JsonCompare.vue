<script setup lang="ts">
import { ref } from 'vue'
import { diff as jsonDiff } from 'json-diff'
import MonacoEditor from '../../components/MonacoEditor.vue'
import { Trash2 } from 'lucide-vue-next'

const left = ref('')
const right = ref('')
const output = ref('')
const error = ref('')

function compare() {
  error.value = ''
  if (!left.value.trim() || !right.value.trim()) { output.value = ''; return }
  try {
    const a = JSON.parse(left.value), b = JSON.parse(right.value)
    const result = jsonDiff(a, b)
    output.value = result ? JSON.stringify(result, null, 2) : 'No differences found — objects are identical.'
  } catch (e: any) { error.value = e.message; output.value = '' }
}
function clear() { left.value = ''; right.value = ''; output.value = ''; error.value = '' }
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>JSON Compare — Diff Two JSON Objects Online</h1>
      <p>Find differences between two JSON documents. See added, removed, and changed values at a glance.</p>
    </div>
    <div class="toolbar">
      <button class="btn btn-primary" @click="compare">Compare JSON</button>
      <button class="btn-icon" @click="clear" title="Clear"><Trash2 :size="16" /></button>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="editors triple">
      <div class="editor-panel"><label>Left (Original)</label><MonacoEditor v-model="left" language="json" /></div>
      <div class="editor-panel"><label>Right (Modified)</label><MonacoEditor v-model="right" language="json" /></div>
    </div>
    <div v-if="output" class="diff-output">
      <label>Differences</label>
      <pre>{{ output }}</pre>
    </div>
    <section class="seo-content">
      <h2>Why Compare JSON?</h2>
      <p>JSON diff helps developers spot unintended changes in API responses, configuration files, or data exports. Instead of scanning thousands of lines manually, this tool highlights exactly what was added, removed, or modified between two JSON documents.</p>
      <h2>Use Cases</h2>
      <ul>
        <li>Verify API response changes between versions</li>
        <li>Debug configuration drift across environments</li>
        <li>Review data migration results by comparing before/after snapshots</li>
        <li>Validate test fixtures haven't changed unexpectedly</li>
      </ul>
      <h2>How Differences Are Shown</h2>
      <p>Keys suffixed with <code>__added</code> are new in the right document. Keys with <code>__deleted</code> were removed. Changed values show both old and new values. If no differences exist, you'll see a confirmation message.</p>
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
.editors.triple { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.editor-panel { display: flex; flex-direction: column; gap: 0.5rem; }
.editor-panel label { font-size: 0.8rem; color: #8b949e; text-transform: uppercase; letter-spacing: 0.05em; }
.diff-output { margin-top: 1rem; }
.diff-output label { font-size: 0.8rem; color: #8b949e; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.5rem; }
.diff-output pre { background: #161b22; border: 1px solid #30363d; border-radius: 6px; padding: 1rem; color: #e1e4e8; font-size: 0.85rem; overflow-x: auto; white-space: pre-wrap; }
.seo-content { margin-top: 2rem; padding: 1.5rem; background: #161b22; border-radius: 8px; border: 1px solid #30363d; }
.seo-content h2 { font-size: 1.1rem; margin-bottom: 0.5rem; color: #e1e4e8; }
.seo-content p, .seo-content li { color: #8b949e; line-height: 1.6; }
.seo-content ul { padding-left: 1.5rem; margin-top: 0.5rem; }
@media (max-width: 768px) { .editors.triple { grid-template-columns: 1fr; } }
</style>
