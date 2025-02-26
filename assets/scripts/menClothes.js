
const loader = document.querySelector('.loader');

function showLoader() {
  loader.classList.remove('d-none');
}

function hideLoader() {
  loader.classList.add('d-none');
}

// ///////////////////////////////////////////////////
const getProducts = async(page)=>{
    const skip = (page - 1)*4;
    showLoader();
    const {data} = await axios.get(`https://fakestoreapi.com/products/category/men\'s clothing?limit=10&skip=${skip}`);
    hideLoader();
    return data;
}

const displayProducts = async(page=1)=>{
    
    const data = await getProducts(page);
    console.log(data);
    const paginatedData = data.slice((page - 1) * 4, page * 4);
    const numberOfPages = Math.ceil(data.length / 4);
    console.log(numberOfPages);

    const result = paginatedData.map(product => {
        return( `
            <div class="product">
            
               <img src="${product.image}" alt="${product.title}">
               <p class="title">${product.title}</p>
               <p class="price">$${product.price}</p>
            </div>
 `);
      }).join('');

      document.querySelector(".productsList").innerHTML = result; 
      customModal();

    
      let paginationLink = `<li><button onclick=displayProducts(${page-1})>&lt;</button></li>`;
      
      for(let i=1; i<=numberOfPages; i++){
        paginationLink+=`<li><button onclick=displayProducts(${i})>${i}</button></li>`
        
      }
      console.log(paginationLink);
      paginationLink += `<li><button onclick=displayProducts(${page+1})>&gt;</button></li>`;
      document.querySelector(".pagination").innerHTML = paginationLink;

}
displayProducts();
window.displayProducts = displayProducts;


// //////////////////////////////////////////////////////////////////////////////////

function customModal() {
    let currentIndex = 0;

    const modal = document.querySelector(".my-modal");
    const closeBtn = document.querySelector(".close-btn");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");
    const modalContent = modal.querySelector(".modal-content");
    const products = document.querySelectorAll(".product");

    products.forEach((product, index) => {
        product.addEventListener('click', (e) => {
            currentIndex = index;
            modal.classList.remove('d-none');
            modalContent.innerHTML = `<div class="product">${product.innerHTML}</div>`; 
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.add('d-none');
    });

    rightBtn.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex >= products.length) {
            currentIndex = 0; 
        }
        modalContent.innerHTML = `<div class="product">${products[currentIndex].innerHTML}</div>`;
    });

    leftBtn.addEventListener("click", () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = products.length - 1; 
        }
        modalContent.innerHTML = `<div class="product">${products[currentIndex].innerHTML}</div>`;
    });
}
