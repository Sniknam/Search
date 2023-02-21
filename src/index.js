import "./styles.css";

const cardsContainer = document.getElementById("cards");
let data = [
  { id: 1, product: "Tshirt", price: 12.5, color: "red" },
  { id: 2, product: "Book", price: 15, color: "blue" },
  { id: 3, product: "shirt", price: 10, color: "green" },
  { id: 4, product: "plant", price: 9, color: "green" },
  { id: 5, product: "chair", price: 5, color: "blue" },
  { id: 6, product: "book", price: 11, color: "blue" },
  { id: 7, product: "bird", price: 19, color: "blue" },
  { id: 8, product: "cd", price: 12, color: "red" }
];

// remove item from array
function removeItemFromData(array, id) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    const isSameItemID = array[i].id === id;
    console.log(isSameItemID);
    if (!isSameItemID) {
      result.push(array[i]);
    }
  }

  return result;
}

function printItems(arr) {
  // we clear the container each time so we don't have two
  // data on screen if we call printItem with different data
  cardsContainer.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    const selectedItem = arr[i];
    const card = document.createElement("div");
    card.classList.add("card");

    // removing the card on the page by remove button
    const removeBtn = document.createElement("button");
    const remove = document.createTextNode("remove");
    removeBtn.appendChild(remove);
    card.appendChild(removeBtn);
    removeBtn.addEventListener("click", function () {
      const id = selectedItem.id;
      const newData = removeItemFromData(data, id);
      data = newData;
      printItems(data);
    });

    const itemName = document.createElement("h1");
    const name = document.createTextNode(selectedItem.product);
    itemName.appendChild(name);
    card.appendChild(itemName);

    const itemPrice = document.createElement("p");
    let price = document.createTextNode("$" + selectedItem.price);

    itemPrice.appendChild(price);
    card.appendChild(itemPrice);

    const itemColor = document.createElement("span");
    itemColor.classList.add("color");
    itemColor.classList.add(selectedItem.color);
    card.appendChild(itemColor);

    cardsContainer.appendChild(card);
  }
}
printItems(data);

const searchBtn = document.getElementById("searchbtn");

function search(e) {
  //   // this is for to prevent default behaviour of buttons from submiting the forms and refesh the page
  e.preventDefault();
  const searchItem = document.getElementById("search").value;
  const newArrayData = filterArr(data, searchItem);
  printItems(newArrayData);
}
// search box I typed 'BOOK'
// we have product name 'Book'

searchBtn.addEventListener("click", search);

// this for filtering the data array based on lables
function filterArr(arr, str) {
  // BOOK
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    // captital sensitive
    const productName = arr[i].product.toUpperCase();
    const searchPhrase = str.toUpperCase();
    // search only two charater
    if (productName.includes(searchPhrase)) {
      result.push(arr[i]);
    } else if (str === arr[i].color) {
      result.push(arr[i]);
    } else if (Number(str) === arr[i].price) {
      result.push(arr[i]);
    } else if (!str) {
      result.push(arr[i]);
    }
  }
  return result;
}

// ceate form with 3  input with name, price and color and submit button

const addItemm = document.getElementById("addItem");

let CounterUniqId = 9;

function addnewItem() {
  const item = document.getElementById("item").value;
  const itemPrice = document.getElementById("itemPrice").value;
  const ItemColor = document.getElementById("itemColor").value;
  console.log(item, itemPrice, ItemColor);

  const obj = {
    id: CounterUniqId,
    product: item,
    price: itemPrice,
    color: ItemColor
  };
  CounterUniqId += 1;
  data.push(obj);
  console.log(data, "new Data");
  printItems(data);
}

addItemm.addEventListener("click", addnewItem);

const clearItem = document.getElementById("clearItem");

// clear wrong item that we put it in input in the page
function clerarNewItem() {
  document.getElementById("item").value = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemColor").value = "";
}

clearItem.addEventListener("click", clerarNewItem);

const gameData = [true, true, true, true, true, false, true, true, true, false];

// false is bomb
// true is valid entry
