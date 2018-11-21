// Fiche.vue

<template>
  <div>
    <h1>{{ patient.nom_de_famille }} {{ patient.prenom }}</h1>

    <p>Groupe Sanguin: {{ patient.groupe_sanguin }}</p>
    <p>CNI: {{ patient.cni }}</p>
    <p>Tel: {{ patient.tel }}</p>

    <router-link :to="{ name: 'ModifierPatient', params: {id: patient.id }}" class="btn btn-warning">
      Modifier
    </router-link>
  </div>
</template>

<script>
import { db } from '../config/db';

export default {
  components: {

  },
  data () {
    return {
      patient: {}
    }
  },
  created () {
    db.collection('patients').doc(this.$route.params.id).get().then(doc => {
      this.patient = { id: doc.id };
      Object.assign(this.patient, doc.data());
    });
  }
}
</script>