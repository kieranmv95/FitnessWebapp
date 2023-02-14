import type { AppProps } from 'next/app'
import { Open_Sans } from '@next/font/google'
import Header from '@/components/Header'
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { setupStore } from '@/store'

const openSans = Open_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={setupStore()}>
      <main className={openSans.className}>
        <Header />
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}
