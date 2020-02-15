import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/Index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requiresVisitor: true,
    },
    component: () => import('../auth/views/Login.vue'),
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../auth/views/Logout.vue'),
  },
  {
    path: '/admin/home',
    name: 'home',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../admin/views/Home.vue'),
  },
  {
    path: '/admin/group/create',
    name: 'photographyGroupCreate',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../admin/views/PhotographyGroupStore.vue'),
  },
  {
    path: '/admin/group/edit/:id',
    name: 'photographyGroupEdit',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../admin/views/PhotographyGroupStore.vue'),
  },
  {
    path: '/admin/gallery/create',
    name: 'galleryCreate',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../admin/views/GalleryStore.vue'),
  },
  {
    path: '/admin/gallery/edit/:id',
    name: 'editGallery',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../admin/views/GalleryStore.vue'),
  },
  {
    path: '/admin/gallery/get/:id',
    name: 'singleGallery',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../admin/views/Gallery.vue'),
  },
  {
    path: '/admin/photography/create',
    name: 'photographyCreate',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../admin/views/PhotographyStore.vue'),
  },
  {
    path: '/gallery/:id',
    name: 'gallery',
    component: () => import('../views/Gallery.vue'),
  },
  {
    path: '/admin/photography/get/:id',
    name: 'singlePhotography',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../admin/views/Photography.vue'),
  },
  {
    path: '/admin/photography/section/add/:id',
    name: 'sectionCreate',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../admin/views/SectionStore.vue'),
  },
  {
    path: '/photography/:id',
    name: 'photography',
    component: () => import('../views/Photography.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
