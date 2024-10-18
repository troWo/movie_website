const url = 'https://jsonplaceholder.typicode.com/photos'

async function getProduct(){
try {
  const response = await axios(url)
  console.log(response);
  console.log(response.data);
} catch (error) {
  console.log(error);
}
}
getProduct()


////////////POST REQUESTS//////////////////////////////////


async function addProduct (){
try {
  const product = {
    // imageUrl: 'added item',
    // title: 'added item',
    // price: 800,
    // description: '',
  }
  const response = await axios.post(url, product)
  console.log(response);
  getProduct()
} catch (error) { 
} 
}
document.querySelector('#axios').addEventListener('click', function(){
  addProduct()
})

