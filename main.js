var app = new Vue({
  el: '#app',
  data: {
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
    }
  }
});