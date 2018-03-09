function calculateTotal() {
 const totalItems=localStorage.getItem("items");
 const totalArrayItems=JSON.parse(totalItems);
 let totalCount=localStorage.getItem("countTotal");

 //console.log(totalCount);
 paintItems(totalArrayItems, totalCount)
}

function paintItems(totalArrayItems,totalCount){
  let template='';
  const prices=[]
  
  totalArrayItems.forEach(element=>{
    prices.push(element.price);
    template+=
   ` <tr>
      <th>${element.title}</th>
      <td>${element.price}</td>
      </tr>`
  });
 // console.log(prices)
  const allPrices=prices.reduce(function(a,b){
    return a+b
  },0);
  console.log(allPrices);
  const total=document.getElementById('total-total');
  const table=document.getElementById('table');
  const counter=document.getElementById('counterItems');
  table.innerHTML=template;
  counter.innerHTML=totalCount;
  
  let template2 =
  `<td></td>
<td></td>
<td id>${allPrices}</td>`

table.insertAdjacentHTML('beforeEnd', template2);

  getPayPal(allPrices);
}

calculateTotal();

   function getPayPal(allPrices){
    console.log("entre"); 
    paypal.Button.render({
    
                env: 'sandbox', // sandbox | production
    
                // PayPal Client IDs - replace with your own
                // Create a PayPal app: https://developer.paypal.com/developer/applications/create
                client: {
                    sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
                    production: '<insert production client id>'
                },
    
                // Show the buyer a 'Pay Now' button in the checkout flow
                commit: true,
    
                // payment() is called when the button is clicked
                payment: function(data, actions) {
    
                    // Make a call to the REST api to create the payment
                    return actions.payment.create({
                        payment: {
                            transactions: [
                                {
                                    amount: { total: `${allPrices}`, currency: 'MXN' }
                                }
                            ]
                        }
                    });
                },
    
                // onAuthorize() is called when the buyer approves the payment
                onAuthorize: function(data, actions) {
                // Make a call to the REST api to execute the payment
                return actions.payment.execute().then(function() {
                  window.alert('Payment Complete!');
              });
          }

      }, '#paypal-button-container');
    
}
//function paintOnCheckout() 