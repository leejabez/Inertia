import Index from '../pages/Index.vue'
import Dashboard from '../pages/Dashboard/View.vue'
import Login from '../pages/Auth/Login.vue'
import Signup from '../pages/Auth/Signup.vue'
import Chat from '../pages/Dashboard/Chat.vue'
import Discover from '../pages/Discover.vue'
import Profile from '../pages/Profile.vue'
import Journal from '../pages/Dashboard/Journal.vue'
import DashboardIndex from '../pages/Dashboard/Index.vue'

export default [{
        path: '/',
        component: Index
    },
    {
        path: '/login',
        component: Login
    }, {
        path: '/signup',
        component: Signup
    }, {
        path: '/dashboard',
        component: Dashboard,
        meta: {
            auth: true
        },
        children: [{
            path: '',
            component: DashboardIndex
        }, {
            path: 'chat',
            component: Chat
        }, {
            path: 'journal',
            component: Journal
        }, ]
    },
    {
        path: '/discover',
        component: Discover,
        meta: {

        },
    },
    {
        path: '/resources',
        component: Resources,
        meta: {
        },
    },
    {
        path: '/profile',
        component: Profile,
        meta: {

        },
    },

]