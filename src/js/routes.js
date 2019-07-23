import RealTimePage from "../pages/real-time.vue";
import AboutPage from "../pages/about.vue";
import FormPage from "../pages/form.vue";

import DynamicRoutePage from "../pages/dynamic-route.vue";
import RequestAndLoad from "../pages/request-and-load.vue";
import NotFoundPage from "../pages/404.vue";
import QuickLinks from "../pages/QuickLinks.vue";
import PanelLeft from "../pages/panel-left.vue";
import PlansPage from "../pages/Plans.vue";
import MessagesPage from "../pages/Messages.vue";
import CalendarPage from "../pages/Calendar.vue";
import HomePage from "../pages/Home.vue";
import EventsPage from "../pages/Events.vue";
import AdvancedPage from "../pages/Advanced.vue";
import EventPatternPage from "../pages/EventPattern.vue";

var routes = [
  {
    path: "/pattern/:patternString",
    component: EventPatternPage,
    props: true
  },
  {
    path: "/advanced/id/:id",
    component: AdvancedPage,
    props: true
  },
  {
    path: "/events/",
    component: EventsPage
  },
  {
    path: "/home/",
    component: HomePage
  },
  {
    path: "/calendar/",
    component: CalendarPage
  },
  {
    path: "/messages/",
    component: MessagesPage
  },
  {
    path: "/plans/",
    component: PlansPage
  },
  {
    path: "/panel-left/",
    component: PanelLeft
  },
  {
    path: "/quick-links/",
    component: QuickLinks
  },
  {
    path: "/real-time/",
    component: RealTimePage
  },
  {
    path: "/about/",
    component: AboutPage
  },
  {
    path: "/form/",
    component: FormPage
  },

  {
    path: "/dynamic-route/blog/:blogId/post/:postId/",
    component: DynamicRoutePage
  },
  {
    path: "/request-and-load/user/:userId/",
    async: function(routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function() {
        // We got user data from request
        var user = {
          firstName: "Vladimir",
          lastName: "Kharlampidi",
          about: "Hello, i am creator of Framework7! Hope you like it!",
          links: [
            {
              title: "Framework7 Website",
              url: "http://framework7.io"
            },
            {
              title: "Framework7 Forum",
              url: "http://forum.framework7.io"
            }
          ]
        };
        // Hide Preloader
        app.preloader.hide();

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
        );
      }, 1000);
    }
  },
  {
    path: "(.*)",
    component: NotFoundPage
  }
];

export default routes;
