// Patients
<template>
  <div>
    <h1>Patients</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nom de famille</th>
          <th>Prénom</th>
          <th>Groupe Sanguin</th>
          <th>CNI</th>
          <th>Tel</th>
          <th colspan="2">Action</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="patient of patients" :key="patient['.key']">
            <td>{{ patient.nom_de_famille }}</td>
            <td>{{ patient.prenom }}</td>
            <td>{{ patient.groupe_sanguin }}</td>
            <td>{{ patient.cni }}</td>
            <td>{{ patient.tel }}</td>
            <td>
                <router-link :to="{ name: 'FichePatient', params: {id: patient['.key']} }" class="btn btn-primary">
                  Afficher
                </router-link>
                <router-link :to="{ name: 'ModifierPatient', params: {id: patient['.key']} }" class="btn btn-warning">
                  Modifier
                </router-link>
            </td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import { db } from '../config/db';

export default {
  components: {
      name: 'Patients'
  },
  data() {
    return {
      patients: []
    }
  },
  firebase: {
    patients: db.ref('patients')
  }
}
</script>