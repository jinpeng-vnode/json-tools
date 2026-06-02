import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'formatter', component: () => import('../views/JsonFormatter.vue'), meta: { title: 'JSON Formatter & Beautifier - Free Online Tool', description: 'Format, beautify and pretty-print JSON data online. Free JSON formatter with syntax highlighting and error detection.' } },
  { path: '/format', redirect: '/' },
  { path: '/validator', name: 'validator', component: () => import('../views/JsonValidator.vue'), meta: { title: 'JSON Validator - Check JSON Syntax Online', description: 'Validate JSON syntax online. Get detailed error messages with line numbers for invalid JSON.' } },
  { path: '/validate', redirect: '/validator' },
  { path: '/minify', name: 'minify', component: () => import('../views/JsonMinify.vue'), meta: { title: 'JSON Minifier - Compress JSON Online', description: 'Minify and compress JSON data online. Remove whitespace and reduce file size.' } },
  { path: '/converter', name: 'converter', component: () => import('../views/JsonConverter.vue'), meta: { title: 'JSON Converter - Convert JSON to YAML, CSV, XML', description: 'Convert JSON to YAML, CSV, or XML format online. Free JSON conversion tool.' } },
  { path: '/diff', name: 'diff', component: () => import('../views/JsonDiff.vue'), meta: { title: 'JSON Diff - Compare JSON Objects Online', description: 'Compare two JSON objects and find differences. Visual JSON diff tool.' } },
  { path: '/path', name: 'jsonpath', component: () => import('../views/JsonPath.vue'), meta: { title: 'JSON Path Query - Extract Data from JSON', description: 'Query JSON data using JSONPath expressions. Test and debug JSONPath queries online.' } },
  // SEO 落地页
  { path: '/json-formatter', redirect: '/' },
  { path: '/json-beautifier', name: 'seo-beautifier', component: () => import('../views/seo/JsonBeautifier.vue'), meta: { title: 'JSON Beautifier - Pretty Print JSON Online Free', description: 'Beautify and pretty-print JSON data online. Transform minified JSON into readable format with proper indentation.' } },
  { path: '/json-validator', name: 'seo-validator', component: () => import('../views/seo/JsonValidatorSeo.vue'), meta: { title: 'JSON Validator Online - Check & Verify JSON Syntax Free', description: 'Validate JSON syntax online for free. Instantly detect errors with exact position and clear error messages.' } },
  { path: '/json-to-csv', name: 'seo-json-to-csv', component: () => import('../views/seo/JsonToCsv.vue'), meta: { title: 'JSON to CSV Converter - Export JSON as CSV Online Free', description: 'Convert JSON to CSV format online. Export JSON arrays to comma-separated values for Excel and Google Sheets.' } },
  { path: '/json-to-yaml', name: 'seo-json-to-yaml', component: () => import('../views/seo/JsonToYaml.vue'), meta: { title: 'JSON to YAML Converter - Transform JSON to YAML Online', description: 'Convert JSON to YAML format online. Perfect for Kubernetes configs, Docker Compose, and CI/CD pipelines.' } },
  { path: '/json-to-xml', name: 'seo-json-to-xml', component: () => import('../views/seo/JsonToXml.vue'), meta: { title: 'JSON to XML Converter - Convert JSON to XML Online Free', description: 'Convert JSON data to well-formed XML online. Useful for SOAP APIs, legacy systems, and data exchange.' } },
  { path: '/json-minify', name: 'seo-minify', component: () => import('../views/seo/JsonMinifySeo.vue'), meta: { title: 'JSON Minify - Compress & Minify JSON Online Free', description: 'Minify JSON online by removing all whitespace. Reduce JSON file size for faster APIs and lower storage costs.' } },
  { path: '/json-compare', name: 'seo-compare', component: () => import('../views/seo/JsonCompare.vue'), meta: { title: 'JSON Compare - Diff Two JSON Files Online Free', description: 'Compare two JSON documents and find differences. See added, removed, and changed values instantly.' } },
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
