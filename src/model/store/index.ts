import { TUser } from '@/shared/types'
import { DtoResponse } from '@/shared/types/dto'
import { NftDbItem } from '@/shared/types/nft'
import { devtools } from 'zustand/middleware'
import { createStore } from 'zustand/vanilla'

export type AppState = {
  user: TUser,
  userNftList: DtoResponse<NftDbItem>[]
}

export type AppActions = {
  setUserNftList: (data: DtoResponse<NftDbItem>[]) => void,
  addNftItem: (item: DtoResponse<NftDbItem>) => void,
  setUser: (user: TUser) => void,
}

export type AppStore = AppState & AppActions

export const defaultInitState: AppState = {
  user: {
    avatar: "",
    tgId: undefined
  },
  userNftList: [],
}

export const createAppStore = (
  initState: AppState = defaultInitState,
) => {
  return createStore<AppStore, [["zustand/devtools", never]]>(
    devtools((set, get, store) => ({
      ...initState,
      setUserNftList: (data) => set((state) => ({ ...state, userNftList: data })),
      addNftItem: (item) => set((state) => ({ ...state, userNftList: [item, ...state.userNftList] })),
      setUser: (user) => set((state) => ({...state, user}))
    }))
  )
}