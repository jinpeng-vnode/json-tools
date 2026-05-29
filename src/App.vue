<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Braces, CheckCircle, Minimize2, ArrowRightLeft, GitCompare, Search } from 'lucide-vue-next'

const nav = [
  { to: '/', label: 'Formatter', icon: Braces },
  { to: '/validator', label: 'Validator', icon: CheckCircle },
  { to: '/minify', label: 'Minify', icon: Minimize2 },
  { to: '/converter', label: 'Converter', icon: ArrowRightLeft },
  { to: '/diff', label: 'Diff', icon: GitCompare },
  { to: '/path', label: 'JSONPath', icon: Search },
]
</script>

<template>
  <div class="app">
    <header class="header">
      <div class="header-inner">
        <RouterLink to="/" class="logo">
          <Braces :size="24" />
          <span>JSON Tools</span>
        </RouterLink>
        <nav class="nav">
          <RouterLink v-for="item in nav" :key="item.to" :to="item.to" class="nav-link">
            <component :is="item.icon" :size="16" />
            <span>{{ item.label }}</span>
          </RouterLink>
        </nav>
      </div>
    </header>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f1117; color: #e1e4e8; }
.app { min-height: 100vh; display: flex; flex-direction: column; }
.header { background: #161b22; border-bottom: 1px solid #30363d; position: sticky; top: 0; z-index: 100; }
.header-inner { max-width: 1400px; margin: 0 auto; padding: 0 1rem; height: 56px; display: flex; align-items: center; gap: 2rem; }
.logo { display: flex; align-items: center; gap: 0.5rem; color: #58a6ff; text-decoration: none; font-weight: 700; font-size: 1.1rem; }
.nav { display: flex; gap: 0.25rem; overflow-x: auto; }
.nav-link { display: flex; align-items: center; gap: 0.35rem; padding: 0.5rem 0.75rem; border-radius: 6px; text-decoration: none; color: #8b949e; font-size: 0.85rem; white-space: nowrap; transition: all 0.15s; }
.nav-link:hover { color: #e1e4e8; background: #21262d; }
.nav-link.router-link-exact-active { color: #58a6ff; background: #1c2128; }
.main { flex: 1; max-width: 1400px; width: 100%; margin: 0 auto; padding: 1.5rem 1rem; }
</style>
