import * as R from 'ramda'

export const parseTitle: (content: string) => string = R.pipe(
  R.split('\n'),
  R.head,
  R.replace('#', ' '),
  R.replace(/-/g, ' '),
  R.trim,
)

export const parseContent: (content: string) => string[] = R.pipe(
  content => '\n' + content,
  R.replace(/`/g, ''),
  R.split(/\n(?=# )/),
  R.filter((part: string) => part.trim() !== '')
)
