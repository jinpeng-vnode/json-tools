import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'formatter', component: () => import('../views/JsonFormatter.vue'), meta: { title: 'JSON Formatter & Beautifier - Free Online Tool', description: 'Format, beautify and pretty-print JSON data online. Free JSON formatter with syntax highlighting and error detection.' } },
  { path: '/validator', name: 'validator', component: () => import('../views/JsonValidator.vue'), meta: { title: 'JSON Validator - Check JSON Syntax Online', description: 'Validate JSON syntax online. Get detailed error messages with line numbers for invalid JSON.' } },
  { path: '/minify', name: 'minify', component: () => import('../views/JsonMinify.vue'), meta: { title: 'JSON Minifier - Compress JSON Online', description: 'Minify and compress JSON data online. Remove whitespace and reduce file size.' } },
  { path: '/converter', name: 'converter', component: () => import('../views/JsonConverter.vue'), meta: { title: 'JSON Converter - Convert JSON to YAML, CSV, XML', description: 'Convert JSON to YAML, CSV, or XML format online. Free JSON conversion tool.' } },
  { path: '/diff', name: 'diff', component: () => import('../views/JsonDiff.vue'), meta: { title: 'JSON Diff - Compare JSON Objects Online', description: 'Compare two JSON objects and find differences. Visual JSON diff tool.' } },
  { path: '/path', name: 'jsonpath', component: () => import('../views/JsonPath.vue'), meta: { title: 'JSON Path Query - Extract Data from JSON', description: 'Query JSON data using JSONPath expressions. Test and debug JSONPath queries online.' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  document.title = (to.meta.title as string) || 'JSON Tools'
  const desc = document.querySelector('meta[name="description"]')
  if (desc) desc.setAttribute('content', (to.meta.description as string) || '')
})

export default router
