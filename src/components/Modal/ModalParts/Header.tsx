import { XCircleIcon } from '@heroicons/react/24/solid'

type HeaderProps = {
  title: string
  closeModal: () => void
}

const Header = ({ title, closeModal }: HeaderProps) => (
  <div className="flex items-start justify-between p-4 md:p-6 border-b rounded-t ">
    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    <button
      type="button"
      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
      data-modal-hide="defaultModal"
      role="button"
      onClick={closeModal}
    >
      <XCircleIcon className="w-5 h-5" />
      <span className="sr-only">Close modal</span>
    </button>
  </div>
)

export default Header
