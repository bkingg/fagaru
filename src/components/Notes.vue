// Notes
<template>
  <div>
    <h1>Notes</h1>
    <table class="table table-sm table-striped">
      <thead>
        <tr>
          <th>Note</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="note in notes" v-bind:key="note.id">
            <td>{{ note.note }}</td>
            <td nowrap>{{ note.created_at | date('DD-MM-YYYY hh:mm:ss') }}</td>
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
  name: 'Notes',
  data() {
    return {
      orderBy: 'created_at',
      direction: 'desc',
      page: 1,
      hitsPerPage: 2,
      currentPageLastDoc: {},
      currentPageFirstDoc: {},
      notes: []
    }
  },
  created() {
		db.collection('patients')
			.doc(this.$route.params.id)
			.collection('notes')
      .orderBy(this.orderBy, this.direction)
      .limit(this.hitsPerPage)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          let note = {id: doc.id};
          Object.assign(note, doc.data()); 
          this.notes.push(note);
        });
        this.currentPageLastDoc = snap.docs[snap.docs.length - 1];
      });
  },
  methods: {
    paginateNext() {
        
      db.collection('patients')
        .doc(this.$route.params.id)
        .collection('notes')
        .orderBy(this.orderBy, 'desc')
        .limit(this.hitsPerPage)
        .startAfter(this.currentPageLastDoc)
        .get()
        .then(snap => {
          if(snap.docs.length){
            this.currentPageFirstDoc = snap.docs[0];
            this.currentPageLastDoc = snap.docs[snap.docs.length - 1];
            this.notes = [];
            snap.forEach(doc => {
              let note = {id: doc.id};
              Object.assign(note, doc.data()); 
              this.notes.push(note);
            });
          }
        });
    },
    paginatePrev() {
      let direction = (this.direction == 'asc') ? 'desc' : 'asc';
      db.collection('patients')
        .doc(this.$route.params.id)
        .collection('notes')
        .orderBy(this.orderBy, direction)
        .limit(this.hitsPerPage)
        .startAfter(this.currentPageFirstDoc)
        .get()
        .then(snap => {
          if(snap.docs.length){
            this.currentPageFirstDoc = snap.docs[snap.docs.length - 1];
            this.currentPageLastDoc = snap.docs[0];
            this.notes = [];
            snap.forEach(doc => {
              let note = {id: doc.id};
              Object.assign(note, doc.data()); 
              this.notes.push(note);
            });
            this.notes.reverse();
          }
        });
    }
  }
}
</script>