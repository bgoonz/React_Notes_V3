'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
        { name: `Dishwashing Liquid`, brand: 'Norwex', description: `Our ultra-concentrated, natural formula is made with biodegradable ingredients and free from phosphates, phthalates, SLS, SLES and dyes. This gentle, sudsing formula gets your dishes spotless, even in the hardest water. Scented with essential oil of Clementine for a crisp, citrus aroma.`, retailPrice: 14, productImg: `https://i.imgur.com/gUj352e.jpg`, categoryId: 1 },

        { name: `Superior Mop Starter System - Nordic Naturals`, brand: 'Norwex', description: `For a heavy-duty clean, try this collection! Keeping your home a Safe Haven can be challenging, especially with the amount of pollution, pesticides, dirt and debris you track in from outside. Rather than coat your floors with even more harmful chemicals, use this eco-friendly microfiber mop system to harness the power of static electricity and water to get them sparkling clean! Replace your traditional dry mop, messy wet mop and heavy bucket with this green home-cleaning alternative to clean up dust, dirt and bring out the natural beauty of your floors using only water.`, retailPrice: 115, productImg: `https://i.imgur.com/WKAJlZM.jpg`, categoryId: 1 },

        { name: `Bathroom Cleaner - WITHOUT Pull Cap`, brand: 'Norwex', description: `Bathroom Cleaner - WITHOUT Pull Cap / Use item # 600002 to order with a Pull Cap`, retailPrice: 30, productImg: `https://i.imgur.com/9PLaaoM.jpg`, categoryId: 2 },

        { name: `Kitchen Cloth - Graphite`, brand: `Norwex`, description: `These extra-absorbent microfiber cloths will help you grab, trap and eliminate kitchen messes using only water.`, retailPrice: 12, productImg: `https://i.imgur.com/I0Mo8p1.jpg`, categoryId: 1 },

        // { name: `GG Supreme diaper bag`, brand: 'Norwex', description: `A diaper bag in black/grey GG Supreme canvas. First used in the 1970s, the GG logo was an evolution of the original Gucci rhombi design from the 1930s, and from then it's been an established symbol of Gucci's heritage. For Cruise 2018, the GG pattern has been brought back to the forefront in new combinations, paying homage to Gucci's roots. Complete with an adjustable Web shoulder strap and leather trims.`, retailPrice: 1690, productImg: `https://i.imgur.com/hfeFGdv.jpg`, categoryId: 2 },

        // { name: `Baby tulle dress w/ GG garland`, brand: 'Norwex', description: `Crafted from delicate light pink tulle, this dress for baby is defined by an intricate GG and garland embroidery. The long sleeve design is completed with ruffles along the sleeve openings and skirt, and a button-back closure.`, retailPrice: 980, productImg: `https://i.imgur.com/RtXB2Aq.png`, categoryId: 1 },
// 
//         { name: `Baby jersey denim jacket`, brand: 'Norwex', description: `Made from soft blue cotton jersey denim, this jacket for baby is trimmed with the green and red Web stripe along the collar, hem and sleeve openings. The Gucci jacquard label, influenced by the men's and women's collections, accents the front.`, retailPrice: 430, productImg: `https://i.imgur.com/aS4L83X.png`, categoryId: 1 },
// 
//         { name: `Vintage Check Polo Shirt`, brand: `Burberry`, description: `Vintage Check Polo Shirt in Beige`, retailPrice: 238, productImg: `https://i.imgur.com/52pRVCr.jpg`, categoryId: 1 },
// 
//         { name: `Logo Jacket in Light Grey`, brand: `Givenchy`, description: `Logo Jacket in Light Grey`, retailPrice: 333, productImg: `https://i.imgur.com/I0Mo8p1.jpg`, categoryId: 1 },
// 
//         { name: `Camouflage Monogram T-Shirt`, brand: `Givenchy`, description: `Camouflage Monogram T-Shirt in White`, retailPrice: 232, productImg: `https://i.imgur.com/ubf9Mvs.jpg`, categoryId: 1 },
// 
//         { name: `Logo Track Pants in Grey`, brand: `Givenchy`, description: `Logo Track Pants in Grey`, retailPrice: 272, productImg: `https://i.imgur.com/kAkZOoV.jpg`, categoryId: 1 },
// 
//         { name: `Logo Velcro Straps Pre-Walkers`, brand: `Givenchy`, description: `Logo Velcro Straps Pre-Walkers in White`, retailPrice: 363, productImg: `https://i.imgur.com/TmaFGVz.jpg`, categoryId: 2 },
// 
//         { name: `Ankle High FF Print Sneakers`, brand: `Fendi`, description: `Ankle High FF Print Sneakers in White`, retailPrice: 913, productImg: `https://i.imgur.com/zl21vSY.jpg`, categoryId: 2 },
// 
//         { name: `FF Print Heel Sneakers`, brand: `Fendi`, description: `FF Print Heel Sneakers in White`, retailPrice: 677, productImg: `https://i.imgur.com/hs2Wwvp.jpg`, categoryId: 2 },
// 
//         { name: `FF Fabric Sneakers`, brand: `Fendi`, description: `FF Fabric Sneakers`, retailPrice: 677, productImg: `https://i.imgur.com/KGC1Ew2.png`, categoryId: 2 },
// 
// 
// 
//         { name: `Gazelle S Stroller`, brand: `Cybex`, description: `Gazelle S Stroller`, retailPrice: 699.99, productImg: `https://i.imgur.com/qAzOT6r.jpg`, categoryId: 3 },
// 
//         { name: `Xari Single Stroller`, brand: `Mima`, description: `Xari Single Stroller Bundle`, retailPrice: 1499.99, productImg: `https://i.imgur.com/zl4Mkza.png`, categoryId: 3 },
// 
//         { name: `Vista V2 Stroller w/ Bassinet`, brand: `Uppababy`, description: `This convertible stroller system designed for easier maneuvering includes a bassinet and a toddler seat.`, retailPrice: 969.99, productImg: `https://i.imgur.com/Q5wE9I0.jpg`, categoryId: 3 },
// 
//         { name: `Elvie Pump`, brand: `Elvie`, description: `Double Electric Breast Pump`, retailPrice: 499.99, productImg: `https://i.imgur.com/20NhU5V.jpg`, categoryId: 3 },
    ], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};
