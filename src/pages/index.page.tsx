import Link from 'next/link'
import Seo from '@/components/Seo'

export default function Home() {
  return (
    <>
      <Seo
        title="Home"
        description="Fitness App, your one stop shop for gym tracking"
      />
      <h1>Fitness App</h1>
      <Link href="/login">Login</Link>
    </>
  )
}
