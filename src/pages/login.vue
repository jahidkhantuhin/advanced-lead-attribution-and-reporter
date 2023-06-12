<template>
  <v-container id="loginPage" fluid class="fill-height">
    <v-row no-gutters justify="center">
      <v-col lg="4" xl="2" md="6" sm="8" offset-lg="1" v-if="fetchingUser">
        <v-expand-transition>
          <v-card class="text-center" >
            <v-card-text>
              <v-progress-circular :size="50" color="primary" indeterminate>
              </v-progress-circular>
            </v-card-text>
            <v-card-text class="text-center">Checking User info</v-card-text>
          </v-card>
        </v-expand-transition>
        <v-expand-transition>
          <!-- <v-card class="rounded-t-xl rounded-l-xl" color="#FFE0E0E0" v-show="showForm" elevation="10">
            <v-card-title>Welcome to Foundation 2.0</v-card-title>
            <v-card-subtitle>Please login with your email and password or try with google account below.</v-card-subtitle>
            <v-spacer></v-spacer>
            <v-card-text>
              <LoginForm />
            </v-card-text>
          </v-card> -->
              <!-- <LoginForm /> -->
        </v-expand-transition>
      </v-col>
      <v-col lg="3" xl="3" md="4" sm="6" offset-lg="1" v-show="showForm" >
        <v-expand-transition>
          <v-card class="" color="rgba(255,255,255,0.2)" elevation="10">
            <v-card-text class="text-center">
              <h1 class="welcome-heading ">Welcome to Foundation 2.0</h1>
            <img class="login-header-image" src="../static/wm4d-logo.jpg" alt="webmarketingfordentists">
            </v-card-text>
            <!-- <v-card-subtitle>Please login with your email and password or try with google account below.</v-card-subtitle> -->
            <v-spacer></v-spacer>
            <v-card-text>
              <LoginForm />
            </v-card-text>
          </v-card>
        </v-expand-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  ref,
  useRoute,
  useRouter,
  useStore,
  useContext,
} from '@nuxtjs/composition-api'

import LoginForm from '../components/LoginForm.vue'
import useAxios from '../plugins/useAxios'

export default defineComponent({
  components: { LoginForm },
  // middleware: 'redirectToHomeIfAlreadyLoggedIn',
  // auth: 'guest',
  layout: 'blank',
  setup(_props) {
    const $axios = useAxios()
    const context = useContext()
    const router = useRouter()
    const route = useRoute()
    // const store = useStore()
    const showForm = ref(false)
    // const isAuthenticated = store.getters['users/isAuthenticated']

    const fetchingUser = ref(true)

    onBeforeMount(async () => {
      await $axios
        .get('/user')
        .then((response: any) => {
            ;(context as any).$auth.setUserToken(true);
            ;(context as any).$auth.setUser(response.data.data);
            // showToast($swal, {
            //   title: translate(`alert.success.login`),
            // })
            router.push((route.value.query as any).redirect || '/')
          })
          .catch(() => {
              fetchingUser.value = false
              showForm.value = true
          })
    })

    return {
      showForm,
      fetchingUser,
      // isAuthenticated,
    }
  },
  head: {
    title: `Login`,
  },
})
</script>
<style lang="scss" scoped>
#loginPage {
  background: url('https://wallpaperaccess.com/full/16692.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: background-image 0.2s ease-in-out;
  height: 100%;
  .welcome-heading {
    font-family: Futura BK BT;
    font-style: normal;
    font-weight: normal;
    margin: 0 20px;
  }
  .login-header-image {
    width: 20%;
    margin: 10px 120px;
  }
}
</style>
