<script setup lang="ts">
import { ref } from 'vue'
import MonacoEditor from '../../components/MonacoEditor.vue'
import { Trash2 } from 'lucide-vue-next'

const input = ref('')
const result = ref<{ valid: boolean; message: string } | null>(null)

function validate() {
  if (!input.value.trim()) { result.value = null; return }
  try { JSON.parse(input.value); result.value = { valid: true, message: 'Valid JSON ✓' } }
  catch (e: any) { result.value = { valid: false, message: e.message } }
}
function clear() { input.value = ''; result.value = null }
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>JSON Validator — Check JSON Syntax Online</h1>
      <p>Validate your JSON instantly. Get clear error messages with exact position when syntax is invalid.</p>
    </div>
    <div class="toolbar">
      <button class="btn btn-primary" @click="validate">Validate JSON</button>
      <button class="btn-icon" @click="clear" title="Clear"><Trash2 :size="16" /></button>
    </div>
    <div v-if="result" :class="['result', result.valid ? 'valid' : 'invalid']">{{ result.message }}</div>
    <div class="editor-full"><MonacoEditor v-model="input" language="json" /></div>
    <section class="seo-content">
      <h2>Why Validate JSON?</h2>
      <p>Invalid JSON causes API failures, broken configs, and silent data loss. A missing comma, unquoted key, or trailing comma can break an entire application. This validator parses your JSON and pinpoints the exact error location.</p>
      <h2>Common JSON Errors</h2>
      <ul>
        <li>Trailing commas after the last element in arrays or objects</li>
        <li>Single quotes instead of double quotes around strings</li>
        <li>Unescaped special characters in string values</li>
        <li>Comments (JSON does not support // or /* */ comments)</li>
        <li>Missing colons between keys and values</li>
      </ul>
      <h2>How to Use</h2>
      <p>Paste your JSON into the editor and click <strong>Validate JSON</strong>. Valid JSON shows a green confirmation; invalid JSON shows the error message with the character position where parsing failed.</p>
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
.result { padding: 0.75rem; border-radius: 6px; font-size: 0.85rem; }
.result.valid { background: #1f3d2a; border: 1px solid #238636; color: #3fb950; }
.result.invalid { background: #3d1f1f; border: 1px solid #f85149; color: #f85149; }
.editor-full { height: 350px; }
.seo-content { margin-top: 2rem; padding: 1.5rem; background: #161b22; border-radius: 8px; border: 1px solid #30363d; }
.seo-content h2 { font-size: 1.1rem; margin-bottom: 0.5rem; color: #e1e4e8; }
.seo-content p, .seo-content li { color: #8b949e; line-height: 1.6; }
.seo-content ul { padding-left: 1.5rem; margin-top: 0.5rem; }
</style>
