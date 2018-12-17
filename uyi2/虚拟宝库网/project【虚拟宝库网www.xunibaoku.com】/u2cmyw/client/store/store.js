import AppStateClass from './app-state'

export const AppState = AppStateClass

export default {
  AppState,
}

export const createStoreMap = () => {
  return {
    appState: new AppState(),
  }
}
