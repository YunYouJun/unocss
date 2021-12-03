import { expandVariantGroup } from '@unocss/core'
import { describe, test, expect } from 'vitest'

describe('variant-group', () => {
  test('basic', async() => {
    expect(expandVariantGroup('')).eql('')
    expect(expandVariantGroup('a b c')).eql('a b c')
    expect(expandVariantGroup('a:b:c')).eql('a:b:c')
    expect(expandVariantGroup('hello a:(b c) c:(a:b d)')).eql('hello a:b a:c c:a:b c:d')
  })

  test('hoist-important', async() => {
    expect(expandVariantGroup('b:c:d:(!a z)')).eql('!b:c:d:a b:c:d:z')
  })

  test('dash seperator', async() => {
    expect(expandVariantGroup('a-(b c) c-(a:b d)')).eql('a-b a-c c-a:b c-d')
  })
})
