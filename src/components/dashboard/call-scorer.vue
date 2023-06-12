<template>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card color="transparent" class="logo py-4 d-flex justify-center">
          <NuxtLogo />
          <VuetifyLogo />
        </v-card>
        <v-card color="transparent">
          <v-card-title class="headline">
            Welcome to Call Scorer Dashboard
          </v-card-title>
          <v-card-text>
            <p>
              Vuetify is a progressive Material Design component framework for
              Vue.js. It was designed to empower developers to create amazing
              applications.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script lang="ts">
  import {
    defineComponent,
    ref,
  } from '@nuxtjs/composition-api'
  
  export default defineComponent({
    middleware: 'isAuthenticated',
    setup() {
      return{
        
      }
    }
  })
  </script>
  