import { DtoResponse } from '@/shared/types/dto'
import { NftDbItem } from '@/shared/types/nft'
import { devtools } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

export type AppState = {
  userNftCount: number,
  userNftList: DtoResponse<NftDbItem>[]
}

export type AppActions = {
  incrementNftCount: () => void,
  setUserNftList: (data: DtoResponse<NftDbItem>[]) => void,
  addNftItem: (item: DtoResponse<NftDbItem>) => void,
}

export type AppStore = AppState & AppActions

export const defaultInitState: AppState = {
  userNftCount: 0,
  userNftList: [],
}

export const createAppStore = (
  initState: AppState = defaultInitState,
) => {
  return createStore<AppStore, [["zustand/devtools", never]]>(
    devtools((set, get, store) => ({
      ...initState,
      incrementNftCount: () => set((state) => ({ userNftCount: state.userNftCount + 1 })),
      setUserNftList: (data) => set((state) => ({ ...state, userNftList: data })),
      addNftItem: (item) => set((state) => ({ ...state, userNftList: [item, ...state.userNftList] })),
    }))
  )
}