import { ReactNode } from 'react'

type FooterProps = {
  children: ReactNode
}

const Footer = ({ children }: FooterProps) => (
  <div className="p-4 md:p-6 space-x-2 border-t border-gray-200 rounded-b">
    {children}
  </div>
)

export default Footer
