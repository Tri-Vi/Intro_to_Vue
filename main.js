// Component - product

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
    <div class="product-image">
      <img :src="image" :alt="altText" :href="hrefLink">
    </div>

    <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inventory > 10">In Stock</p>
        <p v-else-if="inventory <= 10 && inventory  > 0">Almost Sold Out</p>
        <p v-else :class="{ outOfStock: !inStock }">Out of Stock</p>
        <p> Shipping: {{shipping}}</p>
        
        <p v-if="onSale">On Sale!</p>
        
        <!-- Product Detail -->
        <product-details :details="details"></product-details>

        <!-- Variant -->
        <div class="row">
          <div v-for="(variant, index) in variants" 
            :key="variant.variantId"
            class="color-box row-item"
            :style="{ backgroundColor: variant.variantColor }">
            <p @mouseover="updateProduct(index)">{{variant.variantColor}}</p>
          </div>
        </div>
        
        <div class="row">
          <button class="addBtn" 
                  v-on:click="addToCart"
                  :disabled="!inStock"
                  :class="{ disabledButton: !inStock}">Add To Cart</button>
          <button class="removeBtn" v-on:click="removeFromCart">Remove From Cart</button>
          <div class="cart">
            <p>Cart ({{cart}})</p>
          </div>
        </div>
    </div>
  </div>
  `,
  data() {
    return {
      brand: "LUNA",
      product: "Product",
      selectedIndex: 0,
      altText: 'altText',
      hrefLink: '',
      details: ["detail 1", "detail 2", "detail 3"],
      variants: [
        {
          variantId: 1234,
          variantColor: "green",
          variantImage: './assets/image_1.jpg',
          variantQuantity: 100,
          variantOnSale: false
        },
        {
          variantId: 1235,
          variantColor: "blue",
          variantImage: './assets/image_2.jpg',
          variantQuantity: 5,
          variantOnSale: true
        },
        {
          variantId: 1236,
          variantColor: "orange",
          variantImage: './assets/image_3.jpg',
          variantQuantity: 0,
          variantOnSale: false
        }
      ],
      cart: 0,
    }
  },
  methods: {
    addToCart(){
      this.cart +=1;
    },
    updateProduct(index){
      this.selectedIndex = index;
    },
    removeFromCart(){
      if(this.cart > 0){
        this.cart -= 1;
      }
      
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image(){
      return this.variants[this.selectedIndex].variantImage;
    },
    inventory(){
      return this.variants[this.selectedIndex].variantQuantity;
    },
    inStock(){
      return this.variants[this.selectedIndex].variantQuantity;
    },
    onSale(){
      return this.variants[this.selectedIndex].variantOnSale;
    },
    shipping(){
      if(this.premium){
        return "Free";
      } else {
        return "$5";
      }
    }
  }
})

// Component - Product Detail
Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">
        {{detail}}
      </li>
    </ul>
  `,
  data(){
    return {
      
    }
  },
  methods: {

  },
  computed: {

  }
})

var app = new Vue({
  el: '#app',
  data: {
    premium: true
  }
});