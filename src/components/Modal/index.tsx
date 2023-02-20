import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { closeModal } from '@/slice/modalSlice'
import AddExercise from '@/components/Modal/AddExercise'

export type ModalTypes = 'addExercise'

type ModalComponents = {
  [key in ModalTypes]: () => JSX.Element
}

const components: ModalComponents = {
  addExercise: AddExercise,
}

const Modal = () => {
  const dispatch = useAppDispatch()
  const { modalType, open } = useAppSelector((state) => state.modal)

  if (!open || modalType == '') return null

  const ModalComponent = components[modalType]

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 h-full overflow-x-hidden overflow-y-auto md:inset-0 h-modal bg-black bg-opacity-70"
      onClick={() => dispatch(closeModal())}
    >
      <div className="relative w-full h-full max-w-2xl md:h-auto mx-auto">
        <div
          className="relative bg-white rounded-lg shadow "
          onClick={(e) => e.stopPropagation()}
        >
          <ModalComponent />
        </div>
      </div>
    </div>
  )
}

export default Modal
