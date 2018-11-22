// main.js

import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import Moment from 'moment'
import App from './App.vue'

import AjouterPatient from './components/AjouterPatient.vue'
import ModifierPatient from './components/ModifierPatient.vue'
import FichePatient from './components/FichePatient.vue'
import Patients from './components/Patients.vue'
import Accueil from './components/Accueil.vue'

Vue.use(VueFire)
Vue.use(VueRouter)
Vue.use(Moment)
Vue.config.productionTip = false

const routes = [
  {
    name: 'Accueil',
    path: '/',
    component: Accueil
  },
  {
        name: 'AjouterPatient',
        path: '/ajouter',
        component: AjouterPatient
  },
  {
      name: 'ModifierPatient',
      path: '/modifier/:id',
      component: ModifierPatient
  },
  {
      name: 'Patients',
      path: '/patients',
      component: Patients
  },
  {
      name: 'FichePatient',
      path: '/fiche/:id',
      component: FichePatient
  },
];

const router = new VueRouter({ mode: 'history', routes: routes });

Vue.filter('date', function(value, format) {
  if (value) {
    return Moment(String(value.toDate())).format(format)
  }
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')