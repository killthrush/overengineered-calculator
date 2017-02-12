require("babel-core").transform("code", {
  presets: ["es2017"]
})

// Expose critical modules as globals
const chai = require('chai')
global.expect = chai.expect
global.assert = chai.assert
global.sinon = require('sinon')

// Allow for a nice fluent syntax for examining sinon spies/stubs/mocks
const sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)
