import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import {
  clearFilters,
  updateTextSearch,
  updateCategory,
  updateMuscleGroup,
} from '@/slice/filterSlice'
import { Input, Select } from '@/components/FormGroup'
import Button from '@/components/Button'
import cx from 'classnames'

const Filters = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useAppDispatch()
  const { textSearch, category, muscleGroup } = useAppSelector(
    (state) => state.filters,
  )

  return (
    <div className="md:sticky md:top-6">
      <div className="bg-white rounded-md shadow-md p-4">
        <div className="flex gap-3">
          <h2 className="font-semibold text-xl">Filters</h2>
          <div className="md:hidden">
            <div
              className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline focus:ring inline-block"
              onClick={() => setOpen(!open)}
            >
              {open ? 'Hide' : 'Show'}
            </div>
          </div>
        </div>
        <div
          className={cx('mt-4', open ? 'block' : 'hidden md:block')}
          data-testid="filters-list"
        >
          <Input
            label="Search"
            onChange={(e) => dispatch(updateTextSearch(e.target.value))}
            value={textSearch}
            type="text"
            id="filterText"
            name="filterText"
            placeholder="Search"
          />
          <div className="mb-5">
            <Select
              label="Category"
              onChange={(e) => dispatch(updateCategory(e.target.value))}
              value={category}
              id="category"
              name="category"
            >
              <option value="">All</option>
              <option value="Barbell">Barbell</option>
              <option value="Dumbbell">Dumbbell</option>
              <option value="Bodyweight">Bodyweight</option>
              <option value="Cardio">Cardio</option>
              <option value="Cable">Cable</option>
              <option value="Machine">Machine</option>
              <option value="Kettlebell">Kettlebell</option>
              <option value="Duration">Duration</option>
              <option value="Reps">Reps</option>
            </Select>
          </div>
          <div className="mb-5">
            <Select
              label="Muscle Group"
              onChange={(e) => dispatch(updateMuscleGroup(e.target.value))}
              value={muscleGroup}
              id="muscleGroup"
              name="muscleGroup"
            >
              <option value="">All</option>
              <option value="Arms">Arms</option>
              <option value="Back">Back</option>
              <option value="Chest">Chest</option>
              <option value="Core">Core</option>
              <option value="Legs">Legs</option>
              <option value="Shoulders">Shoulders</option>
              <option value="Olympic">Olympic</option>
              <option value="Full Body">Full Body</option>
            </Select>
          </div>
          <Button onClick={() => dispatch(clearFilters())}>
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Filters
