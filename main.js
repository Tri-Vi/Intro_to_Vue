// Global Event Bus
var eventBus = new Vue();

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
        
        <p v-if="onSale">On Sale!</p>
        
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
          <!-- Add To Cart BTN -->
          <button class="addBtn" 
                  v-on:click="addToCart"
                  :disabled="!inStock"
                  :class="{ disabledButton: !inStock}">Add To Cart</button>

          <!-- Remove From Cart BTN -->
          <button class="removeBtn" 
                  v-on:click="removeFromCart">Remove From Cart</button>
        </div>


        <product-tabs :reviews="reviews"
                      :shipping="shipping"
                      :details="details"></product-tabs>
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
      reviews: []
    }
  },
  methods: {
    addToCart(){
      this.$emit('add-to-cart', this.variants[this.selectedIndex].variantId);
    },
    updateProduct(index){
      this.selectedIndex = index;
    },
    removeFromCart(){
      this.$emit('remove-from-cart', this.variants[this.selectedIndex].variantId);
    }
  },
  mounted(){
    eventBus.$on('review-submmited', productReview => {
      this.reviews.push(productReview);
    })
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

// Component - Product Review
Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors">
            {{error}}
          </li>
        </ul>
      </p>

      <p class="form-group">
        <label for="name">Name:</label>
        <input id="name" v-model="name" required></input>
      </p>

      <p class="form-group">
        <label for="review">Review:</label>
        <textarea id="review" v-model="review" required></textarea>
      </p>

      <p class="form-group">
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating" required>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="2">1</option>
        </select>
      </p>

      <p class="form-group">
        <label for="recommend">Would you recommend this product ?</label>
        <input type="radio" v-model="recommend" value="Yes">Yes</input>
        <input type="radio" v-model="recommend" value="No">No</input>
        
      </p>

    

      <p class="form-group">
        <input type="submit" value="Submit">
      </p>
    </form>
  `,
  props: {

  },
  data(){
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit(){
      if(this.name && this.review && this.rating){
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        }
        eventBus.$emit('review-submitted', productReview);
        //Reset product review data
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommend = null;
      } else {
        if(!this.name) this.errors.push("Name required");
        if(!this.review) this.errors.push("Review required");
        if(!this.rating) this.errors.push("Rating required");
        if(!this.recommend) this.errors.push("Recommend required");
      }
    }
  },
  computed: {

  }
})

// Component - Product tabs
Vue.component('product-tabs', {
  template:`
    <div>
      <span class="tab"
            :class="{activeTab: selectedTab === tab}"
            v-for="(tab, index) in tabs" 
            :key="index"
            @click="selectedTab = tab">
            {{tab}}
      </span>

      <!-- Reviews -- >
      <div v-show="selectedTab === 'Reviews'">
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet</p>
        <ul>
          <li v-for="review in reviews">
            <p>{{review.name}}</p>
            <p>Rating: {{review.rating}}</p>
            <p>{{review.review}}</p>
            <p>Recommend: {{review.recommend}}</p>
          </li>
        </ul>
        </div>


      <!-- Make Review -->
      <product-review v-show="selectedTab === 'Make a Review'"></product-review>

      <!-- Shipping -->
      <p v-show="selectedTab === 'Shipping'"> Shipping: {{shipping}}</p>

      <!-- Product Detail -->
      <product-details v-show="selectedTab === 'Details'" :details="details"></product-details>
    </div>
  `,
  props: {
    reviews: {
      type: Array,
      required: true
    },
    shipping: {
      type: String,
      required: true
    },
    details: {
      type: Array,
      required: true
    }
  },
  data(){
    return {
      tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
      selectedTab: 'Reviews'
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
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id){
      this.cart.push(id);
    },
    removeItem(id){
      for(var i = this.cart.length - 1; i>=0; i--){
        if(this.cart[i] === id){
          this.cart.splice(i, 1);
        }
      }
    }
  }
});