import { describe, it, expect } from 'vitest'

describe('Basic Test with Separate Config', () => {
  it('should work with separate vitest.config.js', () => {
    expect(2 + 2).toBe(4)
  })

  it('should handle string operations', () => {
    const appName = 'Pendataan Truk App'
    expect(appName).toContain('Truk')
    expect(appName.length).toBeGreaterThan(5)
  })
})