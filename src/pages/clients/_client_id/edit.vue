<template>
      <v-row class="my-6" justify="center">
        <v-col cols="12" lg="4" md="6">
          <v-card>
            <!-- <v-card-title> Update a user </v-card-title> -->
            <client-form
              @done="onUpdate"
              @cancel="$router.push('/clients/')"
              :userId="userId"
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
    useRoute,
    useRouter,
    useStore,
  } from '@nuxtjs/composition-api'
  import { IBreadcrumbs } from '@/store'
  
  import useUsers from '../../../services/useUsers'
  import ClientForm from '../../../components/forms/ClientForm.vue'
  import RestrictedComponent from '../../../components/RestrictedComponent.vue'
  
  export default defineComponent({
    components: {
        ClientForm,
        RestrictedComponent,
    },
    middleware: 'isAuthenticated',
    setup() {
      const store = useStore()
      const router = useRouter()
      const usersApi = useUsers()
      const route = useRoute()
      const busy = ref(false)
  
      // set the page breadcrumbs
      const breadcrumbs: IBreadcrumbs[] = [
        {
          text: `Dashboard`,
          to: `/`,
        },
        {
          text: `Users`,
          to: `/users`,
        },
        {
          text: `Edit`,
          to: `/users/${route.value.params.id}/edit`,
        },
      ]
  
      const pageTitle = `Update a user`
  
      store.dispatch('setPageHeading', { pageTitle, breadcrumbs })
  
      const onUpdate = () => {
        router.replace('/users')
      }
  
      return {
        busy,
        userId: route.value.params.client_id,
        onUpdate,
      }
    },
    head: {
      title: 'Update a client',
    },
  })
  </script>
  