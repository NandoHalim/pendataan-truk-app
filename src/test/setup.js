import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest dengan matchers Testing Library
expect.extend(matchers)

// Bersihkan DOM setelah setiap test
afterEach(() => {
  cleanup())
})