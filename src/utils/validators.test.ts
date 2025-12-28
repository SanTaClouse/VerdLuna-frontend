import { describe, it, expect } from 'vitest'
import { isValidEmail, isValidPhone, isPositiveNumber } from './validators.js'

describe('Validators', () => {
  describe('isValidEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
      expect(isValidEmail('test+tag@email.com')).toBe(true)
    })

    it('should return false for invalid email addresses', () => {
      expect(isValidEmail('invalid.email')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('')).toBe(false)
      expect(isValidEmail('test @example.com')).toBe(false)
    })
  })

  describe('isValidPhone', () => {
    it('should return true for valid 10-digit phone numbers', () => {
      expect(isValidPhone('1234567890')).toBe(true)
      expect(isValidPhone('9876543210')).toBe(true)
    })

    it('should return true for phone numbers with formatting', () => {
      expect(isValidPhone('(123) 456-7890')).toBe(true)
      expect(isValidPhone('123-456-7890')).toBe(true)
      expect(isValidPhone('123 456 7890')).toBe(true)
    })

    it('should return false for invalid phone numbers', () => {
      expect(isValidPhone('123')).toBe(false)
      expect(isValidPhone('12345')).toBe(false)
      expect(isValidPhone('123456789012')).toBe(false) // más de 10 dígitos
      expect(isValidPhone('')).toBe(false)
      expect(isValidPhone('abcdefghij')).toBe(false)
    })
  })

  describe('isPositiveNumber', () => {
    it('should return true for positive numbers', () => {
      expect(isPositiveNumber(1)).toBe(true)
      expect(isPositiveNumber(100)).toBe(true)
      expect(isPositiveNumber(0.5)).toBe(true)
      expect(isPositiveNumber('5')).toBe(true)
      expect(isPositiveNumber('10.99')).toBe(true)
    })

    it('should return false for zero and negative numbers', () => {
      expect(isPositiveNumber(0)).toBe(false)
      expect(isPositiveNumber(-1)).toBe(false)
      expect(isPositiveNumber(-100)).toBe(false)
      expect(isPositiveNumber('-5')).toBe(false)
    })

    it('should return false for invalid inputs', () => {
      expect(isPositiveNumber('')).toBe(false)
      expect(isPositiveNumber('abc')).toBe(false)
      expect(isPositiveNumber(NaN)).toBe(false)
      expect(isPositiveNumber(undefined)).toBe(false)
      expect(isPositiveNumber(null)).toBe(false)
    })
  })
})
