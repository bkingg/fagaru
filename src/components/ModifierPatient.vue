// ModifierPatient.vue

<template>
  <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Modifier Patient</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="modifierPatient">
                    <div class="form-group">
                        <label>Nom de famille</label>
                        <input type="text" name="nom_de_famille" class="form-control" required v-model="patient.nom_de_famille"/>
                    </div>
                    <div class="form-group">
                        <label>Prénom</label>
                        <input type="text" name="prenom" class="form-control" required v-model="patient.prenom"/>
                    </div>
					<div class="form-group">
                        <label>Numéro de CNI</label>
                        <input type="text" name="cni" class="form-control" required v-model="patient.cni"/>
                    </div>
					<div class="form-group">
                        <label>Numéro de tel</label>
                        <input type="text" name="tel" class="form-control" required v-model="patient.tel"/>
                    </div>
					<div class="form-group">
                        <label>Groupe sanguin</label>
                        <input type="text" name="groupe_sanguin" class="form-control" v-model="patient.groupe_sanguin"/>
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Modifier"/>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import { db } from '../config/db';

export default {
  components: {
      name: 'ModifierPatient'
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
  },
  methods: {
    modifierPatient() {
      this.$firebaseRefs.patients.child(this.$route.params.id).set(this.patient);
      this.$router.push('/patients');
    }
  }
}
</script>