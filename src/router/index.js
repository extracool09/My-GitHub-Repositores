import { createRouter, createWebHistory } from 'vue-router'
import RepositoryList from '@/views/RepositoryList.vue'
import RepositoryDetails from '@/views/RepositoryDetails.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
     

routes: [
    {
        path: '/',
        name: 'RepositoryList',
        component: RepositoryList
    }, 
  
      
  {
    path: '/repository/:repoId',
    name: 'RepositoryDetails',
    component: RepositoryDetails,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]


})

export default router
