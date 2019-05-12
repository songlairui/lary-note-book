import MarkdownIt from 'markdown-it'

import emoji from 'markdown-it-emoji'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import deflist from 'markdown-it-deflist'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import katex from 'markdown-it-katex'
import tasklists from 'markdown-it-task-lists'
import container from 'markdown-it-container'
// import toc from 'markdown-it-toc-and-anchor'

export default function() {
  const baseMd = new MarkdownIt()
  const md = new MarkdownIt()
  md.use(subscript)
    .use(container, 'warning')
    .use(superscript)
    .use(footnote)
    .use(deflist)
    .use(abbreviation)
    .use(insert)
    .use(mark)
    .use(katex, { throwOnError: false, errorColor: ' #cc0000' })
    .use(tasklists, { enabled: true })
    .use(emoji)
  md.base = baseMd
  return md
}
