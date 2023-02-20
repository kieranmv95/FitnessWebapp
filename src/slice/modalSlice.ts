import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalTypes } from '@/components/Modal'

export type IModalState = {
  modalType: '' | ModalTypes
  open: boolean
}

const initialState: IModalState = {
  modalType: '',
  open: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: (_) => initialState,
    openModal: (_, action: PayloadAction<ModalTypes>) => ({
      modalType: action.payload,
      open: true,
    }),
  },
})

const { actions, reducer } = modalSlice

export const { closeModal, openModal } = actions

export default reducer
