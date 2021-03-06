/* ========== Model ==========*/

const model = {
  currentCat: null,
  adminStatus: false,
  cats: [
    {
      nickName: "catqueen",
      name: "Si Maem (Yes Madam)",
      src: "img/catqueen.jpg",
      meow: "",
      clickCount: 0
    },{
      nickName: "catflower",
      name: "Piti Lati (Pretty Lady)",
      src: "img/catflower.jpg",
      meow: "",
      clickCount: 0
    },{
      nickName: "cateat",
      name: "Yumi Delici (Yummy Delicious)",
      src: "img/cateat.jpg",
      meow: "",
      clickCount: 0
    },{
      nickName: "catbday",
      name: "Hapi BiDi (Happy Birthday)",
      src: "img/catbday.jpg",
      meow: "",
      clickCount: 0
    },{
      nickName: "catnewborn",
      name: "Sua Baibi (Such A Baby)",
      src: "img/catnewborn.jpg",
      meow: "",
      clickCount: 0
    },{
      nickName: "catsushi",
      name: "Fi Shishi (Fish sushi)",
      src: "img/catsushi.png",
      meow: "",
      clickCount: 0
    },{
      nickName: "catbread",
      name: "Gloto Fe (Gluten Free)",
      src: "img/catbread.jpg",
      meow: "",
      clickCount: 0
    },{
      nickName: "kitties",
      name: "Charlie's Angels",
      src: "img/kitties.jpg",
      meow: "",
      clickCount: 0
    }
  ]
};

/* ========== Octopus ==========*/

const octopus = {
  init: function() {
    // set our current cat to the first one in the list
    model.currentCat = model.cats[0];

    // tell our views to initialize
    viewAll.init();
    viewEach.init();
    viewAdmin.init();
  },

  getCurrentCat: function() {
    return model.currentCat;
  },
  getAllCats: function() {
    return model.cats;
  },

  setCurrentCat: function(cat) {
    // set the currently-selected cat to the object passed in
    model.currentCat = cat;
  },

  updateCurrentCat: function(cat) {
    model.currentCat = cat;
  },

  incrementCounter: function() {
    // increments the counter for the currently-selected cat
    model.currentCat.clickCount++;
    model.currentCat.meow += 'meowww ';
    viewEach.render();
  },

  showAdmin: function() {
    model.adminStatus = true;
    viewAdmin.render();
  },
  hideAdmin: function() {
    model.adminStatus = false;
    viewAdmin.render();
  }
};

/* ========== viewEach ==========*/
const viewEach = {
  init: function() {
    // store pointers to our DOM elements for easy access later
    this.catElem = document.getElementById('cat');
    this.catName = document.getElementById('catName');
    this.catImg = document.getElementById('catImg');
    this.displayCount = document.getElementById('count');
    this.displayMeow = document.getElementById('meow');

    // on click, increment the current cat's counter
    this.catImg.addEventListener('click', function() {
      octopus.incrementCounter();
    });

    // render this view (update the DOM elements with the right values
    this.render();
  },

  render: function() {
    // update the DOM elements with values from the current cat
    const currentCat = octopus.getCurrentCat();
    this.displayCount.textContent = currentCat.clickCount;
    this.displayMeow.textContent = currentCat.meow;
    this.catName.textContent = currentCat.name;
    this.catImg.src = currentCat.src;
  }
};

/* ========== viewAll ==========*/

const viewAll = {
  init: function() {
    // store the DOM element for easy access later
    this.catList = document.getElementById('catList');

    // render this view (update the DOM elements with the right values)
    this.render();
  },
  render: function() {
    let cat, elem, i;
    // get the cats we'll be rendering from the octopus
    const cats = octopus.getAllCats();

    // empty the cat list
    this.catList.innerHTML = '';

    // loop over the cats
    for (i = 0; i < cats.length; i++) {
      // this is the cat we're currently looping over
      cat = cats[i];

      // make a new cat list mini thumbnail and set its text
      elem = document.createElement('img');
      elem.src = cat.src;

      // on click, setCurrentCat and render the viewEach
      // (this uses our closure-in-a-loop trick to connect the value
      // of the cat variable to the click event function)
      elem.addEventListener('click', (function(catCopy) {
        return function() {
          octopus.setCurrentCat(catCopy);
          viewEach.render();
        };
      })(cat));

      // finally, add the element to the list
      this.catList.appendChild(elem);
    }
  }
};

/* ========== viewAdmin ==========*/
const viewAdmin = {
  init: function() {
    this.adminElem = document.getElementById('adminView');
    this.cancel = document.getElementById('cancel');
    this.save = document.getElementById('save');
    this.adminButton = document.getElementById('adminButton');

    this.adminButton.addEventListener('click', function() {
      model.adminStatus ? octopus.hideAdmin() : octopus.showAdmin();
    });

    this.cancel.addEventListener('click', function() {
      octopus.hideAdmin();
    });

    // add function to get all input values from user
    const getInputVal = function() {
      this.inputNameVal = document.getElementById('inputName').value;
      this.inputLinkVal = document.getElementById('inputLink').value;
      this.inputClickVal = document.getElementById('inputClick').value;

      // add function to check click count input (must be a number)
      const checkClickCount = function(alertOrNot) {
        if(isNaN(this.inputClickVal)) {
          if (alertOrNot) {
            alert(`Click count input is invalid, current count will be used instead!`);
          }
          return model.currentCat.clickCount;
        } else {
          return this.inputClickVal;
        }
      }

      return updateCat = {
        nickName: model.currentCat.nickName,
        name: this.inputNameVal || model.currentCat.name,
        // TODO: add a function to validate src link
        src: this.inputLinkVal || model.currentCat.src,
        meow: "meowww ".repeat(checkClickCount(false)),
        clickCount: checkClickCount(true),
      };

    };

    this.save.addEventListener('click', (function(getInputValCopy) {
      return function() {
        octopus.setCurrentCat(getInputValCopy());
        octopus.hideAdmin();
        // TOFIX: for some reason, when click on another cat and come back to the newly-changed cat
        // all newly-input-values are gone, and it display the original information
        viewEach.render();
      };
    })(getInputVal));

    this.render();
  },
  render: function() {
    model.adminStatus
      ? this.adminElem.style.display = "block"
      : this.adminElem.style.display = "none";
  }
};

// make it go!
octopus.init();

