var app = new Vue({
  el: '#app',
  data: {
    product: "Product",
    description: "This is a sock description",
    image: './assets/image_2.jpg',
    altText: 'altText',
    hrefLink: '',
    inventory: 100,
    onSale: true,
    details: ["detail 1", "detail 2", "detail 3"],
    variants: [
      {
        variantId: 1234,
        variantColor: "green",
        variantImage: './assets/image_1.jpg'
      },
      {
        variantId: 1235,
        variantColor: "blue",
        variantImage: './assets/image_2.jpg'
      },
      {
        variantId: 1236,
        variantColor: "multi",
        variantImage: './assets/image_3.jpg'
      }
    ],
    cart: 0,
  },
  methods: {
    addToCart(){
      this.cart +=1;
    },
    updateProduct(variantImage){
      this.image = variantImage;
    },
    removeFromCart(){
      if(this.cart > 0){
        this.cart -= 1;
      }
      
    }
  }
});