<template>
  <v-navigation-drawer
    color="grey"
    v-model="syncShow"
    persistent
    absolute
    :width="`100%`"
    clipped
  >
    <v-card color="transparent" flat>
      <v-toolbar color="transparent" rounded="0">
        <v-toolbar-title>Reset Password</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="syncShow = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        Please enter your email
      </v-card-text>

      <v-card-text>
        <v-form ref="pwResetForm" v-model="valid" @submit.prevent="submit">
          <v-text-field
            v-model="email"
            type="email"
            name="email"
            :rules="emailRules"
            @keypress.enter="submit"
          ></v-text-field>

          <v-btn
            class="mt-3"
            :loading="busy"
            color="warning"
            block
            :disabled="!valid || busy"
            @click="submit"
          >
            <v-icon left>mdi-send</v-icon>
            Submit
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  watch,
  ref,
  onMounted,
  SetupContext,
} from '@nuxtjs/composition-api'

import useAxios from '../plugins/useAxios'
// import swalMixin, { showToast } from '~/utils/swalMixin'

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  setup(props: any, context: SetupContext) {
    const { show } = props
    const $axios = useAxios()
    // const $swal = swalMixin((parent as any).$swal as any)

    const syncShow = computed({
      get: () => props.show,
      set: (v) => (context as any).emit('update:show', v),
    })

    const busy = ref<boolean>(false)
    const email = ref<string>('')
    const valid = ref<boolean>(false)

    // email validation rules
    const emailRules = [
      // @TODO: when migrating to vue 3, this needs to be changed to
      // an equivalent method since context.root will be deprecated
      (v: string) => !!v,
      (v: string) =>
        /.+@.+\..+/.test(v),
    ]

    const reset = () => {
      email.value = ''
      busy.value = false
      valid.value = false
      // ;((context as any).refs.pwResetForm as any).resetValidation()
    }

    // reset the errors and the form upon the dialog being closed
    watch(syncShow, (_oldVal, newVal) => {
      if (!newVal) {
        reset()
      }
    })

    const submit = async (event: Event) => {
      event.preventDefault()
      if (valid.value) {
        await requestReset()
      }
    }

    const requestReset = async () => {
      busy.value = true
      // await $axios.get('/sanctum/csrf-cookie', {
      //   headers: {
      //     'X-Requested-With': 'XMLHttpRequest',
      //   },
      //   withCredentials: true,
      // })
      await $axios
        .post(
          '/forgot-password',
          {
            email: email.value,
          },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          reset()
          syncShow.value = false
          busy.value = false
          // showToast($swal, {
          //   title: root.$t(`alert.success.pwResetEmail`) as String,
          // })
        })
        .finally(() => {
          busy.value = false 
        })
    }
    return {
      syncShow,
      email,
      valid,
      emailRules,
      busy,
      submit,
      reset,
    }
  },
})
</script>
