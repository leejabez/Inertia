import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store'
Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    routes
})
router.beforeEach((to, _from, next) => {
    var isAuth = to.matched.some((r) => {
        return r.meta.auth
    })
    if (isAuth) {
        console.log('auth required', store.getters.getUser)
        if (store.getters.getUser) {
            next()
        } else {
            next('/login')
        }
    } else {
        console.log('auth not required')
        next()
    }
})
export default router