<script setup lang="ts">
import { ref } from 'vue'
import MonacoEditor from '../components/MonacoEditor.vue'
import { CheckCircle, XCircle, Trash2 } from 'lucide-vue-next'

const input = ref('')
const result = ref<{ valid: boolean; message: string } | null>(null)

function validate() {
  if (!input.value.trim()) { result.value = null; return }
  try {
    JSON.parse(input.value)
    result.value = { valid: true, message: 'Valid JSON ✓' }
  } catch (e: any) {
    // 提取行号信息
    const match = e.message.match(/position (\d+)/)
    let detail = e.message
    if (match) {
      const pos = parseInt(match[1])
      const lines = input.value.substring(0, pos).split('\n')
      detail += ` (Line ${lines.length}, Column ${lines[lines.length - 1].length + 1})`
    }
    result.value = { valid: false, message: detail }
  }
}

function clear() { input.value = ''; result.value = null }
function loadInvalid() {
  input.value = '{\n  "name": "test",\n  "value": undefined,\n  "missing": \n}'
  validate()
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <h1>JSON Validator</h1>
      <p>Check if your JSON is valid. Get detailed error messages with line and column numbers.</p>
    </div>
    <div class="toolbar">
      <button class="btn btn-primary" @click="validate">Validate JSON</button>
      <button class="btn" @click="loadInvalid">Load Invalid Sample</button>
      <button class="btn-icon" @click="clear" title="Clear"><Trash2 :size="16" /></button>
    </div>
    <div v-if="result" :class="['result', result.valid ? 'result-valid' : 'result-invalid']">
      <CheckCircle v-if="result.valid" :size="20" />
      <XCircle v-else :size="20" />
      <span>{{ result.message }}</span>
    </div>
    <div class="editor-full">
      <MonacoEditor v-model="input" language="json" />
    </div>
    <section class="seo-content">
      <h2>Why Validate JSON?</h2>
      <p>JSON validation ensures your data conforms to the JSON specification (RFC 8259). Common errors include trailing commas, single quotes, unquoted keys, and undefined values. This validator provides precise error locations to help you fix issues quickly.</p>
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
.result { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1rem; border-radius: 6px; font-size: 0.9rem; }
.result-valid { background: #1b3d2f; border: 1px solid #238636; color: #3fb950; }
.result-invalid { background: #3d1f1f; border: 1px solid #f85149; color: #f85149; }
.editor-full { height: 500px; }
.seo-content { margin-top: 2rem; padding: 1.5rem; background: #161b22; border-radius: 8px; border: 1px solid #30363d; }
.seo-content h2 { font-size: 1.1rem; margin-bottom: 0.5rem; color: #e1e4e8; }
.seo-content p { color: #8b949e; line-height: 1.6; }
</style>
