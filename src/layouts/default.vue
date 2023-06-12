<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      dark
      src="https://w0.peakpx.com/wallpaper/300/390/HD-wallpaper-black-sand-background-black-soil-dark-grey-sky-soil-stars-texture.jpg"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="logOut()">
        <v-list-item-icon>
          <v-icon>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container id="defaultLayout" fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'
import useAxios from '../plugins/useAxios'

export default defineComponent({
  setup() {
    const context = useContext()
    const router = useRouter()
    const axios = useAxios()
    const clipped = ref(false)
    const drawer = ref(false)
    const fixed = ref(false)
    const items = ref([
      {
        icon: 'mdi-apps',
        title: 'Dashboard',
        to: '/',
      },
      {
        icon: 'mdi-account-group',
        title: 'Clients',
        to: '/clients',
      },
      {
        icon: 'mdi-phone',
        title: 'Calls',
        to: '/calls',
      },
      {
        icon: 'mdi-account-group',
        title: 'Users',
        to: '/users',
      },
    ])
    
    const miniVariant = ref(false)
    const right = ref(true)
    const rightDrawer = ref(false)
    const title = ref('Foundation 2.0')
    const isAuthenticated = computed(() => {
      return context.store.getters['users/isAuthenticated']
    })
    const logOut = async () => {
      await axios
          .post('logout', {
          },
          {
            withCredentials: true,
          })
      // await (context as any).$auth.logout()
      router.push("/login");
    }
    return {
      clipped,
      drawer,
      fixed,
      items,
      miniVariant,
      right,
      rightDrawer,
      title,
      logOut,
      isAuthenticated,
    }
  },
})
</script>
<style lang="scss" scoped>
#defaultLayout {
  background: url('https://img.freepik.com/free-vector/blue-abstract-gradient-wave-vector-background_53876-111548.jpg?w=2000');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: background-image 0.2s ease-in-out;
  height: 100%;
}
</style>