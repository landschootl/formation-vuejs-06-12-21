Vue.component('catalogStore', {
  props: {
    products: Array
  },
  methods: {
    addProductInBasket(product) {
      this.$emit('addProductInBasket', product)
    }
  },
  template: `
    <div>
        <h3>Les produits en vente :</h3>
        <div v-for="(product, index) in products" :key="index">
            <span>{{product.name}} - {{product.price}} HT €</span>
            <button @click="addProductInBasket(product)">Ajouter à mon panier</button>
        </div>
    </div>
  `
});

Vue.component('basketStore', {
  props: {
    basket: Array
  },
  data: function () {
    return {
      taxe: 1.2,
      lastUpdate: 'no update'
    }
  },
  computed: {
    totalPriceTTC() {
      return this.basket.length === 0
        ? 0
        : this.basket
              .map(product => product.price)
              .map(priceHT => priceHT * this.taxe)
              .reduce((totalTTC, priceTTC) => totalTTC + priceTTC)
              .toFixed(2);
    }
  },
  methods: {
    removeProductInBasket(index){
      this.basket.splice(index, 1);
    }
  },
  watch: {
    basket() {
      this.lastUpdate = new Date().toLocaleString();
    }
  },
  template: `
    <div>
        <h3>Mon panier :</h3>
        <p>Prix total de mon panier TTC : {{totalPriceTTC}} €</p>
        <p>Dernière modification : {{lastUpdate}}</p>
        <div v-for="(product, index) in basket" :key="index">
            <span>{{product.name}} - {{product.price}} HT €</span>
            <button @click="removeProductInBasket(index)">Retirer de mon panier</button>
        </div>
    </div>
  `
});


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
    },
    products: [
      {name: 'Banane', price: 1.5},
      {name: 'Oeuf', price: 2.2},
      {name: 'Kiwi', price: 3.3},
      {name: 'Lait', price: 0.9}
    ],
    basket: []
  },
  methods: {
    addProductInBasket(product) {
      this.basket.push(product);
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
            <div class="sub-bloc">
                <catalog-store :products="products" @addProductInBasket="addProductInBasket($event)"></catalog-store>
                <basket-store :basket="basket"></basket-store>
            </div>
        </div>
  </div>`
});
