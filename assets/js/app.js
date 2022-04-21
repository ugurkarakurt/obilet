import {
<<<<<<< HEAD
 UI
} from "./ui.js";
import {
 Request
} from "./request.js";
const ui = new UI();
const request = new Request();

=======
  UI
} from "./ui.js";
const ui = new UI();
>>>>>>> 056f998c31aa95346d9589b1a6e4d6ac75a3fb34

// Setup module
// ------------------------------

<<<<<<< HEAD
const Expedition = (function () {
 //
 // Setup module components
 //


 // Hover Effect
 const _setSelect2 = function () {

  // request.post("https://v2-api.obilet.com/api/client/getsession", {
  //  "type": 7,
  //  "connection": {
  //   "ip-address": "145.214.41.21"
  //  },
  //  "application": {
  //   "version": "1.0.0.0",
  //   "equipment-id": "distribusion"
  //  }
  // }).then((result) => {
  //  console.log("sdsa");
  //  console.log(result);
  // }).catch((err) => {
  //  console.log(err);
  // });

  $.ajax({
   url: "https://v2-api.obilet.com/api/client/getsession",
   type: "POST",
   beforeSend: function(request) {
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("Authorization", "Basic REd3cEIia3spV295VVc3G2FtVjNZbWx1");

  },
   data: JSON.stringify({
    "type": 7,
    "connection": {
     "ip-address": "145.214.41.21"
    },
    "application": {
     "version": "1.0.0.0",
     "equipment-id": "distribusion"
    }
   }),
   success: function (data) {
    alert(data); //post islemi basarili ise post edilen sayfadan geri donen verileri alert ile ekrana yaz
   }
  });
 };


 //
 // Return objects assigned to module
 //

 return {
  init: function () {
   _setSelect2();
  },
 };
=======
const ecommerceBasic = (function () {
  //
  // Setup module components
  //

  // Variables
  const closeBTN = document.querySelector(".close-btn");
  const checkInp = document.getElementById("check");
  const shopMinus = document.querySelector(".shop-minus");
  const shopPlus = document.querySelector(".shop-plus");
  const quantity = document.querySelector(".quantity");
  const miniBasket = document.querySelector(".mini-basket");
  const basket = document.querySelector(".basket");

  // Quantity add-delete

  const _quantity = function () {
    shopMinus.addEventListener("click", function () {
      const value = Number(quantity.innerHTML);
      value > 0 && (quantity.innerHTML = value - 1)
    });
    shopPlus.addEventListener("click", function () {
      const value = Number(quantity.innerHTML);
      quantity.innerHTML = value + 1
    })
  }

  // Slider Settings
  const _productSlider = function () {
    $(".slider").slick({
      speed: 300,
      fade: true,
      cssEase: 'linear',
      prevArrow: '<button class="icon-chevron_up"><img loading="lazy" src="./assets/images/icon-previous.svg" alt="p-1"></button>',
      nextArrow: '<button class="icon-chevron_down"><img loading="lazy" src="./assets/images/icon-next.svg" alt="p-1"></button>',
    });
    $('.product-thumbnail').on('click', function () {
      let slideIndex = $(this).data('slide');
      $('.slider').slick('slickGoTo', slideIndex, false);
    });
    ui.exampleUI();
  };


  // Sidebar close Event
  const _closeSidebar = function () {
    closeBTN.addEventListener("click", function () {
      checkInp.checked = false;
    })
  }

  // Add to cart event
  const _addToCart = function () {}

  // Toggle Basket 
  const _toggleBasket = function () {
    miniBasket.addEventListener("click", function () {
      basket.classList.contains("active") ? basket.classList.remove("active") : basket.classList.add("active");
    })
  }

  //
  // Return objects assigned to module
  //

  return {
    init: function () {
      _productSlider();
      _closeSidebar();
      _quantity();
      _addToCart();
      _toggleBasket();
    },
  };
>>>>>>> 056f998c31aa95346d9589b1a6e4d6ac75a3fb34
})();

// Initialize module
// ------------------------------

document.addEventListener("DOMContentLoaded", function () {
<<<<<<< HEAD
 Expedition.init();
=======
  ecommerceBasic.init();
>>>>>>> 056f998c31aa95346d9589b1a6e4d6ac75a3fb34
});