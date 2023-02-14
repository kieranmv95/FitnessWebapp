import type { AppProps } from 'next/app'
import { Open_Sans } from '@next/font/google'
import { Provider } from 'react-redux'
import Header from '@/components/Header'
import { setupStore } from '@/store'
import '@/styles/globals.css'

const openSans = Open_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

const store = setupStore()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={openSans.className}>
        <Header />
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}
