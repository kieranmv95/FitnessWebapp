import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth'
import cx from 'classnames'

const Header = () => {
  const router = useRouter()
  const { user, logout } = useFirebaseAuth()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false)

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <header className="bg-zinc-800 text-zinc-100 p-6">
      <nav className="flex flex-wrap items-center justify-between">
        <Link className="font-semibold text-xl mr-6" href="/">
          Fitness App
        </Link>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-2 py-1 border rounded border-zinc-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Bars3Icon className="fill-current h-5 w-5  " />
          </button>
        </div>
        <div
          className={cx(
            'w-full block flex-grow lg:flex lg:items-center lg:w-auto',
            isOpen ? 'block' : 'hidden',
          )}
        >
          <div className="text-sm lg:flex-grow">
            {user.loggedIn && (
              <>
                <Link
                  href="/app"
                  className="block mt-4 lg:inline-block lg:mt-0 mr-4"
                >
                  Dashboard
                </Link>
                <Link
                  href="/app/exercises"
                  className="block mt-4 lg:inline-block lg:mt-0"
                >
                  Exercises
                </Link>
              </>
            )}
          </div>

          <div>
            {user.loggedIn ? (
              <button
                onClick={() => logout()}
                className="inline-block text-sm px-4 py-2 leading-none border rounded border-white hover:border-transparent hover:text-zinc-800 hover:bg-zinc-100 mt-4 lg:mt-0"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="inline-block text-sm px-4 py-2 leading-none border rounded border-white hover:border-transparent hover:text-zinc-800 hover:bg-zinc-100 mt-4 lg:mt-0"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
