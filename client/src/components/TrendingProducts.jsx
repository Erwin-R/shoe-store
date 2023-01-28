// const products = [
//   {
//     id: 1,
//     name: 'Leather Long Wallet',
//     color: 'Natural',
//     price: '$75',
//     href: '#',
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg',
//     imageAlt: 'Hand stitched, orange leather long wallet.',
//   },
// ]

import { useEffect, useState } from "react";
import axios from 'axios';

const TrendingProduct = (props) => {

  const [shoes, setShoes] = useState([]);

  {/* will show the first four shoes in db */}
  
//   useEffect(() => {
//       axios.get('http://localhost:8000/api/shoes')
//           .then(res => {
//               const allShoes = res.data.shoes;
//               setShoes(allShoes);
//           })
//           .catch(err => console.log(err))
//   }, [])

  {/* will show first four products with 'Featured' as one of the catgory names */}

  useEffect(() => {
    axios.get('http://localhost:8000/api/shoes')
        .then(res => {
            console.log(res.data.shoes)
            const allShoes = res.data.shoes;
            const filteredShoes = [];
            for(let i = 0; i < 4; i++) {
                if(allShoes[i].categories.includes("Featured")){
                    filteredShoes.push(allShoes[i])
                }
            }
            setShoes(filteredShoes);
        })
        .catch(err => console.log(err))
}, [])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Products</h2>
          {/* <a href="#" className="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block">
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a> */}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {shoes.map((product, i) => (
            <div key={i} className="group relative">
              <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  src={product.imgUrls[0]}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                <a href='/'>
                  <span className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
              <p className="mt-1 text-sm text-green">{product.categories[0]}</p>
              <p className="mt-1 text-md font-medium text-dark-blue">${product.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Shop the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default TrendingProduct;