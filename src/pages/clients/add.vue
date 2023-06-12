<template>
      <v-row class="my-6" justify="center">
        <v-col cols="12" lg="4" md="6">
          <v-card>
            <client-form
              @cancel="$router.push('/clients/')"
              @done="onCreate"
            ></client-form>
          </v-card>
        </v-col>
      </v-row>
  </template>
  
  <script lang="ts">
  import {
    defineComponent,
    onMounted,
    ref,
    useRouter,
    useStore,
  } from '@nuxtjs/composition-api'
  import { IBreadcrumbs } from '@/store'
  
  import ClientForm from '../../components/forms/ClientForm.vue'
  import RestrictedComponent from '../../components/RestrictedComponent.vue'
  
  export default defineComponent({
    components: {
      ClientForm,
    },
    middleware: 'isAuthenticated',
    setup() {
      const store = useStore()
      const router = useRouter()
      const busy = ref(false)
  
      const pageTitle = `Add a Client`
  
      const onCreate = () => {
        router.replace('/clients')
      }
  
      return {
        busy,
        onCreate,
      }
    },
    head: {
      title: 'Add a Client',
    },
  })
  </script>
  <style scoped lang="scss">
  .v-sheet--offset {
      top: -24px;
      position: relative;
  }
  </style>
  