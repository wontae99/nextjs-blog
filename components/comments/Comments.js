import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'

export default function Comments() {
  const { theme, resolvedTheme } = useTheme()
  const commentsTheme =
    siteMetadata.comment.giscusConfig.themeURL === ''
      ? theme === 'dark' || resolvedTheme === 'dark'
        ? siteMetadata.comment.giscusConfig.darkTheme
        : siteMetadata.comment.giscusConfig.theme
      : siteMetadata.comment.giscusConfig.themeURL
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

  return (
    <Giscus
      id="comments"
      repo={repo}
      repoId={repositoryId}
      category={category}
      categoryId={categoryId}
      mapping={mapping}
      term="Welcome to @giscus/react component!"
      reactionsEnabled={reactions}
      emitMetadata={metadata}
      inputPosition={inputPosition}
      theme={commentsTheme}
      lang={lang}
      loading="lazy"
    />
  )
}
