import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store'

export type IFilterState = {
  textSearch: string
  category: string
  muscleGroup: string
}

const initialState: IFilterState = {
  textSearch: '',
  category: '',
  muscleGroup: '',
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
    updateEquipment: (state, action: PayloadAction<string>) => ({
      ...state,
      equipment: action.payload,
    }),
    updateCategory: (state, action: PayloadAction<string>) => ({
      ...state,
      category: action.payload,
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
  updateCategory,
  updateMuscleGroup,
  clearNamedFilter,
} = actions

export default reducer
