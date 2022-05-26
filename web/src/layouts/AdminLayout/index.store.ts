import { atom } from 'recoil'

export const adminIndexState = atom({
  key: 'adminIndexState',
  default: +sessionStorage.getItem('admin-index') || 0,
})
