/* CRUDE => Create✔️ - Update✔️ - Delete✔️ -Retrive (Display - Read )✔️ - Search✔️ */
// - Update => Create + edite
// - Search => Display + edite

// Add product
var ProductName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productDesic = document.getElementById('productDesic');
var productCategory = document.getElementById('productCategory');
var tableBody = document.getElementById('content');
var emptyItem = document.getElementById('not-item');
var searchInput = document.getElementById('search');
var btnUpdate = document.getElementById('updateBtn');
var btnClearAll = document.getElementById('clear-all');
var btnAdd = document.getElementById('addBtn');
var messageValidation = document.getElementById('validation-Massege');
var categoryMessage = document.getElementById('validation-Category');
var descMessage = document.getElementById('validation-Desic');

var indexItemForUpdate = 0;
// Global Array To unAssing Array every time i was click on btn
var ProductList = [];

// If LocalStorge Empty Value
function IsEmptyLocalStorge() {
  if (localStorage.getItem('products') !== null) {
    emptyItem.style.display = 'none';
    btnClearAll.classList.remove('d-none');
    ProductList = JSON.parse(localStorage.getItem('products'));
    // Add Item from Cartona to body
    displayData();
  }
  if (ProductList.length <= 0) {
    localStorage.removeItem('products');
    emptyItem.style.display = 'block';
    btnClearAll.classList.add('d-none');
  }
}
// Get LocalStorge
IsEmptyLocalStorge();
console.log(ProductList.length);

function addProduct() {
  if (validationName() && validationCategory() && validationDescription()) {
    // List Item
    var product = {
      name: ProductName.value,
      price: productPrice.value,
      description: productDesic.value,
      category: productCategory.value,
    };
    // Push New Item To An Array
    ProductList.push(product);
    // Add Local Storge
    localStorage.setItem('products', JSON.stringify(ProductList));
    //
    // Display Data From Cartona  && Check Local Storge
    IsEmptyLocalStorge();
    // Clear Input Value
    clearForm();
  }
}
// Clear Data
function clearForm() {
  ProductName.value = '';
  productPrice.value = '';
  productDesic.value = '';
  productCategory.value = '';
}
// Display Items
function displayData() {
  var cartona = '';
  for (i = 0; i < ProductList.length; i++) {
    cartona += `
            <tbody>
              <tr>
                <td>${i + 1} </td>
                <td>${ProductList[i].name}</td>
                <td>${ProductList[i].price}</td>
                <td>${ProductList[i].description}</td>
                <td>${ProductList[i].category}</td>
                <td>
                  <div>
                  <button onclick="setData(${i})" class="btn btn-setData my-1 rounded"><i class="fa-solid fa-rotate-right"></i></button>
                    <button onclick="DeleteItem(${i})" class="btn btn-remove my-1 rounded "><i class="fa-solid fa-x"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>`;
  }
  // Add Item from Cartona to body
  tableBody.innerHTML = cartona;
}

function DeleteItem(i) {
  ProductList.splice(i, 1);
  localStorage.setItem('products', JSON.stringify(ProductList));
  displayData();
  if (ProductList.length === 0) {
    localStorage.removeItem('products');
    emptyItem.style.display = 'block';
    btnClearAll.classList.add('d-none');
    btnUpdate.classList.add('d-none');
    btnAdd.classList.remove('d-none');
  }
}

function SearchItem() {
  var cartona = '';
  var stringItem = searchInput.value;
  // To check if the array was empty ? show massge
  var isEmpty = [];
  for (i = 0; i < ProductList.length; i++) {
    if (ProductList[i].name.toLowerCase().includes(stringItem.toLowerCase())) {
      isEmpty.push(ProductList[i]);
      cartona += `
            <tbody>
              <tr>
                <td>${i + 1} </td>
                <td>${ProductList[i].name}</td>
                <td>${ProductList[i].price}</td>
                <td>${ProductList[i].description}</td>
                <td>${ProductList[i].category}</td>
                <td>
                 <div>
                  <button onclick="setData(${i})" class="btn btn-setData my-1 rounded"><i class="fa-solid fa-rotate-right"></i></button>
                    <button onclick="DeleteItem(${i})" class="btn btn-remove my-1 rounded "><i class="fa-solid fa-x"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>`;
    }
    if (isEmpty.length <= 0) {
      emptyItem.style.display = 'block';
      btnClearAll.classList.add('d-none');
    } else {
      emptyItem.style.display = 'none';
      btnClearAll.classList.remove('d-none');
    }
    // Add Item from Cartona to body
    tableBody.innerHTML = cartona;
  }
}

function setData(i) {
  btnUpdate.classList.remove('d-none');
  btnAdd.classList.add('d-none');
  indexItemForUpdate = i;
  ProductName.value = ProductList[i].name;
  productPrice.value = ProductList[i].price;
  productDesic.value = ProductList[i].description;
  productCategory.value = ProductList[i].category;
}
function updateProduct() {
  // Add New Item
  var product = {
    name: ProductName.value,
    price: productPrice.value,
    description: productDesic.value,
    category: productCategory.value,
  };
  // remove From Array And Add New Item
  ProductList.splice(indexItemForUpdate, 1, product);

  // setItem From Local Storge
  localStorage.setItem('products', JSON.stringify(ProductList));
  console.log(ProductList.length);
  // Return Display
  displayData();
  if (ProductList.length >= 1) {
    emptyItem.display = 'none';
    console.log('yes');
  } else console.log('noe');
  // Rest Btn
  btnUpdate.classList.add('d-none');
  btnAdd.classList.remove('d-none');
  // CLear form
  clearForm();
}

function clearAllItem() {
  localStorage.removeItem('products');
  ProductList = [];
  displayData();
  emptyItem.style.display = 'block';
  btnClearAll.classList.add('d-none');
}

// Validation Name
function validationName() {
  var regx = /^[A-Z][a-z]{3,20}$/;
  if (regx.test(ProductName.value)) {
    ProductName.classList.add('is-valid');
    ProductName.classList.remove('is-invalid');
    messageValidation.classList.add('d-none');
    return true;
  } else {
    ProductName.classList.remove('is-valid');
    ProductName.classList.add('is-invalid');
    messageValidation.classList.remove('d-none');
    return false;
  }
}

// Validation Category
function validationCategory() {
  var regxCategory = /^[a-zA-Z]{1,30}$/;
  if (regxCategory.test(productCategory.value)) {
    productCategory.classList.add('is-valid');
    productCategory.classList.remove('is-invalid');
    categoryMessage.classList.add('d-none');
    return true;
  } else {
    productCategory.classList.remove('is-valid');
    productCategory.classList.add('is-invalid');
    categoryMessage.classList.remove('d-none');
    return false;
  }
}
// Validation Description
function validationDescription() {
  var regxCategory = /^[\w]+(\s[\w]+)*$/;
  if (regxCategory.test(productDesic.value)) {
    productDesic.classList.add('is-valid');
    productDesic.classList.remove('is-invalid');
    descMessage.classList.add('d-none');
    return true;
  } else {
    productDesic.classList.remove('is-valid');
    productDesic.classList.add('is-invalid');
    descMessage.classList.remove('d-none');
    return false;
  }
}
