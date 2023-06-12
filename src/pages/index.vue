<template>
  <div>
    <div v-if="userRole === 'admin'">
    <Admin/>
    </div>
    <div v-if="userRole === 'super admin'">
    <SuperAdmin/>
    </div>
    <div>
    <User v-if="userRole === 'user'"/>
    </div>
    <div v-if="userRole === 'account manager'">
    <AccountManager/>
    </div>
    <div v-if="userRole === 'call scorer'">
    <CallScorer/>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  useContext,
  onBeforeMount,
} from '@nuxtjs/composition-api'
import Admin from '../components/dashboard/admin.vue'
import SuperAdmin from '../components/dashboard/super-admin.vue'
import User from '../components/dashboard/user.vue'
import AccountManager from '../components/dashboard/account-manager.vue'
import CallScorer from '../components/dashboard/call-scorer.vue'
import useAxios from '../plugins/useAxios'

export default defineComponent({
  middleware: 'isAuthenticated',
  components: {
    Admin,
    SuperAdmin,
    User,
    AccountManager,
    CallScorer,
  },
  setup() {
    const context = useContext()
    const $axios = useAxios()
    const store = context.store
    // const userRole = computed(() => {
    //     return context.$auth.user && context.$auth.user.data &&  (context.$auth.user?.data as any).role
    //   })
    const userRole = ref()
    onBeforeMount(async () => {
      await $axios
        .get('/user')
        .then((response: any) => {
            userRole.value = response.data.data.role;
            store.dispatch('setUser', {
              cred: response.data.data,
            })
            store.dispatch('setUserRole', {
              cred: response.data.data.role,
            })
            store.dispatch('setUserScope', {
              cred: response.data.data.scope,
            })
          })
    })
    return{
      userRole,
    }
  }
})
</script>
