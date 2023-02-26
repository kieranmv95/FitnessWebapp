import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type IFilterState = {
  textSearch: string
  equipment: string
  muscleGroup: string
  type: string
}

const initialState: IFilterState = {
  textSearch: '',
  equipment: '',
  muscleGroup: '',
  type: '',
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    clearFilters: (_) => initialState,
    clearNamedFilter: (state, action: PayloadAction<keyof IFilterState>) => ({
      ...state,
      [action.payload]: initialState[action.payload],
    }),
    updateTextSearch: (state, action: PayloadAction<string>) => ({
      ...state,
      textSearch: action.payload,
    }),
    updateType: (state, action: PayloadAction<string>) => ({
      ...state,
      type: action.payload,
    }),
    updateEquipment: (state, action: PayloadAction<string>) => ({
      ...state,
      equipment: action.payload,
    }),
    updateMuscleGroup: (state, action: PayloadAction<string>) => ({
      ...state,
      muscleGroup: action.payload,
    }),
  },
})

const { actions, reducer } = filterSlice

export const {
  clearFilters,
  updateTextSearch,
  updateEquipment,
  updateMuscleGroup,
  clearNamedFilter,
  updateType,
} = actions

export default reducer
