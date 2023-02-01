/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/

//https://tailwindui.com/img/ecommerce-images/category-page-07-product-01.jpg
//https://tailwindui.com/img/ecommerce-images/category-page-07-product-02.jpg
// https://tailwindui.com/img/ecommerce-images/category-page-07-product-03.jpg
import {Link} from 'react-router-dom';

const ProductList = (props) => {
  console.log(props.allShoes);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden py-16 px-4 sm:py-4 sm:px-6 lg:px-4">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {/* {products.map((product) => (
            <a key={product.id} href={product.href} className="group text-sm">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 font-medium text-gray-900">{product.name}</h3>
              <p className="italic text-gray-500">{product.availability}</p>
              <p className="mt-2 font-medium text-gray-900">{product.price}</p>
            </a>
          ))} */}
          {props.allShoes.map((shoe, i) =>{
            return(
            <Link key={i} to={"/product/" + shoe._id} className="group text-sm">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img
                  src={shoe.imgUrls[0]}
                  alt={"product imageAlt"}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 font-medium text-gray-900">{shoe.name}</h3>
              <p className="italic text-green">{shoe.categories[0]}</p>
              <p className="mt-2 font-medium text-dark-blue">${shoe.price}</p>
            </Link>
            );
          }
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList;