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
})
