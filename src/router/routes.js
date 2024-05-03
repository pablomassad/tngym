import Admin from '../pages/admin/index.vue'
import Bookings from '../pages/bookings/index.vue'
import Shifts from '../pages/shifts/index.vue'
import Login from '../pages/login/index.vue'

const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '/admin', component: Admin },
            { path: '/bookings', component: Bookings },
            { path: '/shifts', component: Bookings }
        ]
    },
    { path: '/login', component: Login },
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/Error404.vue')
    }
]
export default routes
