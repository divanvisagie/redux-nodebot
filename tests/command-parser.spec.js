'use strict'

import { expect } from 'chai'
import commandParser from '../command-parser/command-parser'

describe('command-parser', () => {
  describe('given "turn on the light" text command', () => {
    it('should return the "ON" command', () => {
      const command = commandParser.getCommandForText('turn on the light')
      expect(command).to.equal('ON')
    })
  })

  describe('given "turn off the light" text command', () => {
    it('should return the "OFF" command', () => {
      const command = commandParser.getCommandForText('turn off the light')
      expect(command).to.equal('OFF')
    })
  })

  describe('given "set the brightness to 50"', () => {
    it(`should return { command: 'BRIGHTNESS', value: 50 }`, () => {
      const command = commandParser.getCommandForText('set the brightness to 50')
      expect(command).to.deep.equal({
        command: 'BRIGHTNESS',
        value: 50
      })
    })
  })

  describe('given "pulse every 500 milliseconds"', () => {
    it(`should return { command: 'PULSE', value: 500 }`, () => {
      const command = commandParser.getCommandForText('pulse every 500 milliseconds')
      expect(command).to.deep.equal({
        command: 'PULSE',
        value: 500
      })
    })
  })
})
