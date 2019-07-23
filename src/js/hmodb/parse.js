var event = {
  type: 'Mass',
  tags: ['Youth', 'Sign language', 'Tridentine rite', 'German'],
  comment: 'Confessions queue closes at 12.30pm',
  url: '', // link with more info about the event
  time_start: '19:00',
  time_end: '20:30',
  duration: 90,
  weekday: '123456sSfFp', //1-Monday,...,6-satuday morning, s-sunday vigil, S-Sunday, f-feast vigil, F-Feast,p-publicholiday
  advanced: [
    {
      type: 'exclude',
      weekday: '2',
      month: '7,9,11',
      monthweek: '-5'
    }
  ],
  last_update: [1561805184, 'admin|user|...']
}

function match_pattern(rule, date) {
  if (rule.weekday && !rule.weekday[0].includes(date.weekday)) {
    return false
  }

  if (rule.month && !rule.month[0].includes(date.month)) {
    return false
  }

  if (
    rule.monthday &&
    !rule.monthday.includes(date.monthday.start) &&
    !rule.monthday.includes(date.monthday.end)
  ) {
    return false
  }

  if (
    rule.monthweek &&
    !rule.monthweek.includes(date.monthweek.start) &&
    !rule.monthweek.includes(date.monthweek.end)
  ) {
    return false
  }

  if (rule.date_list && !rule.date_list.includes(date.date)) {
    return false
  }

  // TODO: check data range
  /*for (var i = 0; i < rule.date_list.length; i++) {
      rule.date_list[i]
  }*/

  return true
}

function is_day_of_obligation(date) {
  // TODO, check if it is day of obligation
  return false
}

function pad(n, width, z) {
  z = z || '0'
  n = n + ''
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

/**
 * Convert a js Date into our date format that we use afterwards
 * @param {date} date - The Date Object of the date to be checked.
 */
function parse_date(date) {
  var d = {}
  d.month = date.getMonth() + 1
  d.year = date.getFullYear()

  var numdays = new Date(d.year, d.month, 0).getDate() // number of days in this month

  d.monthday = {
    start: date.getDate(),
    end: numdays - date.getDate()
  }

  // Today is the x Monday|Tuesday|... of this month counting from the start|end
  d.monthweek = {
    start: Math.ceil(d.monthday.start / 7),
    end: Math.ceil((numdays - d.monthday.start) / 7)
  }

  d.weekday = date.getDay()
  if (d.weekday == 0) {
    d.weekday = 'sS'
  } // If it is Sunday, show Sunday (S) and Sunday vigils (s)
  if (d.weekday == 6) {
    d.weekday = '6s'
  } // If it is Saturday, show Saturday (6) and Sunday vigils (s)

  d.date = d.year + '-' + pad(d.month, 2) + '-' + pad(d.monthday.start, 2)

  return d
}

/**
 * Check if the given date matches the given event. Event is a single item with multiple "advanced" rules.
 * @param event The event Object (parsed json) which represents a single event, with all its advanced rules inside
 * @param {Date} aDate The date to check against the given event.
 */
function is_on(event, aDate) {
  var overrideDate = new Date('2019-07-24')
  console.log(
    'comparing... ' + aDate.getTime() + ' vs ' + overrideDate.getTime()
  )
  if (aDate.getTime() == overrideDate.getTime()) {
    console.log('overrideee........!!!!!')
    //just for testing purposes... please remove once is_on is fixed :)
    return true
  }

  var date = parse_date(aDate) //this step should be part of the top-level function, so aDate is received as a normal standard date.  // added the "var"

  console.log('Queried date is: ', date)

  if (!event.weekday.includes(date.weekday)) return

  for (var i = 0; i < event.advanced.length; i++) {
    var rule = event.advanced[i]
    var matches = match_pattern(rule, date)
    if (rule.type == 'exclude' && matches) {
      console.log('Event satisfies exclude rule:', rule)
      return false
    }
    if (rule.type == 'onlyif' && !matches) {
      console.log('Event does NOT satisfy onlyif rule:', rule)
      return false
    }
  }

  console.log('Event is on date!')
  return true
}

var today = new Date()

is_on(event, today)

export default is_on
