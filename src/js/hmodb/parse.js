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
      type: 'include',
      weekday: '6',
      month: '7,9,11'
    },
    {
      type: 'exclude',
      weekday: '2',
      month: '7,9,11',
      monthweek: '-5'
    },
    {
      type: 'onlyif',
      //"date_range": ["xxxx-06-15|xxxx-09-15", "xxxx-06-15|xxxx-09-15"], //
      date_range: [['xxxx-06-15', 'xxxx-08-15']] //
    }
  ],
  last_update: [1561805184, 'admin|user|...']
}

// Check if the given date satisfies the rule
// A date satisfies a rule if and only if it satisfies all the patterns it contains
function date_satisfies_rule(pDate, rule) {
  if (rule.weekday) {
    if (!rule.weekday[0].includes(pDate.weekday)) return false
  }
  if (rule.month) {
    if (!rule.month[0].includes(pDate.month)) return false
  }
  if (rule.monthday) {
    if (
      !rule.monthday.includes(pDate.monthday.start) &&
      !rule.monthday.includes(pDate.monthday.end)
    )
      return false
  }
  if (rule.monthweek) {
    if (
      !rule.monthweek.includes(pDate.monthweek.start) &&
      !rule.monthweek.includes(pDate.monthweek.end)
    )
      return false
  }
  if (rule.date_list) {
    // TODO: allow xxxx placeholder?
    if (!rule.date_list.includes(pDate.string)) return false
  }
  if (rule.date_range) {
    var matches = false
    for (var i = 0; i < rule.date_range.length; i++) {
      var start = rule.date_range[i][0].replace('xxxx', pDate.year)
      var end = rule.date_range[i][1].replace('xxxx', pDate.year)
      if ((start <= pDate.string) & (pDate.string <= end)) matches = true
    }
    if (!matches) return false
  }

  return true
}

function parse_date(date) {
  // Prepare some auxiliary data
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var monthday = date.getDate()
  var daysinmonth = new Date(year, month, 0).getDate() // number of days in this month

  // Build parsed data object
  var pDate = {
    month: month,
    year: year,
    monthday: {
      start: monthday, // Day of the month counting from the start of the month
      end: daysinmonth - monthday // Day of the month counting from the end of the month
    },
    monthweek: {
      // eg. the first Thursday of the month has monthweek.start = 1, the last one has monthweek.end = 1
      start: Math.ceil(monthday / 7), // Week of the month, counting from the start
      end: Math.ceil((daysinmonth - monthday) / 7) // Week of the month counting from the end
    },
    string: year + '-' + pad(month, 2) + '-' + pad(monthday, 2),
    weekday: date.getDay()
  }

  if (pDate.weekday == 0) {
    pDate.weekday = 'S'
  }
  // TODO?
  // If it is Sunday, show Sunday (S) and Sunday vigils (s)
  // If it is Saturday, show Saturday (6) and Sunday vigils (s)

  return pDate
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
 * Check if the given date matches the given event.
 */
function is_on(event, raw_date) {
  var pDate = parse_date(raw_date) //this step should be part of the top-level function, so aDate is received as a normal standard date.

  console.log('Queried date is: ', pDate)

  if (!event.weekday.includes(pDate.weekday)) return

  // Iterate through all advanced rules
  var included = false
  for (var i = 0; i < event.advanced.length; i++) {
    var rule = event.advanced[i]

    // Check if the given date satisfies the rule
    var satisfy = date_satisfies_rule(pDate, rule)

    // If we satisfy an inclusion rule, consider it as included
    if (rule.type == 'include' && satisfy) {
      console.log('Event satisfies include rule:', rule)
      included = true
    }
    // If we satisfy an exclusion rule, the event is not on, return false
    if (rule.type == 'exclude' && satisfy) {
      console.log('Event satisfies exclude rule:', rule)
      return false
    }
    // If we not satisfy an onlyif rule, the event is not on, return false
    if (rule.type == 'onlyif' && !satisfy) {
      console.log('Event does NOT satisfy onlyif rule:', rule)
      return false
    }
  }

  if (!included) {
    console.log('Event does NOT satisfy any include rule')
    return false
  }
  // Return
  console.log('Event is on today!')
  return true
}

var today = new Date()

is_on(event, today)

export default is_on
