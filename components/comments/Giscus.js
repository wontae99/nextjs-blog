import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'

import siteMetadata from '@/data/siteMetadata'

const Giscus = () => {
  const ref = useRef(null)
  const router = useRouter()

  const { theme, resolvedTheme } = useTheme()
  const commentsTheme =
    siteMetadata.comment.giscusConfig.themeURL === ''
      ? theme === 'dark' || resolvedTheme === 'dark'
        ? siteMetadata.comment.giscusConfig.darkTheme
        : siteMetadata.comment.giscusConfig.theme
      : siteMetadata.comment.giscusConfig.themeURL

  const COMMENTS_ID = 'comments-container'

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

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    scriptElem.async = true
    script.setAttribute('data-repo', repo)
    script.setAttribute('data-repo-id', repositoryId)
    script.setAttribute('data-category', category)
    script.setAttribute('data-category-id', categoryId)
    script.setAttribute('data-mapping', mapping)
    script.setAttribute('data-reactions-enabled', reactions)
    script.setAttribute('data-emit-metadata', metadata)
    script.setAttribute('data-input-position', inputPosition)
    script.setAttribute('data-lang', lang)
    script.setAttribute('data-theme', commentsTheme)
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    ref.current.appendChild(script)
  }, [])

  // Reload on theme change
  useEffect(() => {
    const iframe = document.querySelector < HTMLIFrameElement > 'iframe.giscus-frame'
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { term: router.asPath, theme } } },
      'https://giscus.app'
    )
  }, [router.asPath, theme])
  // useEffect(() => {
  //   const iframe = document.querySelector('iframe.giscus-frame')
  //   if (!iframe) return
  //   LoadComments()
  // }, [LoadComments])

  return (
    <div ref={ref} className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300">
      {/* {enableLoadComments && <button onClick={LoadComments}>Load Comments</button>} */}
      <div className="giscus w-full" id={COMMENTS_ID} />
    </div>
  )
}

export default Giscus
