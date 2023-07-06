import siteMetadata from '@/data/siteMetadata'

import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

export default function Giscus() {
  const ref = useRef(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  // https://github.com/giscus/giscus/tree/main/styles/themes
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light'

  const {
    repo,
    repositoryId,
    category,
    categoryId,
    mapping,
    reactions,
    metadata,
    inputPosition,
    lang,
  } = siteMetadata?.comment?.giscusConfig

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const scriptElem = document.createElement('script')
    scriptElem.src = 'https://giscus.app/client.js'
    scriptElem.async = true
    scriptElem.crossOrigin = 'anonymous'

    scriptElem.setAttribute('data-repo', repo)
    scriptElem.setAttribute('data-repo-id', repositoryId)
    scriptElem.setAttribute('data-category', category)
    scriptElem.setAttribute('data-category-id', categoryId)
    scriptElem.setAttribute('data-mapping', mapping)
    scriptElem.setAttribute('data-strict', '0')
    scriptElem.setAttribute('data-reactions-enabled', reactions)
    scriptElem.setAttribute('data-emit-metadata', metadata)
    scriptElem.setAttribute('data-input-position', inputPosition)
    scriptElem.setAttribute('data-theme', theme)
    scriptElem.setAttribute('data-lang', lang)

    ref.current.appendChild(scriptElem)
    setMounted(true)
  }, [])

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    if (!mounted) return

    const iframe = document.querySelector('iframe.giscus-frame')
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app')
  }, [theme, mounted])

  useEffect(() => {
    const iframe = document.querySelector('iframe.giscus-frame')
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { term: router.asPath } } },
      'https://giscus.app'
    )
  }, [router.asPath])

  return <section ref={ref} />
}
