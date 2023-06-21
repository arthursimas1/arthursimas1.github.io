import 'styles.css'
import 'custom.css'

import * as React from 'react'
import { useRouter } from 'next/router'
import InjectGtag, * as gtag from 'lib/gtag'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  React.useEffect(() => {
    const handleRouteChange = (url: string) => gtag.pageview(url)

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <>
      { process.env.NODE_ENV === 'production' && <InjectGtag /> }
      {getLayout(<Component {...pageProps} />)}
    </>
  )
}
