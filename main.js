var app = new Vue({
  el: '#app',
  data: {
    product: "Product",
    description: "This is a sock description",
    image: './assets/image_1.jpg',
    altText: 'altText',
    hrefLink: '',
    inventory: 100,
    onSale: true,
    details: ["detail 1", "detail 2", "detail 3"],
    variants: [
      {
        variantId: 1234,
        variantColor: "green"
      },
      {
        variantId: 1235,
        variantColor: "blue"
      }
    ],
    volumns: ["3.4oz", "6oz"]
  }
});