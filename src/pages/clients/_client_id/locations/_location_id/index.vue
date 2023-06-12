<template>
  <div>
    <v-expand-transition v-if="busy">
      <v-card >
        <v-card-text>
          <v-skeleton-loader
            type="table-heading, list-item-two-line, image, table-tfoot"
          ></v-skeleton-loader>
        </v-card-text>
      </v-card>
    </v-expand-transition>
    <div v-if="!busy">
      <v-card>
        <v-toolbar
          flat
          color="orange"
          dark
        >
          <v-toolbar-title>User Profile</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
          <v-tab>
            <v-icon left>
              mdi-account
            </v-icon>
            Details
          </v-tab>
          <v-tab>
            <v-icon left>
              mdi-lock
            </v-icon>
            LDR
          </v-tab>
          <v-tab>
            <v-icon left>
              mdi-access-point
            </v-icon>
            KPI
          </v-tab>

          <v-tab-item>
            <v-row 
              :class="{
                  'my-6': true,
                  'users-table': true,
                }"
            >
              <v-col lg="1" xl="1" md="1">
              </v-col>
              <v-col lg="10" xl="10" md="10" sm="12">
                <v-card>
                  <v-sheet
                    class="v-sheet--offset mx-auto"
                    color="cyan"
                    elevation="12"
                    max-width="calc(100% - 32px)"
                  >
                    <v-card color="orange">
                      <v-card-title class="pl-10 pt-8 pb-8">Location Details</v-card-title>
                    </v-card>
                  </v-sheet>
                  <v-card-text>
                    <v-simple-table style="box-shadow: 10px 10px 5px #E8E8E8;">
                      <template>
                        <tbody>
                          <template>
                            <tr>
                              <td><strong>Name</strong></td>
                              <td>{{locationData.name}}</td>
                            </tr>
                            <tr>
                              <td><strong>Status</strong></td>
                              <td>{{locationData.status}}</td>

                              
                            </tr>
                            <tr>
                              <td><strong>City</strong></td>
                              <td> {{locationData.city}} </td>
                            </tr>
                            <tr>
                              <td><strong>State</strong></td>
                              <td> {{locationData.state }}</td>
                            </tr>
                            <tr>
                              <td><strong>Zip Code</strong></td>
                              <td> {{locationData.zip_code}} </td>
                            </tr>
                            <tr>
                              <td><strong>Monthly Fee</strong></td>
                              <td> {{locationData.monthly_fee}} </td>
                            </tr>
                            <!-- <tr>
                              <td><strong>Adwrods Budget</strong></td>
                              <td> locationData.adwords_budget </td>
                            </tr>
                            <tr>
                              <td><strong>Facebook Budget</strong></td>
                              <td> locationData.facebook_budget </td>
                            </tr>
                            <tr>
                              <td><strong>Apex Chat ID</strong></td>
                              <td> locationData.apexchat_id </td>
                            </tr>
                            <tr>
                              <td><strong>Facebook ID</strong></td>
                              <td> locationData.facebook_id </td>
                            </tr>
                            <tr>
                              <td><strong>Adwords ID</strong></td>
                              <td> locationData.adwords_id </td>
                            </tr> -->
                          </template>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row 
              :class="{
                  'my-6': true,
                  'users-table': true,
                }"
            >
              <v-col lg="1" xl="1" md="1">
              </v-col>
              <v-col lg="10" xl="10" md="10" sm="12">
                <v-card>
                  <v-sheet
                    class="v-sheet--offset mx-auto"
                    color="cyan"
                    elevation="12"
                    max-width="calc(100% - 32px)"
                  >
                  
                  <v-expansion-panels accordion>
                    <v-expansion-panel
                    >
                      <v-expansion-panel-header disable-icon-rotate color="orange">
                        <v-toolbar flat color="orange">
                          <v-toolbar-title>Lead Details Report</v-toolbar-title>
                        </v-toolbar>
                        <template v-slot:actions>
                          <v-icon color="teal">
                            mdi-filter
                          </v-icon>
                        </template>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                      <!-- Filters -->
                      <v-row>
                        <v-col lg="1" xl="" md="1">
                        </v-col>
                        <v-col lg="10" xl="12" md="10" sm="12">
                            <v-form @submit.prevent="">
                              <v-card-title>
                                <v-icon left>mdi-filter</v-icon>
                                Filter
                              </v-card-title>
                              <v-card-text>
                                
                                <v-row>
                                  <v-col cols="8" sm="6" md="4" lg="3">
                                    <!-- User type -->
                                    <v-select
                                      :items="roles"
                                      :item-text="(item) => item.name"
                                      :item-value="(item) => item.name"
                                      :loading="loadingRoles"
                                      label="Type"
                                      v-model="filters.role"
                                      clearable
                                    ></v-select>
                                  </v-col>
                                  <v-col cols="8" sm="6" md="4" lg="3">
                                    <!-- Search Term -->
                                    <v-text-field
                                      label="Search"
                                      v-model="filters.search"
                                      clearable
                                      maxlength="250"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="8" sm="6" md="4" lg="3">
                                    <!-- Active -->
                                    <v-select
                                      v-model="filters.status"
                                      :items="activeOptions"
                                      clearable
                                      label="User Status"
                                    ></v-select>
                                  </v-col>
                                  <v-col cols="8" sm="6" md="4" lg="3">
                                    <!-- Order -->
                                    <v-select
                                      label="Order By"
                                      :items="sortByOptions"
                                      v-model="filters.sort_by"
                                    ></v-select>
                                  </v-col>
                                  <v-col cols="8" sm="6" md="4" lg="3">
                                    <v-select
                                      label="Order"
                                      :items="sortingOptions"
                                      v-model="filters.sorting"
                                    ></v-select>
                                  </v-col>
                                </v-row> 
                              </v-card-text>
                              <v-card-actions class="">
                                <v-spacer></v-spacer>
                                <v-btn color="orange">
                                  <v-icon left>mdi-check</v-icon>
                                </v-btn>
                                <v-btn link nuxt to="/users">
                                  <v-icon left>mdi-cancel</v-icon>
                                </v-btn>
                              </v-card-actions>
                            </v-form>
                        </v-col>
                      </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                    </v-sheet>
                <!-- users list -->
                <v-data-table
                  :loading="busy"
                  :options.sync="tableOptions"
                  :items="users"
                  :headers="tableHeaders"
                  :items-per-page="itemsPerPage"
                  :page="page"
                  :footer-props="{
                    'items-per-page-options': itemsPerPageOptions,
                  }"
                  :server-items-length="pagination.total"
                  @pagination="handlePaginationChange"
                  class="elevation-1 transparent"
                  >
                    <template #item.status="{ item }">
                        {{ item.status ? 'Active' : 'Inactive' }}
                    </template> 
                    <template #item.name="{ item }">
                        <span>{{ item.name }}</span>
                    </template>
                    <template #item.website="{ item }">
                        <v-btn
                        target="_blank"
                        :href="`${
                            item.website.includes('http') ? item.website : '//' + item.website
                        }`"
                        elevation="0"
                        small
                        v-if="item.website"
                        class="text-lowercase"
                        >
                        <!-- Open link -->
                        {{ item.website }}
                        </v-btn>
                    </template>
                    <template #item.actions="{ item }">
                          <v-btn 
                            class="ml-n6"
                            small
                            plain 
                            color="orange" 
                            dark 
                            v-bind="attrs" 
                            v-on="on"
                            @click="$router.push(`/clients/${item.id}/edit`)"
                            >
                            <v-icon>mdi-pen</v-icon>
                            <!-- Actions -->
                          </v-btn>
                          <v-btn 
                            small
                            plain 
                            color="grey" 
                            dark 
                            v-bind="attrs" 
                            v-on="on"
                            >
                            <v-icon>mdi-delete</v-icon>
                            <!-- Actions -->
                          </v-btn>
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>
          <v-tab-item>
            <v-row 
              :class="{
                  'my-6': true,
                  'users-table': true,
                }"
            >
              <v-col lg="1" xl="1" md="1">
              </v-col>
              <v-col lg="10" xl="10" md="10" sm="12">
                <v-card>
                  <v-sheet
                    class="v-sheet--offset mx-auto"
                    color="cyan"
                    elevation="12"
                    max-width="calc(100% - 32px)"
                  >
                  
                  <v-expansion-panels accordion>
                    <v-expansion-panel
                    >
                      <v-expansion-panel-header disable-icon-rotate color="orange">
                        <v-toolbar flat color="orange">
                          <v-toolbar-title>KPI Report</v-toolbar-title>
                        </v-toolbar>
                        <template v-slot:actions>
                          <v-icon color="teal">
                            mdi-filter
                          </v-icon>
                        </template>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                      <!-- Filters -->
                      <v-row>
                        <v-col lg="1" xl="" md="1">
                        </v-col>
                        <v-col lg="10" xl="12" md="10" sm="12">
                            <v-form @submit.prevent="">
                              <v-card-title>
                                <v-icon left>mdi-filter</v-icon>
                                Filter
                              </v-card-title>
                              <v-card-text>
                                
                                <v-row>
                                  <v-col cols="8" sm="6" md="4" lg="3">
                                    <!-- User type -->
                                    <v-select
                                      :items="roles"
                                      :item-text="(item) => item.name"
                                      :item-value="(item) => item.name"
                                      :loading="loadingRoles"
                                      label="Type"
                                      v-model="filters.role"
                                      clearable
                                    ></v-select>
                                  </v-col>
                                  <v-col cols="8" sm="6" md="4" lg="3">
                                    <!-- Search Term -->
                                    <v-text-field
                                      label="Search"
                                      v-model="filters.search"
                                      clearable
                                      maxlength="250"
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="8" sm="6" md="4" lg="3">
                                    <!-- Active -->
                                    <v-select
                                      v-model="filters.status"
                                      :items="activeOptions"
                                      clearable
                                      label="User Status"
                                    ></v-select>
                                  </v-col>
                                  <v-col cols="8" sm="6" md="4" lg="3">
                                    <!-- Order -->
                                    <v-select
                                      label="Order By"
                                      :items="sortByOptions"
                                      v-model="filters.sort_by"
                                    ></v-select>
                                  </v-col>
                                  <v-col cols="8" sm="6" md="4" lg="3">
                                    <v-select
                                      label="Order"
                                      :items="sortingOptions"
                                      v-model="filters.sorting"
                                    ></v-select>
                                  </v-col>
                                </v-row> 
                              </v-card-text>
                              <v-card-actions class="">
                                <v-spacer></v-spacer>
                                <v-btn color="orange">
                                  <v-icon left>mdi-check</v-icon>
                                </v-btn>
                                <v-btn link nuxt to="/users">
                                  <v-icon left>mdi-cancel</v-icon>
                                </v-btn>
                              </v-card-actions>
                            </v-form>
                        </v-col>
                      </v-row>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-sheet>
                  <!-- users list -->
                  <v-data-table
                    :loading="busy"
                    :options.sync="tableOptions"
                    :items="users"
                    :headers="tableHeaders"
                    :items-per-page="itemsPerPage"
                    :page="page"
                    :footer-props="{
                      'items-per-page-options': itemsPerPageOptions,
                    }"
                    :server-items-length="pagination.total"
                    @pagination="handlePaginationChange"
                    class="elevation-1 transparent"
                  >
                    <template #item.status="{ item }">
                        {{ item.status ? 'Active' : 'Inactive' }}
                    </template> 
                    <template #item.name="{ item }">
                        <span>{{ item.name }}</span>
                    </template>
                    <template #item.website="{ item }">
                        <v-btn
                        target="_blank"
                        :href="`${
                            item.website.includes('http') ? item.website : '//' + item.website
                        }`"
                        elevation="0"
                        small
                        v-if="item.website"
                        class="text-lowercase"
                        >
                        <!-- Open link -->
                        {{ item.website }}
                        </v-btn>
                    </template>
                    <template #item.actions="{ item }">
                          <v-btn 
                            class="ml-n6"
                            small
                            plain 
                            color="orange" 
                            dark 
                            v-bind="attrs" 
                            v-on="on"
                            @click="$router.push(`/clients/${item.id}/edit`)"
                            >
                            <v-icon>mdi-pen</v-icon>
                            <!-- Actions -->
                          </v-btn>
                          <v-btn 
                            small
                            plain 
                            color="grey" 
                            dark 
                            v-bind="attrs" 
                            v-on="on"
                            >
                            <v-icon>mdi-delete</v-icon>
                            <!-- Actions -->
                          </v-btn>
                    </template>
                  </v-data-table>
                </v-card>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </div>
  </div>
    
  </template>
  
  <script lang="ts">
  import {
    defineComponent,
    onMounted,
    onBeforeMount,
    ref,
    useRoute,
    useRouter,
    useStore,
    watch,
    useContext,
  } from '@nuxtjs/composition-api'
  import { IBreadcrumbs } from '@/store'
  
  import useUsers from '../../../../../services/useUsers'
  import useClientLocations from '../../../../../services/useClientLocations'
  import { Dictionary } from '../../../../../node_modules/@types/lodash'
  import isUserAllowedToEdit from '../../../../../utils/isUserAllowedToEdit'
  import clientLocation from '../../../../../report/clientLocation'
  // import swalMixin, { showConfirmDialog, showToast } from '~/utils/swalMixin'
  
  // we are naming these based on the API requirements
  interface IUsersFilter {
    role?: number | null
    search?: string | null
    status?: string | null
    sort_by?: string
    sorting: 'asc' | 'desc'
  }
  
  interface IFilterSelectOption {
    text: string
    value: string | number | boolean | null | Array<string | number | boolean>
  }
  
  export default defineComponent({
    middleware: 'isAuthenticated',
    setup(props) {
      const tab = ref(null)
      const itemsPerPageOptions = ref([20, 50, 100, 500])
      const itemsPerPage = ref(itemsPerPageOptions.value[0])
      const page = ref(1)
      const context = useContext()
  
      const store = context.store
      const router = useRouter()
      const route = useRoute()
      const usersApi = useClientLocations()
      const busy = ref(true)
      const locationID = route.value.params.location_id
      // const $swal2 = swalMixin((parent as any).$swal as any)
  
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
      ]
  
      const pageTitle = `Users`
  
      store.dispatch('setPageHeading', { pageTitle, breadcrumbs })
  
      // filters
      const defaultFilterValus: IUsersFilter = {
        role: null,
        search: null,
        status: 'active',
        sort_by: `first_name`,
        sorting: 'asc',
      }
      const filters = ref<IUsersFilter>(defaultFilterValus)
  
      const activeOptions: IFilterSelectOption[] = [
        {
          text: `Any`,
          value: null,
        },
        {
          text: `Active Only`,
          value: `active`,
        },
        {
          text: `Disabled Only`,
          value: `inactive`,
        },
      ]
  
      const sortByOptions: IFilterSelectOption[] = [
        {
          text: `Name`,
          value: `first_name`,
        },
        {
          text: `Active Status`,
          value: `status`,
        },
      ]
  
      const sortingOptions: IFilterSelectOption[] = [
        { text: `Ascending`, value: `asc` },
        { text: `Descending`, value: `desc` },
      ]
  
      const handleFilterApply = () => {
        router.push({
          path: router.currentRoute.path,
          query: {
            page: page.value.toString(),
            itemsPerPage: itemsPerPage.value.toString(),
            ...(filters.value as Dictionary<
              string | (string | null)[] | null | undefined
            >),
          },
        })
      }
  
      // users
      const users = clientLocation
      const locationData = ref()
  
      const pagination = ref({
        total: 0,
      })
  
      const getUsers = () => {
        // if (busy.value === false) {
          // first, transform the sort_by filter to use with the
          // axios request
          usersApi
            .locationById(locationID)
            .then((response) => {
              locationData.value = response.data.data
              console.log('Location Data', response.data.data)
              // pagination.value = response.data.data.pagination
            })
            .catch((error) => {
            })
            .finally(() => (busy.value = false))
        // }
      }
  
      // roles
      const roles = ref([])
      const loadingRoles = ref(false)
  
      // const getRoles = () => {
      //   loadingRoles.value = true
      //   usersApi
      //     .getRoles()
      //     .then(
      //       ({ data }) =>
      //         (roles.value = data.data.filter(
      //           // exclude super admin
      //           (item: { name: string | string[] }) =>
      //             !item.name.includes('super admin')
      //         ))
      //     )
      //     .catch(({ response }) => console.log(`getRoles error`, response))
      //     .finally(() => (loadingRoles.value = false))
      // }
  
      // data table
      const tableHeaders = ref([
      {
        text: ``,
        align: `start`,
        sortable: false,
        value: `actions`,
      },
      {
        text: `Location-name`,
        align: `start`,
        sortable: true,
        value: `name`,
      },
      {
        text: `Location-status`,
        align: `start`,
        sortable: true,
        value: `status`,
      },
      
      {
        text: `Account Manager`,
        align: `start`,
        sortable: true,
        value: `account_manager`,
      },
      {
        text: `Website`,
        align: `start`,
        sortable: true,
        value: `website`,
      },
      {
        text: `Created`,
        align: `start`,
        sortable: true,
        value: `created_at`,
      },

      
    ])
  
      const tableOptions = ref<any>({})
  
      watch(
        tableOptions,
        () => {
          if (tableOptions.value.sortBy[0]) {
            filters.value.sort_by =
              tableOptions.value.sortBy[0] === 'fullname'
                ? 'first_name'
                : tableOptions.value.sortBy[0]
            filters.value.sorting = tableOptions.value.sortDesc[0]
              ? 'desc'
              : 'asc'
          }
  
        //   handleFilterApply()
        },
        { deep: true }
      )
  
      const handleDeleteUser = (id: any) => {
        // showConfirmDialog($swal2, {
        //   title: 'Are you sure you want to delete this user?',
        //   text:
        //     'This action is permanent. If you delete this user, all of their data will be deleted as well. Are you certain you want to proceed with this action?',
        //   icon: 'warning',
        // }).then(async (result: any) => {
        //   if (result.isConfirmed) {
        //     busy.value = true
        //     await usersApi.deleteUser(id)
        //     showToast($swal2, {
        //       title: 'User deleted',
        //       icon: 'error',
        //     })
        //     busy.value = false
        //     getUsers()
        //   }
        // })
            // usersApi.deleteUser(id)
            getUsers()
  
      }
  
      const handlePaginationChange = (e: any) => {
        itemsPerPage.value = e.itemsPerPage === -1 ? 500 : e.itemsPerPage
        page.value = e.page
        // handleFilterApply()
        // getUsers()
      }
  
      const loadFiltersFromURL = () => {
        const query = route.value.query
        if (query.page) {
          page.value = +query.page
          delete query['page']
        } else {
          page.value = 1
        }
        if (query.itemsPerPage) {
          itemsPerPage.value = +query.itemsPerPage
          delete query['itemsPerPage']
        } else {
          itemsPerPage.value = 20
        }
        filters.value = { ...defaultFilterValus, ...query }
      }
  
      // others
      watch(route, () => {
        // loadFiltersFromURL()
        // getUsers()
      })
  
      onBeforeMount(() => {
        // loadFiltersFromURL()
      })
  
      onMounted(() => {
        getUsers()
        // getRoles()
      })
  
      return {
        isUserAllowedToEdit,
        filters,
        activeOptions,
        sortByOptions,
        sortingOptions,
        handleFilterApply,
        roles,
        loadingRoles,
        users,
        pagination,
        busy,
        tableHeaders,
        itemsPerPage,
        itemsPerPageOptions,
        tableOptions,
        handleDeleteUser,
        handlePaginationChange,
        page,
        tab,
        locationID,
        locationData,
      }
    },
    head: {
      title: 'Locations',
    },
  })
  </script>
  
  <style scoped lang="scss">
  .user-name {
    /* position: relative;
    top: -6px;
    left: 5px; */
  }
  .v-sheet--offset {
      top: -24px;
      position: relative;
  }
  .v-sheet--charts {
      top: -54px;
      position: relative;
  }
  .users-table .v-data-table {
    padding-left: 40px;
  }
  </style>
  