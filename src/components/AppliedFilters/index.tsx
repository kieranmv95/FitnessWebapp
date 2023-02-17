import { useAppSelector, useAppDispatch } from '@/hooks/useRedux'
import { clearNamedFilter } from '@/slice/filterSlice'
import { XCircleIcon } from '@heroicons/react/24/solid'
import cx from 'classnames'

type AppliedFiltersProps = {
  results: number
}

const AppliedFilters = ({ results }: AppliedFiltersProps) => {
  const dispatch = useAppDispatch()
  const { textSearch, category, muscleGroup } = useAppSelector(
    (state) => state.filters,
  )

  return (
    <div>
      <p
        className={cx(
          'text-sm inline-block px-3 py-1 rounded-full text-zinc-100 mt-4 md:text-md',
          results ? 'bg-green-500' : 'bg-red-400',
        )}
      >
        <span className="font-bold">{results}</span> results
      </p>
      <div className="flex gap-2 text-zinc-100 text-sm mt-3 flex-wrap">
        {textSearch && (
          <div className="bg-blue-500 px-3 py-1 rounded-full inline-grid grid-cols-[auto_auto] gap-1">
            Search: {textSearch}{' '}
            <XCircleIcon
              className="fill-current h-5 w-5 cursor-pointer"
              onClick={() => dispatch(clearNamedFilter('textSearch'))}
              aria-label="textSearch-clear"
            />
          </div>
        )}
        {category && (
          <div className="bg-blue-500 px-3 py-1 rounded-full inline-grid grid-cols-[auto_auto] gap-1">
            {category}{' '}
            <XCircleIcon
              className="fill-current h-5 w-5 cursor-pointer"
              onClick={() => dispatch(clearNamedFilter('category'))}
              aria-label="category-clear"
            />
          </div>
        )}
        {muscleGroup && (
          <div className="bg-blue-500 px-3 py-1 rounded-full inline-grid grid-cols-[auto_auto] gap-1">
            {muscleGroup}{' '}
            <XCircleIcon
              className="fill-current h-5 w-5 cursor-pointer"
              onClick={() => dispatch(clearNamedFilter('muscleGroup'))}
              aria-label="muscleGroup-clear"
            />
          </div>
        )}
      </div>

      {!results && (
        <div>
          <p className="text-red-500 mt-4 mb-4">
            No exercises found for your current filter. Please try again
          </p>
        </div>
      )}
    </div>
  )
}

export default AppliedFilters
