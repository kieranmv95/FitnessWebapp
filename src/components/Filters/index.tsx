import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import {
  clearFilters,
  updateTextSearch,
  updateEquipment,
  updateMuscleGroup,
  updateType,
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
  const { textSearch, equipment, muscleGroup, type } = useAppSelector(
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
          <div className="grid grid-cols-2 gap-x-3">
            <div>
              <Select
                label="Equipment"
                onChange={(e) => dispatch(updateEquipment(e.target.value))}
                value={equipment}
                id="equipment"
                name="equipment"
              >
                <option value="">All</option>
                <option value="Barbell">Barbell</option>
                <option value="Dumbbell">Dumbbell</option>
                <option value="Bodyweight">Bodyweight</option>
                <option value="Assisted Bodyweight">Assisted Bodyweight</option>
                <option value="Cardio">Cardio</option>
                <option value="Cable">Cable</option>
                <option value="Machine">Machine</option>
                <option value="Kettlebell">Kettlebell</option>
                <option value="Ball">Ball</option>
                <option value="Battle Rope">Battle Rope</option>
                <option value="Skipping Rope">Skipping Rope</option>
                <option value="Band">Band</option>
                <option value="Smith Machine">Smith Machine</option>
                <option value="Bicycle">Bicycle</option>
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
                <option value="Chest">Chest</option>
                <option value="Forearms">Forearms</option>
                <option value="Lats">Lats</option>
                <option value="Middle Back">Middle Back</option>
                <option value="Lower Back">Lower Back</option>
                <option value="Neck">Neck</option>
                <option value="Quadriceps">Quadriceps</option>
                <option value="Hamstrings">Hamstrings</option>
                <option value="Calves">Calves</option>
                <option value="Triceps">Triceps</option>
                <option value="Traps">Traps</option>
                <option value="Shoulders">Shoulders</option>
                <option value="Abdominals">Abdominals</option>
                <option value="Glutes">Glutes</option>
                <option value="Biceps">Biceps</option>
                <option value="Adductors">Adductors</option>
                <option value="Abductors">Abductors</option>
                <option value="Full Body">Full Body</option>
              </Select>
            </div>
            <div>
              <Select
                label="Type"
                onChange={(e) => dispatch(updateType(e.target.value))}
                value={type}
                id="type"
                name="type"
              >
                <option value="">All</option>
                <option value="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
              </Select>
            </div>
          </div>
          {(textSearch || muscleGroup || equipment) && (
            <Button onClick={() => dispatch(clearFilters())} className="mt-2">
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Filters
