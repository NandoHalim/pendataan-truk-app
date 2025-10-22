import { describe, it, expect } from 'vitest'

describe('Setup Test', () => {
  it('should work', () => {
    expect(1 + 1).toBe(2)
  })

  it('should have proper environment', () => {
    expect(typeof window).not.toBe('undefined')
    expect(typeof document).not.toBe('undefined')
  })
})