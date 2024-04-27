import { main } from 'fwk-quasar'
import Admin from '../pages/admin/index.vue'
import Ring from '../pages/ring/index.vue'
import Commands from '../pages/commands/index.vue'
import Photo from '../pages/photo/index.vue'
import Estilos from '../pages/estilos/index.vue'

const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
        ]
    },
    { path: '/admin', component: Admin },
    { path: '/ring', component: Ring },
    { path: '/cmd', component: Commands },
    { path: '/photo', component: Photo },
    { path: '/estilos', component: Estilos },
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/Error404.vue')
    }
]
main.actions.initBeforeRoutes(routes[0].children)
export default routes
