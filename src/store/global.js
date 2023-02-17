// every index.js file inside store directory is transformed in namespace module by Nuxt
export const state = () => {
  return {
    firstPageVisit: true,
    typeOfSector: 'goods',
  }
}

export const mutations = {
  SET_FIRST_PAGE_VISIT(state, payload) {
    state.firstPageVisit = payload
  },
  SET_TYPE_OF_SECTOR(state, payload) {
    state.typeOfSector = payload
  },
}
