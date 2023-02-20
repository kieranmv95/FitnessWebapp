import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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

type FilterProps = {
  removeBorder?: boolean
  removeSticky?: boolean
}

const Filters = ({ removeBorder, removeSticky }: FilterProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { textSearch, category, muscleGroup } = useAppSelector(
    (state) => state.filters,
  )

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      dispatch(clearFilters())
    })

    return () => {
      router.events.off('routeChangeStart', () => {
        dispatch(clearFilters())
      })
    }
  }, [])

  return (
    <div className={cx(removeSticky ? '' : 'md:sticky md:top-6')}>
      <div
        className={cx(
          removeBorder
            ? 'border-b pb-4'
            : 'bg-white rounded-md shadow md:shadow-md p-4',
        )}
      >
        <div className="flex gap-3 justify-between">
          <div>
            <h2 className="font-semibold text-lg md:text-xl leading-9">
              Filters
            </h2>
          </div>
          <div className="md:hidden">
            <Button onClick={() => setOpen(!open)}>
              {open ? 'Hide' : 'Show'}
            </Button>
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
          <div className="grid grid-cols-2 gap-3">
            <div>
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
            <div>
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
          </div>
          {(textSearch || muscleGroup || category) && (
            <Button onClick={() => dispatch(clearFilters())}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Filters
