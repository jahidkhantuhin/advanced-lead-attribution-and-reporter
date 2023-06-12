<template>
    <v-row class="my-6" justify="center">
      <v-col cols="12" lg="4" md="6">
        <v-card>
          <location-form
            @cancel="$router.push('/clients/5/locations')"
            @done="onCreate"
            :userId="userId"
          ></location-form>
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
  useRoute
} from '@nuxtjs/composition-api'
import { IBreadcrumbs } from '@/store'

import LocationForm from '../../../../../components/forms/LocationForm.vue'
import RestrictedComponent from '../../../../../components/RestrictedComponent.vue'

export default defineComponent({
  components: {
    LocationForm,
  },
  middleware: 'isAuthenticated',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const busy = ref(false)

    const pageTitle = `Add a Client`

    const onCreate = () => {
      router.replace('/clients')
    }

    return {
      busy,
      onCreate,
      userId: route.value.params.location_id,
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
