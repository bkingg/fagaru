// Fiche.vue

<template>
  <div>
    <h1>{{ patient.nom_de_famille }} {{ patient.prenom }}</h1>

    <p>Groupe Sanguin: {{ patient.groupe_sanguin }}</p>
    <p>CNI: {{ patient.cni }}</p>
    <p>Tel: {{ patient.tel }}</p>
  </div>
</template>

<script>
import { db } from '../config/db';

export default {
  components: {
      name: 'FichePatient'
  },
  firebase: {
    patients: db.ref('patients'),
    patientsObj: {
      source: db.ref('patients'),
      asObject: true
    }
  },
  data () {
    return {
      patient: {}
    }
  },
  created() {
		this.patient = this.patientsObj[this.$route.params.id]
  }
}
</script>