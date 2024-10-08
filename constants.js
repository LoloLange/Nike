export const colors = [
  {
    color_text: "RED",
    color: "#960001",
    bg_nike: new URL('./src/assets/red/NIKE RED BG.webp', import.meta.url).href,
    bg: new URL('./src/assets/red/RED BG.webp', import.meta.url).href,
    shoe: new URL('./src/assets/red/RED.webp', import.meta.url).href,
    cartImg: new URL('./src/assets/red/cartImg.png', import.meta.url).href,
  },
  {
    color_text: "BLUE",
    color: "#013DDB",
    bg_nike: new URL('./src/assets/blue/NIKE BLUE BG.webp', import.meta.url).href,
    bg: new URL('./src/assets/blue/BLUE BG.webp', import.meta.url).href,
    shoe: new URL('./src/assets/blue/BLUE.webp', import.meta.url).href,
    cartImg: new URL('./src/assets/blue/cartImg.png', import.meta.url).href,
  },
  {
    color_text: "GREEN",
    color: "#437A52",
    bg_nike: new URL('./src/assets/green/NIKE GREEN BG.webp', import.meta.url).href,
    bg: new URL('./src/assets/green/GREEN BG.webp', import.meta.url).href,
    shoe: new URL('./src/assets/green/GREEN.webp', import.meta.url).href,
    cartImg: new URL('./src/assets/green/cartImg.png', import.meta.url).href,
  },
  {
    color_text: "BROWN",
    color: "#9E5E32",
    bg_nike: new URL('./src/assets/brown/NIKE BROWN BG.webp', import.meta.url).href,
    bg: new URL('./src/assets/brown/BROWN BG.webp', import.meta.url).href,
    shoe: new URL('./src/assets/brown/BROWN.webp', import.meta.url).href,
    cartImg: new URL('./src/assets/brown/cartImg.png', import.meta.url).href,
  }
];

export const colorsHex = [
  { hex: "#960001", name: "red", position: 0 },
  { hex: "#013DDB", name: "blue", position: 1 },
  { hex: "#437A52", name: "green", position: 2 },
  { hex: "#9E5E32", name: "brown", position: 3 }
];

export const navbar = {
  logo: new URL('./src/assets/logo.avif', import.meta.url).href,
  links: [{name: "NEW & FEATURED", link: '/featured'}, {name: "MEN", link: '/men'}, {name: "WOMEN", link: '/women'}, {name: "KIDS", link: '/kids'}, {name: "SALE", link: '/sale'}],
  svg: new URL('./src/assets/shop.svg', import.meta.url).href
};

export const sizeMen = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15];
export const sizeWomen = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];
export const sizeKids = ['1Y', '1.5Y', '2Y', '2.5Y', '3Y', '3.5Y', '4Y', '4.5Y', '5Y', '5.5Y', '6Y', '6.5Y', '7Y'];
export const sizeSale = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13];

export const jordanDescription = "Step into iconic style with Nike Men's Air Jordan 1 Mid. These sneakers blend heritage design with modern flair. The premium leather upper and Air-Sole unit provide comfort and support. With a timeless silhouette and distinctive colorways, the Air Jordan 1 Mid makes a bold statement on and off the court. Elevate your sneaker game with this fusion of heritage and contemporary style from Nike's legendary Jordan collection.";

export const FooterContact = [
  { label: "Address", text: "Miami 1234, US" },
  { label: "Email", text: "info@example.com" },
  { label: "Phone", text: "+1 2345 6789" },
];