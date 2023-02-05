import { ReactNode } from 'react'
import Head from 'next/head'

type SeoProps = {
  title: string
  description: string
  children?: ReactNode
}

const Seo = ({ title, description, children }: SeoProps) => (
  <Head>
    <title>Fitness App | {title}</title>
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
    {children}
  </Head>
)

export default Seo
