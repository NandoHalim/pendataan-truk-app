import { describe, it, expect } from 'vitest'

describe('Basic Test with Happy DOM', () => {
  it('should pass basic arithmetic', () => {
    expect(1 + 1).toBe(2)
  })

  it('should have DOM environment', () => {
    expect(typeof window).not.toBe('undefined')
    expect(typeof document).not.toBe('undefined')
  })

  it('should work with truck data', () => {
    const trucks = ['Truck A', 'Truck B', 'Truck C']
    expect(trucks).toHaveLength(3)
    expect(trucks).toContain('Truck A')
  })
})