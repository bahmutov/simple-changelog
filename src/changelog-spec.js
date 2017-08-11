'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const snapshot = require('snap-shot')

/* eslint-env mocha */
const {
  allCommitsToString,
  commitsToString,
  versionAndCommitsToLog,
  groupCommits,
  groupParsedCommits,
  groupedToString
} = require('./changelog')

const commit = 'aaaabbbbccccddddeeeeffff1111222233334444'
const commits = [
  {
    message: 'feat(streams): output stdout and stderr, fixes #1, #2',
    id: commit
  },
  {
    message: 'initial (6f272d6)',
    id: commit
  },
  {
    message: 'limit builds on CI to Node 6 (dfe6bd5)',
    id: commit
  },
  {
    message: 'fix(doc): updated documentation',
    id: commit
  }
]

describe('commits to changelog', () => {
  it('is a function', () => {
    la(is.fn(commitsToString))
  })

  it('forms changelog', () => {
    const log = commitsToString(commits)
    snapshot(log)
  })
})

describe('edge case', () => {
  it('handles scope less commits', () => {
    const commits = [
      {
        firstLine: 'feat: support postinstall commands for dependencies',
        type: 'feat',
        scope: undefined,
        subject: 'support postinstall commands for dependencies'
      }
    ]
    const grouped = groupParsedCommits(commits)
    snapshot(grouped)
    const log = groupedToString(grouped)
    snapshot(log)
  })
})

describe('all commits to changelog', () => {
  it('is a function', () => {
    la(is.fn(allCommitsToString))
  })

  it('forms changelog from all commits', () => {
    const log = allCommitsToString(commits)
    snapshot(log)
  })
})

describe('full changelog message', () => {
  const version = '1.0.2'

  it('version and public commits', () => {
    const MockDate = require('mockdate')
    MockDate.set('4/20/2000')
    const log = versionAndCommitsToLog(version, commits)
    snapshot(log)
    MockDate.reset()
  })
})

describe('group commits by type', () => {
  it('groups', () => {
    const groups = groupCommits(commits)
    snapshot(groups)
  })
})

describe('scopeless commits', () => {
  const commits = [
    {
      message: 'major: first release',
      id: '8e298fcb72441f33ef12de67312f5fed8e665ce4'
    },
    {
      message: 'feat(doc): update readme',
      id: '8e298fcb72441f33ef12de67312f5fed8e660000'
    },
    {
      message: 'major(test): rewrite tests',
      id: '8e298fcb72441f33ef12de67312fbbbd8e660000'
    }
  ]

  it('creates changelog', () => {
    const log = commitsToString(commits)
    snapshot(log)
  })
})
