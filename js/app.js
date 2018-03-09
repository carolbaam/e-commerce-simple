
let checkList=[]


function drawProducts(data) {
  let products = data.products;
  let productsContainer = document.getElementById("products-container");
  products.forEach((product) => {
    let productHTML = createProductHTML(product);
    productsContainer.appendChild(productHTML);
  });
}

function createProductHTML(product) {
  let template = `
    <h3>${product.title}</h3>
    <img src='${product.imageUrl}' alt='${product.description}'/>
    <p>${product.description}</p>
    <button data-product-id=${product.id}
      onclick="modifyCart(this,${product.id})"
      class='btn btn-primary'>
        Agregar a carrito
      </button>
    <hr/>
  `;
  let productContainer = document.createElement("div");
  productContainer.className = "col text-center";
  productContainer.innerHTML = template;
  return productContainer;
}

drawProducts(data);

function modifyCart(trigger,productId) {
  if(trigger.classList.contains("red")===false){/*MADDIE*/ 
    addCart(trigger, productId);
    changeButton(false, trigger)
    addItemtoCheck(productId)
  }else{
    removeFromCart(trigger, productId);
    changeButton(true, trigger);
   removeItemFromCheck(productId)
  }
}

function addItemtoCheck(productId){
  (data.products).forEach(product=>{
    if(productId===product.id){
      checkList.push(product);
      console.log(checkList);
      
    }
    storeProduct(checkList);
  })
}

function removeItemFromCheck(productId){
  checkList=checkList.filter(function(item){
    return item.id !==productId
    
  })
  console.log(checkList);
  storeProduct(checkList);
}

function storeProduct(checkList){
  localStorage.setItem("items", JSON.stringify(checkList));
}



function addCart(trigger){
  trigger.classList.toggle("red");/*MADDIE*/ 
  const counter=document.getElementById('counterItems');
  let count=parseInt(document.getElementById('counterItems').textContent);
  count += 1
  storeCount(count);
  counter.innerHTML=count;
  
  console.log(count);
  
 }

function removeFromCart(trigger) {
  trigger.classList.toggle("red");/*MADDIE*/ 
  const counter=document.getElementById('counterItems');
  let count=parseInt(document.getElementById('counterItems').textContent);
  count -= 1
  storeCount(count);
  counter.innerHTML=count;
  console.log(count);
  
}

function storeCount(count){
  console.log(localStorage.setItem("countTotal", count));
  
}


function changeButton(condition, trigger) {
  if(condition===true){
trigger.textContent="agrega al carrito"
  }else{
    trigger.textContent="remueve"
  }
}
