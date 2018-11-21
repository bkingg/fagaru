// Notes
<template>
  <div>
    <h1>Notes</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Note</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="note in notes" v-bind:key="note.id">
            <td>{{ note.note }}</td>
            <td>{{ note.created_at }}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import { db } from '../config/db';

export default {
  name: 'Notes',
  data() {
    return {
      orderBy: 'created_at',
      page: 1,
      hitsPerPage: 6,
      notes: []
    }
  },
  created() {
		db.collection('patients')
			.doc(this.$route.params.id)
			.collection('notes')
      .orderBy(this.orderBy)
      .limit(this.hitsPerPage)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          let note = {id: doc.id};
          Object.assign(note, doc.data()); 
          this.notes.push(note);
        });
      });
  }
}
</script>