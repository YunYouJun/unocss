import { CSSEntries, Rule } from '@unocss/core'
import { directionMap, handler as h } from '@unocss/preset-mini/utils'

const directionSize = (prefix: string) => ([_, direction, size]: string[]): CSSEntries | undefined => {
  const v = h.bracket.rem.fraction.cssvar(size)
  if (v)
    return directionMap[direction].map(i => [prefix + i, v])
}

export const spaces: Rule[] = [
  [/^space-?([xy])-?(-?.+)$/, (match) => {
    const [, direction, size] = match
    if (size === 'reverse')
      return { [`--un-space-${direction}-reverse`]: 1 }

    const results = directionSize('margin')(match)?.map((item) => {
      const value = item[0].endsWith('right') || item[0].endsWith('bottom')
        ? `calc(${item[1]} * var(--un-space-${direction}-reverse))`
        : `calc(${item[1]} * calc(1 - var(--un-space-${direction}-reverse)))`
      return [item[0], value] as typeof item
    })
    if (results) {
      return [
        [`--un-space-${direction}-reverse`, 0],
        ...results,
      ]
    }
  }],
]
