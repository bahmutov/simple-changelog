const R = require('ramda')
const leavePublic = require('new-public-commits').leavePublic
const newPublicCommits = require('new-public-commits').newPublicCommits
const { stripIndent } = require('common-tags')
const la = require('lazy-ass')
const is = require('check-more-types')
const simple = require('simple-commit-message')
const ggit = require('ggit')
const debug = require('debug')('simple-changelog')
const utils = require('./utils')

const isCommit = is.schema({
  id: is.commitId,
  subject: is.unemptyString,
  type: is.unemptyString,
  scope: is.maybe.unemptyString
})

function groupCommits (commits) {
  const parsed = commits
    .map(c => {
      const p = simple.parse(c.message)
      if (p) {
        p.id = c.id
      }
      return p
    })
    .filter(is.defined)
  const grouped = R.groupBy(R.prop('type'), parsed)
  return grouped
}

function commitString (commit) {
  la(isCommit(commit), 'invalid commit format', commit)
  return '* ' + commit.subject + ' (' + commit.id + ')'
}

function commitSubjectList (commits) {
  return commits.map(commitString).join('\n')
}

function scopeCommits (commits) {
  const grouped = R.groupBy(R.prop('scope'))(commits)
  let s = ''
  Object.keys(grouped).forEach(scope => {
    const scopedCommits = grouped[scope]
    if (scope !== 'undefined') {
      s += '### ' + scope + '\n'
    }
    s += commitSubjectList(scopedCommits) + '\n'
  })
  return s
}

function commitsToString (commits) {
  const filtered = leavePublic(commits)
  const grouped = groupCommits(filtered)
  let msg = ''

  if (is.array(grouped.major)) {
    msg += '## Breaking major changes 🔥\n' + scopeCommits(grouped.major) + '\n'
  }
  if (is.array(grouped.feat)) {
    msg += '## New features 👍\n' + scopeCommits(grouped.feat) + '\n'
  }
  if (is.array(grouped.fix)) {
    msg += '## Bug fixes ✅\n' + scopeCommits(grouped.fix) + '\n'
  }
  return msg
}

function versionAndCommitsToLog (version, commits) {
  const date = utils.getDateString()
  const head = stripIndent`
    <a name="${version}"></a>
    # ${version} (${date})
  `
  const commitsLog = commitsToString(commits)
  return head + '\n' + commitsLog
}

function formChangelog (version, n) {
  la(is.unemptyString(version), 'missing release version')
  if (arguments.length === 2) {
    la(is.positive(n), 'invalid number of commits', n)
  }
  return newPublicCommits()
    .then(commits => {
      debug('found %d public commit(s)', commits.length)

      if (is.empty(commits)) {
        if (n) {
          debug('getting commits after last tag')
          return ggit.commits.afterLastTag().then(list => {
            debug('%d commit(s) after last tag', list.length)
            if (list.length < n) {
              return list
            } else {
              return commits
            }
          })
        }
      }
      return commits
    })
    .then(commits => versionAndCommitsToLog(version, commits))
}

module.exports = {
  formChangelog,
  versionAndCommitsToLog,
  commitsToString,
  groupCommits
}
