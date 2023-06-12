<template>
  <v-container id="pwResetPage" fluid class="fill-height">
    <v-row no-gutters justify="center">
      <v-col lg="3" xl="3" md="4" sm="6" offset-lg="1">
        <v-expand-transition>
          <v-card color="rgba(255,255,255,0.2)" v-show="showForm" elevation="10" :loading="busy">
            <v-card-title>Reset Password</v-card-title>
            <v-card-subtitle>
              Please enter your new password twice and submit the form.
            </v-card-subtitle>

            <v-card-text>
              <v-form v-model="formValid" @submit.prevent="formValid && submit">
                <v-text-field
                  v-model="email"
                  type="email"
                  :label="email"
                  readonly
                  name="email"
                  disabled
                  @keypress.enter="submit"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  :disabled="busy"
                  :label="password"
                  type="password"
                  name="password"
                  @keypress.enter="submit"
                ></v-text-field>
                <v-text-field
                  v-model="passwordConfirmation"
                  :rules="pwConfirmationRules"
                  :disabled="busy"
                  :label="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  @keypress.enter="submit"
                ></v-text-field>

                <v-btn
                  block
                  color="orange"
                  :disabled="!formValid || busy"
                  class="mt-4"
                  @click="submit"
                >
                  Reset Password
                </v-btn>
                <v-btn
                  plain
                  text
                  x-small
                  nuxt
                  to="/login"
                  class="mt-4"
                  :disabled="busy"
                >
                  &larr; Log In
                </v-btn>
              </v-form>
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
  onMounted,
  ref,
  useRouter,
  useRoute,
  computed,
  SetupContext,
} from '@nuxtjs/composition-api'
import useAxios from '../plugins/useAxios'
// import swalMixin, { showToast } from '~/utils/swalMixin'

export default defineComponent({
  layout: 'blank',
  setup(_props: any, context: SetupContext) {
    const router = useRouter()
    const $axios = useAxios()

    const route = useRoute()

    const email = computed(() =>
      ((route.value.query.email || '') as any).replaceAll(' ', '+')
    )

    const token = computed(() => route.value.query.token)

    // busy
    const busy = ref<boolean>(false)

    // form
    const formValid = ref<boolean>(false)

    // password validation
    const passwordRules = [
      (v: string) =>
        (v && v.length >= 8),
      (v: string) =>
        (v && (v.match(/[a-z]/g) || []).length > 0),
      (v: string) =>
        (v && (v.match(/[A-Z]/g) || []).length > 0),
      (v: string) =>
        (v && (v.match(/[0-9]/g) || []).length > 0),
      (v: string) =>
        (v && (v.match(/[$@#&^!]/g))),
    ]

    const pwConfirmationRules = [
      ...passwordRules,
      (v: string) =>
        (v && v === password.value),
    ]

    const password = ref<string>('')
    const passwordConfirmation = ref<string>('')

    // this handles the form appearance animation
    const showForm = ref(true)

    // const $swal = swalMixin((parent as any).$swal as any)

    const submit = (event: Event) => {
      event.preventDefault()
      if (!formValid.value) return false

      busy.value = true

      $axios
        .post(
          `reset-password`,
          {
            email: email.value,
            token: token.value,
            password: password.value,
            password_confirmation: passwordConfirmation.value,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          router.replace('/')
          // router.replace({query: {}})
          // showToast($swal, {
          //   title: root.$t('alert.success.pwResetDone') as String,
          // })
        })
        .finally(() => {
          busy.value = false
        })
    }

    onBeforeMount(() => {})

    // onMounted(async () => {
    //   setTimeout(() => {
    //     showForm.value = true
    //   }, 500)
    //   await $axios.get('/sanctum/csrf-cookie', {
    //     headers: {
    //       'X-Requested-With': 'XMLHttpRequest',
    //     },
    //     withCredentials: true,
    //   })
    // })

    return {
      showForm,
      email,
      busy,
      formValid,
      passwordRules,
      password,
      passwordConfirmation,
      pwConfirmationRules,
      submit,
    }
  },
  head: {
    title: `Password Recovery`,
  },
})
</script>
<style lang="scss" scoped>
#pwResetPage {
  background: url('https://wallpaperaccess.com/full/16692.jpg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: background-image 0.2s ease-in-out;
  height: 100vh;
}
</style>
