import RealTimePage from '../pages/real-time.vue'
import AboutPage from '../pages/about.vue'
import FormPage from '../pages/form.vue'

import DynamicRoutePage from '../pages/dynamic-route.vue'
import RequestAndLoad from '../pages/request-and-load.vue'
import NotFoundPage from '../pages/404.vue'
import PanelLeft from '../pages/panel-left.vue'
import PlansPage from '../pages/Plans.vue'
import MessagesPage from '../pages/Messages.vue'
import CalendarPage from '../pages/Calendar.vue'
import HomePage from '../pages/Home.vue'
import EventsListPage from '../pages/EventsList.vue'
import EventRulesPage from '../pages/EventRules.vue'
import RuleDefinitionPage from '../pages/RuleDefinition.vue'
import SettingsPage from '../pages/Settings.vue'

var routes = [
  {
    path: '/settings/',
    component: SettingsPage
  },
  {
    path: '/pattern/:patternString',
    component: RuleDefinitionPage,
    props: true
  },
  {
    path: '/advanced/id/:id',
    component: EventRulesPage,
    props: true
  },
  {
    path: '/events/',
    component: EventsListPage
  },
  {
    path: '/home/',
    component: HomePage
  },
  {
    path: '/calendar/',
    component: CalendarPage
  },
  {
    path: '/messages/',
    component: MessagesPage
  },
  {
    path: '/plans/',
    component: PlansPage
  },
  {
    path: '/panel-left/',
    component: PanelLeft
  },

  {
    path: '/real-time/',
    component: RealTimePage
  },
  {
    path: '/about/',
    component: AboutPage
  },
  {
    path: '/form/',
    component: FormPage
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function(routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this

      // App instance
      var app = router.app

      // Show Preloader
      app.preloader.show()

      // User ID from request
      var userId = routeTo.params.userId

      // Simulate Ajax Request
      setTimeout(function() {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io'
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io'
            }
          ]
        }
        // Hide Preloader
        app.preloader.hide()

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad
          },
          {
            context: {
              user: user
            }
          }
        )
      }, 1000)
    }
  },
  {
    path: '(.*)',
    component: NotFoundPage
  }
]

export default routes
