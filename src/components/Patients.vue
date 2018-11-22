// Patients
<template>
  <div>
    <h1>Patients</h1>
    <table class="table table-sm table-striped">
      <thead>
        <tr>
          <th>Nom de famille</th>
          <th>Prénom</th>
          <th>Sexe</th>
          <th>Groupe Sanguin</th>
          <th>CNI</th>
          <th>Tel</th>
          <th colspan="2">Action</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="patient in patients" v-bind:key="patient.id">
            <td>{{ patient.nom_de_famille }}</td>
            <td>{{ patient.prenom }}</td>
            <td>{{ patient.sexe }}</td>
            <td>{{ patient.groupe_sanguin }}</td>
            <td>{{ patient.cni }}</td>
            <td>{{ patient.tel }}</td>
            <td>
                <router-link :to="{ name: 'FichePatient', params: {id: patient.id }}" class="btn btn-sm btn-primary">
                  Afficher
                </router-link>
                <router-link :to="{ name: 'ModifierPatient', params: {id: patient.id }}" class="btn btn-sm btn-warning">
                  Modifier
                </router-link>
            </td>
            <td></td>
          </tr>
      </tbody>
    </table>

    <nav aria-label="Pagination">
      <ul class="pagination pagination-sm justify-content-center">
        <li class="page-item">
          <a class="page-link" @click="paginatePrev()">Précédents</a>
        </li>
        <li class="page-item">
          <a class="page-link" @click="paginateNext()">Suivants</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

import { db } from '../config/db';

export default {
  name: 'Patients',
  data() {
    return {
      orderBy: 'nom_de_famille',
      direction: 'asc',
      page: 1,
      hitsPerPage: 2,
      currentPageLastDoc: {},
      currentPageFirstDoc: {},
      patients: []
    }
  },
  created() {
    db.collection('patients')
      .orderBy(this.orderBy, this.direction)
      .orderBy('prenom', this.direction)
      .limit(this.hitsPerPage)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          let patient = {id: doc.id};
          Object.assign(patient, doc.data()); 
          this.patients.push(patient);
        });

        this.currentPageLastDoc = snap.docs[snap.docs.length - 1];
      });
  },
  methods: {
    paginateNext() {        
      db.collection('patients')
        .orderBy(this.orderBy, this.direction)
        .limit(this.hitsPerPage)
        .startAfter(this.currentPageLastDoc)
        .get()
        .then(snap => {
          if(snap.docs.length){
            this.currentPageFirstDoc = snap.docs[0];
            this.currentPageLastDoc = snap.docs[snap.docs.length - 1];
            this.patients = [];
            snap.forEach(doc => {
              let patient = {id: doc.id};
              Object.assign(patient, doc.data()); 
              this.patients.push(patient);
            });
          }
        });
    },
    paginatePrev() {
      let direction = (this.direction == 'asc') ? 'desc' : 'asc';
      db.collection('patients')
        .orderBy(this.orderBy, direction)
        .limit(this.hitsPerPage)
        .startAfter(this.currentPageFirstDoc)
        .get()
        .then(snap => {
          if(snap.docs.length){
            this.currentPageFirstDoc = snap.docs[snap.docs.length - 1];
            this.currentPageLastDoc = snap.docs[0];
            this.patients = [];
            snap.forEach(doc => {
              let patient = {id: doc.id};
              Object.assign(patient, doc.data()); 
              this.patients.push(patient);
            });
            this.patients.reverse();
          }
        });
    }
  }
}
</script>