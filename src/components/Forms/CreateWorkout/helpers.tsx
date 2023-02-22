import cx from 'classnames'

export const getSetHeader = (category: string) => {
  const sharedClass = 'grid gap-1 mb-1 text-xs font-bold'

  switch (category) {
    case 'Dumbbell':
    case 'Barbell':
    case 'Cable':
    case 'Machine':
    case 'Kettlebell':
      return (
        <div
          className={cx(sharedClass, 'grid-cols-[2.125rem_1fr_1fr_2.125rem]')}
        >
          <p>Set</p>
          <p>KG</p>
          <p>Reps</p>
        </div>
      )
    case 'Bodyweight':
      return (
        <div
          className={cx(sharedClass, 'grid-cols-[2.125rem_1fr_1fr_2.125rem]')}
        >
          <p>Set</p>
          <p>KG (+)</p>
          <p>Reps</p>
        </div>
      )
    case 'Assisted Bodyweight':
      return (
        <div
          className={cx(sharedClass, 'grid-cols-[2.125rem_1fr_1fr_2.125rem]')}
        >
          <p>Set</p>
          <p>KG (-)</p>
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
    case 'Cardio':
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

export const getSetShape = (category: string) => {
  switch (category) {
    case 'Dumbbell':
    case 'Barbell':
    case 'Cable':
    case 'Machine':
    case 'Kettlebell':
      return {
        weight: '',
        reps: '',
      }
    case 'Reps':
      return {
        reps: '',
      }
    case 'Cardio':
      return {
        distance: '',
        time: {
          hh: '',
          mm: '',
          ss: '',
        },
      }
    default:
      return {
        weight: '',
        reps: '',
      }
  }
}

export const getSetComponent = (category: string) => {
  switch (category) {
    case 'Dumbbell':
    case 'Barbell':
    case 'Cable':
    case 'Machine':
    case 'Kettlebell':
    case 'Bodyweight':
    case 'Assisted Bodyweight':
      return 'WeightAndReps'
    case 'Reps':
      return 'Reps'
    case 'Cardio':
      return 'DistanceAndTime'
    default:
      return 'WeightAndReps'
  }
}
