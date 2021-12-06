Vue.component('manageStore', {
  props: {
    store: Object
  },
  methods: {
    toggleStore() {
      this.store.isOpen = !this.store.isOpen;
    }
  },
  template: `
    <div id="manage-store">
        <h3>Administration du magasin :</h3>
        <p><button @click="toggleStore()">{{store.isOpen ? 'Fermer' : 'Ouvrir'}} le magasin</button></p>
        <p><input v-model="store.name" type="text"/></p>
        <p>Magasin ouvert : <input v-model="store.isOpen" type="checkbox"/></p>
    </div>
  `
});

new Vue({
  el:'#app',
  data: {
    store: {
      url: 'https://img.pngio.com/shop-icon-png-175739-free-icons-library-store-icon-png-1024_1024.jpg',
      name: 'Store de Fred !',
      isOpen: false
    }
  },
  template: `
    <div id="store">
        <div class="bloc">
            <div class="sub-bloc">
              <img v-bind:src="store.url" id="img-store"/>
              <h1>{{store.name}}</h1>
              <h2 v-bind:class="{ 'store-open': store.isOpen, 'store-close': !store.isOpen }">Magasin : {{store.isOpen ? 'Open' : 'Close'}}</h2>
              <manage-store :store="store"></manage-store>
            </div>
        </div>
  </div>`
});
