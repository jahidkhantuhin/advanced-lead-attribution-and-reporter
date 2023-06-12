<template>
  <div>
    <v-row justify="center" align="center" class="mt-4">
      <v-col cols="12">
        <v-card
          class="mt-4 mx-auto"
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="orange"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels"
              :value="value"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="text-h6 font-weight-light mb-2">
              User Registrations
            </div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock
            </v-icon>
            <span class="text-caption grey--text font-weight-light">last registration 26 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" class="mt-4">
      <v-col cols="12" sm="6" md="4">
        <v-card
          class="mt-4 mx-auto"
          max-width="500"
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="orange"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels"
              :value="value"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="text-h6 font-weight-light mb-2">
              User Registrations
            </div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock
            </v-icon>
            <span class="text-caption grey--text font-weight-light">last registration 26 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card
          class="mt-4 mx-auto"
          max-width="500"
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels"
              :value="value"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="text-h6 font-weight-light mb-2">
              User Registrations
            </div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock
            </v-icon>
            <span class="text-caption grey--text font-weight-light">last registration 26 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-card
          class="mt-4 mx-auto"
          max-width="500"
        >
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="purple"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :labels="labels"
              :value="value"
              color="white"
              line-width="2"
              padding="16"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="text-h6 font-weight-light mb-2">
              User Registrations
            </div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon
              class="mr-2"
              small
            >
              mdi-clock
            </v-icon>
            <span class="text-caption grey--text font-weight-light">last registration 26 minutes ago</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="mt-8">
      <v-col cols="12" sm="6" md="3" xl="3">
        <v-card 
          class="pt-8 pb-8 mb-12"
          max-width="500"
          height="140"
          >
          <v-row>
            <v-col>
              <v-sheet
                class="v-sheet--charts mx-auto "
                color="orange"
                elevation="12"
                max-width="calc(100% - 52px)"
                height="100px"
              >
              <v-icon style="padding: 35%;" color="white">mdi-account-group</v-icon>
              </v-sheet>
            </v-col>
            <v-col>Total users</v-col>
          </v-row>
          <v-row class="mt-n12">
            <v-col>
              <v-icon class="pl-6">mdi-clock</v-icon>
              <span><small>Last updated at</small></span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3" xl="3">
        <v-card 
          class="pt-8 pb-8 mb-12"
          max-width="500"
          height="140"
          >
          <v-row>
            <v-col>
              <v-sheet
                class="v-sheet--charts mx-auto "
                color="green"
                elevation="12"
                max-width="calc(100% - 52px)"
                height="100px"
              >
              <v-icon style="padding: 35%;" color="white">mdi-account-group</v-icon>
              </v-sheet>
            </v-col>
            <v-col>Total users</v-col>
          </v-row>
          <v-row class="mt-n12">
            <v-col>
              <v-icon class="pl-6">mdi-clock</v-icon>
              <span><small>Last updated at</small></span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3" xl="3">
        <v-card 
          class="pt-8 pb-8 mb-12"
          max-width="500"
          height="140"
          >
          <v-row>
            <v-col>
              <v-sheet
                class="v-sheet--charts mx-auto "
                color="blue"
                elevation="12"
                max-width="calc(100% - 52px)"
                height="100px"
              >
              <v-icon style="padding: 35%;" color="white">mdi-account-group</v-icon>
              </v-sheet>
            </v-col>
            <v-col>Total users</v-col>
          </v-row>
          <v-row class="mt-n12">
            <v-col>
              <v-icon class="pl-6">mdi-clock</v-icon>
              <span><small>Last updated at</small></span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3" xl="3">
        <v-card 
          class="pt-8 pb-8 mb-12"
          max-width="500"
          height="140"
          >
          <v-row>
            <v-col>
              <v-sheet
                class="v-sheet--charts mx-auto "
                color="grey"
                elevation="12"
                max-width="calc(100% - 52px)"
                height="100px"
              >
              <v-icon style="padding: 35%;" color="white">mdi-account-group</v-icon>
              </v-sheet>
            </v-col>
            <v-col>Total users</v-col>
          </v-row>
          <v-row class="mt-n12">
            <v-col>
              <v-icon class="pl-6">mdi-clock</v-icon>
              <span><small>Last updated at</small></span>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
  </template>
  
  <script lang="ts">
  import {
    defineComponent,
    ref,
  } from '@nuxtjs/composition-api'
  
  export default defineComponent({
    middleware: 'isAuthenticated',
    setup() {
      const labels = ref([
        '12am',
        '3am',
        '6am',
        '9am',
        '12pm',
        '3pm',
        '6pm',
        '9pm',
      ],)

      const value = ref(
        [
        200,
        675,
        410,
        390,
        310,
        460,
        250,
        240,
      ],
      )
      return{
        labels,
        value,
      }
    }
  })
</script>
<style scoped lang="scss">
.v-sheet--offset {
    top: -24px;
    position: relative;
  }
  .v-sheet--charts {
    top: -54px;
    position: relative;
}
</style>
  