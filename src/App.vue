<script setup>
import '@/styles/app.scss'
import '@/styles/_custom_variables.scss'

import { RouterView } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

</script>

<template>
  <default-layout>
    <RouterView />
  </default-layout>

</template>

<style>
</style>
