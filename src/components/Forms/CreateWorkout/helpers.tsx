import cx from 'classnames'
import { IEquipment, IFormType } from '@/slice/exercisesSlice'

export const getSetHeader = (equipment: IEquipment, form: IFormType) => {
  const sharedClass = 'grid gap-1 mb-1 text-xs font-bold'
  const getString = () => {
    switch (equipment) {
      case 'Bodyweight':
        return 'KG (+)'
      case 'Assisted Bodyweight':
        return 'KG (-)'
      default:
        return 'KG'
    }
  }

  switch (form) {
    case 'WeightAndReps':
      return (
        <div
          className={cx(sharedClass, 'grid-cols-[2.125rem_1fr_1fr_2.125rem]')}
        >
          <p>Set</p>
          <p>{getString()}</p>
          <p>Reps</p>
        </div>
      )
    case 'Reps':
      return (
        <div className={cx(sharedClass, 'grid-cols-[2.125rem_1fr_2.125rem]')}>
          <p>Set</p>
          <p>Reps</p>
        </div>
      )
    case 'DistanceAndTime':
      return (
        <div
          className={cx(
            sharedClass,
            'grid-cols-[2.125rem_1fr_9rem_2.125rem] md:grid-cols-[2.125rem_1fr_15rem_2.125rem]',
          )}
        >
          <p>Set</p>
          <p>Km</p>
          <p>Time</p>
        </div>
      )
    case 'Time':
      return (
        <div
          className={cx(
            sharedClass,
            'grid-cols-[2.125rem_1fr_9rem_2.125rem] md:grid-cols-[2.125rem_1fr_15rem_2.125rem]',
          )}
        >
          <p>Set</p>
          <p>Time</p>
        </div>
      )
    default:
      return (
        <div
          className={cx(sharedClass, 'grid-cols-[2.125rem_1fr_1fr_2.125rem]')}
        >
          <p>Set</p>
          <p>KG</p>
          <p>Reps</p>
        </div>
      )
  }
}

export const getSetShape = (form: IFormType) => {
  switch (form) {
    case 'WeightAndReps':
      return {
        weight: '',
        reps: '',
      }
    case 'Reps':
      return {
        reps: '',
      }
    case 'DistanceAndTime':
      return {
        distance: '',
        time: {
          hh: '',
          mm: '',
          ss: '',
        },
      }
    case 'Time':
      return {
        hh: '',
        mm: '',
        ss: '',
      }
    default:
      return {
        weight: '',
        reps: '',
      }
  }
}

export const getSetComponent = (form: IFormType) => {
  switch (form) {
    case 'WeightAndReps':
      return 'WeightAndReps'
    case 'Reps':
      return 'Reps'
    case 'DistanceAndTime':
      return 'DistanceAndTime'
    // TODO: Create time component
    // case 'Time':
    //   return 'Time'
    default:
      return 'WeightAndReps'
  }
}
