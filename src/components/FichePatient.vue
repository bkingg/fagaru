// Fiche.vue

<template>
  <div class="row">
    <div class="col-sm-8">
      <h1>{{ patient.nom_de_famille }} {{ patient.prenom }}</h1>

      <p>Groupe Sanguin: {{ patient.groupe_sanguin }}</p>
      <p>Sexe: {{ patient.sexe }}</p>
      <p>CNI: {{ patient.cni }}</p>
      <p>Tel: {{ patient.tel }}</p>

      <router-link :to="{ name: 'ModifierPatient', params: {id: patient.id }}" class="btn btn-warning">
        Modifier
      </router-link>
    </div>

    <div class="col-sm-4">
      <notes/>
      <ajouter-note/>
    </div>
  </div>
</template>

<script>
import { db } from '../config/db';
import AjouterNote from './AjouterNote';
import Notes from './Notes';

export default {
  name: 'FichePatient',
  components: {
    AjouterNote,
    Notes
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