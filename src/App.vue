<style lang="css">
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
</style>

<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm bg-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'Accueil' }" class="nav-link">Accueil</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'AjouterPatient' }" class="nav-link">Ajouter Patient</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Patients' }" class="nav-link">Tous les patients</router-link>
        </li>
        <li class="nav-item">
          <a href="#" @click.prevent="logout" class="nav-link">Déconnexion</a>
        </li>
      </ul>
    </nav>

    <div class="app-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.app-container {
  padding-left: 20px;
  padding-right: 20px;
}
input[type=text] {
  text-transform: uppercase;
}
input[type=text]::placeholder {
  text-transform: none;
}
</style>


<script>
import Firebase from 'firebase'

export default {
	name: 'App',
	methods: {
		logout() {
			Firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      })
      // .catch(function(error) {
      //   // An error happened.
      // });
		}
	}
}
</script>
