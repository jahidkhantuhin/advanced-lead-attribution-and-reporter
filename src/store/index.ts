import { GetterTree, MutationTree, ActionTree } from 'vuex'

export interface IMainState {
  pageTitle: String
}

export interface IBreadcrumbs {
  text: String
  disabled?: boolean
  to: String
  exact?: boolean
}

export interface IPageHeading {
  pageTitle: String
  breadcrumbs: IBreadcrumbs[]
}

export const state = () => ({
  pageTitle: '' as string,
  appVersion: `1.0a` as string,
  breadcrumbs: [] as IBreadcrumbs[],
  cred: '' as any,
  user: ' ' as any,
  userRole: ' ' as any,
  userScope: [] as any,
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  pageTitle: (state) => state.pageTitle,
  breadcrumbs: (state) => state.breadcrumbs,
  cred: (state) => state.cred,
  user: (state) => state.user,
  userRole: (state) => state.userRole,
  userScope: (state) => state.userScope,
}

export const mutations: MutationTree<RootState> = {
  SET_PAGE_TITLE: (state, title: string) => (state.pageTitle = title),
  SET_BREADCRUMBS: (state, list: IBreadcrumbs[]) => (state.breadcrumbs = list),
  SET_GOOGLE: (state, cred: any) => (state.cred = cred),
  SET_USER: (state, user: any) => (state.user = user),
  SET_USER_ROLE: (state, userRole: any) => (state.userRole = userRole),
  SET_USER_SCOPE: (state, userScope: any) => (state.userScope = userScope),
}

export const actions: ActionTree<RootState, RootState> = {
  setPageTitle: ({ commit }, title: string) => {
    commit('SET_PAGE_TITLE', title)
  },
  setBreadcrumbs: ({ commit }, list: IBreadcrumbs) => {
    commit('SET_BREADCRUMBS', list)
  },
  setPageHeading: ({ commit }, { pageTitle, breadcrumbs }: IPageHeading) => {
    // add the exact property to each of the breadcrumb items
    // if it's not supplied
    breadcrumbs.forEach((item) => {
      if (typeof item.exact === `undefined`) {
        item.exact = true
      }
    })

    // commit the data
    commit('SET_PAGE_TITLE', pageTitle)
    commit('SET_BREADCRUMBS', breadcrumbs)

  },
  setGoogle: ({ commit }, cred: any) => {
    commit('SET_GOOGLE', cred)
  },
  setUser: ({ commit }, user: any) => {
    commit('SET_USER', user)
  },
  setUserRole: ({ commit }, userRole: any) => {
    commit('SET_USER_ROLE', userRole)
  },
  setUserScope: ({ commit }, userScope: any) => {
    commit('SET_USER_SCOPE', userScope)
  },
}
