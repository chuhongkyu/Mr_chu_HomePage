import Link from 'next/link'

export default function NotFound() {
  return (
    <div className={'not-found-container'}>
      <h1>404</h1>
      <Link href="/">
        home
      </Link>
    </div>
  )
} 