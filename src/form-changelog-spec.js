'use strict'

const snapshot = require('snap-shot')
const { stripIndent } = require('common-tags')
const { stubExecOnce } = require('stub-spawn-once')
const sinon = require('sinon')
const utils = require('./utils')

/* eslint-env mocha */
const { formChangelog } = require('./changelog')

describe.only('form changelog', () => {
  beforeEach(() => {
    sinon.stub(utils, 'getDateString').returns('2000-04-20')
  })

  afterEach(() => {
    utils.getDateString.restore()
  })

  describe('from commits', () => {
    const logPretty = stripIndent`
      commit b9511fe8414722268b02d6d454e5ed55ccca216d
      Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>
      Commit: Gleb Bahmutov <gleb.bahmutov@gmail.com>

          update deps

      commit 4422cb3f730d7fbaa187b3e433a3cfc2e382fe50
      Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>
      Commit: Gleb Bahmutov <gleb.bahmutov@gmail.com>

          fix(scopeless): handle scopeless commits, fix #1
    `
    const tags = ''

    beforeEach(() => {
      stubExecOnce('git log --pretty=full', logPretty)
      stubExecOnce('git tag --sort version:refname', tags)
    })

    it('picks semantic commits', () => {
      return snapshot(formChangelog('1.0.0', 10))
    })
  })

  describe('without semantic commits', () => {
    const logPretty = stripIndent`
      commit b9511fe8414722268b02d6d454e5ed55ccca216d
      Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>
      Commit: Gleb Bahmutov <gleb.bahmutov@gmail.com>

          update deps

      commit 4422cb3f730d7fbaa187b3e433a3cfc2e382fe50
      Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>
      Commit: Gleb Bahmutov <gleb.bahmutov@gmail.com>

          handle scopeless commits, fix #1
    `
    const tags = ''

    beforeEach(() => {
      stubExecOnce('git log --pretty=full', logPretty)
      stubExecOnce('git tag --sort version:refname', tags)
    })

    it('picks all commits', () => {
      return snapshot(formChangelog('1.0.0', 10))
    })
  })
})
