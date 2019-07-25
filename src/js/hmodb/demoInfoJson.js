var jsonDemo =
  /*
Queries could be based on
  + location and weekday
  + location and date
  + location
*/
  {
    location: {
      city: 'Pamplona',
      country: 'Spain',
      postcode: '31003',
      region: 'Navarra',
      street: 'Francisco Bergamin Kalea, 17. Plaza de la Cruz',
      formatted_address:
        'Calle de Francisco Bergamin Kalea, 17, 31003 Pamplona, Navarra',
      google_maps_id: 'UREBGQgkJMymaV8R8',
      latitude: '42.8116805499732',
      longitude: '-1.64030424472583',
      distance: '0.163954353899143',
      directions: null
    },
    contact: {
      email: 'sanmiguelpamplona@gmail.com',
      priest: 'Oroz Arraiza, Luis María',
      phone_number: '(34) 948.243.518',
      url: 'http://www.parroquiasanmiguel.com',
      mass_times_url:
        'https://www.parroquiasanmiguel.com/nuestra-parroquia/horario-de-misas-en-pamplona/',
      confession_times_url:
        'https://www.parroquiasanmiguel.com/celebracion-de-los-sacramentos/confesion/',
      last_update: [1561805184, 'admin|user|...']
    },
    about: {
      church_types: [
        'Parish',
        'Cathedral',
        'Shrine',
        'Basilica',
        'Chaplaincy',
        '...'
      ], //one church may be simultaneously a basilica, a cathedral, and a shrine. http://catholicstraightanswers.com/what-is-the-difference-between-a-basilica-a-cathedral-and-a-shrine/
      diocese: 'Pamplona y Tudela',
      diocese_type: 'Archdiocese',
      name: 'San Miguel',
      rite_type: 'Roman-Latin',
      id: '113933',
      languages: ['Spanish', 'Basque'],
      feast_calendar_id: 15,
      comments: '',
      last_update: [1561805184, ''],
      wheel_chair_access: null
    },
    events: [
      {
        id: 'Gxtupz834',
        color: '#4caf50', //for calendar display and visual association.
        type: 'Mass', //Mass|Confessions|Adoration|Open|Praise&Worship|Rosary|Marriage Prep|Talk|...
        tags: [
          'Youth',
          'Sign language',
          'Tridentine rite',
          'German',
          'Side Chapel',
          'Confession available during event (dudo de esta tag)'
        ],
        comment: 'Confessions queue closes at 12.30pm',
        url: '', // link with more info about the event
        time_start: '7:45',
        time_end: '8:15',
        duration: 90,
        weekday: '123456sSfFp', //1-Monday,...,6-satuday morning, s-sunday vigil, S-Sunday, f-feast vigil, F-Feast,p-publicholiday
        advanced: [
          {
            type: 'onlyif|exclude|move|cancel',
            monthday: '1,2,...,30,31', // list of comma separated values, null to include all
            month: '1,2,...,11,12', // list of comma separated values, null to include all
            monthweek: '1,2,3,4,5,-1,-2,-3,-4,-5',
            weekday: '123456sSfFp', // null to include all
            date_range: ['xxxx-06-15', 'xxxx-09-10'], // summer holidays (eg 15th June to 10th September)
            date_list: ['2019-06-15', '2019-05-18', '...'], // list of dates, null to include all
            // note this way alphabetical and calendar order coincide, allowing direct string comparisons "2019-05-08">"2019-08-16"
            description: 'sample item'
          },
          {
            // exclude summer holidays (eg 15th June to 10th September)
            type: 'exclude',
            date_range: ['xxxx-06-15', 'xxxx-09-10'],
            description:
              'Exclude summer holidays (eg 15th June to 10th September)'
          },
          {
            // event only happens on the last Thursday of the month, on even months
            type: 'onlyif',
            weekday: '4',
            month: '2,4,6,8,10,12',
            monthweek: '-1',
            description:
              'Event only happens on the last Thursday of the month, on even months'
          },
          {
            // event does not occur when it falls on the 7th July/August, and it is Friday or vigil day (sf)
            type: 'exclude',
            weekday: '6sf',
            month: '7',
            monthday: '7,8',
            description:
              'Event does not occur when it falls on the 7th July/August, and it is Friday or vigil day (sf)'
          },
          {
            // event is cancelled on the 13th and 5th September 2019
            type: 'cancel',
            date_list: ['2019-09-13', '2019-09-15'],
            description: 'event is cancelled on the 13th and 5th September 2019'
          },
          {
            // event is moved to the previous day if it falls on a sunday or feast day
            type: 'move',
            move: -1440, //60*24
            weekday: 'SF',
            description:
              'Event is moved to the previous day if it falls on a sunday or feast day'
          }
        ],

        last_update: [1561805184, 'admin|user|...']
      },
      {
        id: 'Yuudgj734',
        color: '#e91e63', //for calendar display and visual association.
        type: 'Mass',
        tags: [
          'Youth',
          'Sign language',
          'Tridentine rite',
          'German',
          'Side Chapel',
          'Confession available during event (dudo de esta tag)'
        ],
        comment: 'Confessions queue closes at 12.30pm',
        url: '', // link with more info about the event
        time_start: '19:00',
        time_end: '20:30',
        duration: 30,
        weekday: '123456sSfFp', //1-Monday,...,6-satuday morning, s-sunday vigil, S-Sunday, f-feast vigil, F-Feast,p-publicholiday
        advanced: [
          {
            type: 'onlyif|exclude|move|cancel',
            monthday: '1,2,...,30,31', // list of comma separated values, null to include all
            month: '1,2,...,11,12', // list of comma separated values, null to include all
            monthweek: '1,2,3,4,5,-1,-2,-3,-4,-5',
            weekday: '123456sSfFp', // null to include all
            date_range: ['xxxx-06-15', 'xxxx-09-10'], // summer holidays (eg 15th June to 10th September)
            date_list: ['2019-06-15', '2019-05-18', '...'], // list of dates, null to include all
            // note this way alphabetical and calendar order coincide, allowing direct string comparisons "2019-05-08">"2019-08-16"
            description: 'sample item 2'
          },
          {
            // exclude summer holidays (eg 15th June to 10th September)
            type: 'exclude',
            date_range: ['xxxx-06-15', 'xxxx-09-10'],
            description:
              'exclude summer holidays (eg 15th June to 10th September)'
          },
          {
            // event only happens on the last Thursday of the month, on even months
            type: 'onlyif',
            weekday: '4',
            month: '2,4,6,8,10,12',
            monthweek: '-1',
            description:
              'event only happens on the last Thursday of the month, on even months'
          },
          {
            // event does not occur when it falls on the 7th July/August, and it is Friday or vigil day (sf)
            type: 'exclude',
            weekday: '6sf',
            month: '7',
            monthday: '7,8',
            description:
              'event does not occur when it falls on the 7th July/August, and it is Friday or vigil day (sf)'
          },
          {
            // event is cancelled on the 13th and 5th September 2019
            type: 'cancel',
            date_list: ['2019-09-13', '2019-09-15'],
            description: 'event is cancelled on the 13th and 5th September 2019'
          },
          {
            // event is moved to the previous day if it falls on a sunday or feast day
            type: 'move',
            move: -1440, //60*24
            weekday: 'SF',
            description:
              'event is moved to the previous day if it falls on a sunday or feast day'
          }
        ],

        last_update: [1561805234, 'admin|user|...']
      }
    ]
  }

var jsonDemo2 = { events: [] }

fetch(
  'http://thecatholicdb.com/api/select.php?json={"apiKey":"invited034","sql":"select json from temples where temple_id=4"}'
)
  .then(response => response.json())
  .then(data => {
    jsonDemo = JSON.parse(decodeURIComponent(data[0].json))
  })

export { jsonDemo }
export { jsonDemo2 }
