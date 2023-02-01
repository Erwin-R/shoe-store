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
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import QuickView from './QuickView';

const ProductList = (props) => {
  // console.log(props.allShoes);
  const [hoverIdx, setHoverIdx] = useState([]);
  const [quickViewIdx, setQuickViewIdx] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hoverArr = [];
    for(let i in props.allShoes){
      hoverArr.push(false);
    }
    setHoverIdx([...hoverArr]);
    setQuickViewIdx([...hoverArr]);
  }, [props.allShoes])
  
  const hover = (i) => {
    hoverIdx[i] = !hoverIdx[i]
    setHoverIdx([...hoverIdx]);
  }

  const quickView = (i) => {
    // e.preventDefault();
    quickViewIdx[i] = !quickViewIdx[i];
    setQuickViewIdx([...quickViewIdx]);
    console.log('is it working?')
    console.log(quickViewIdx);
  }

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
            <div key={i} className=" text-sm">
                <div onMouseOver={() => hover(i)} onMouseOut={() => hover(i)} className="relative">
                  <Link to={"/product/" + shoe._id} className="group">
                    <div className='aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75 '>
                      <img
                        src={shoe.imgUrls[0]}
                        alt={"product imageAlt"}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </Link>
                  {hoverIdx[i] === true ? 
                  <button onClick={() => quickView(i)} className=' absolute z-10 bottom-5 left-9 p-3 bg-dark-blue text-white w-3/4 rounded-lg hover:bg-light-blue'>Quick View</button> 
                  : ''}
                </div>
                <Link to={"/product/" + shoe._id}>
                  <h3 className="mt-4 font-medium text-gray-900">{shoe.name}</h3>
                  <p className="italic text-green">{shoe.categories[0]}</p>
                  <p className="mt-2 font-medium text-dark-blue">${shoe.price}</p>
                </Link>
                {<QuickView 
                  quickView={quickView}
                  isOpen={quickViewIdx[i] ? quickViewIdx[i] = false : quickViewIdx[i] = true} 
                  idx={i}
                  shoe={shoe}
                  shoeSizes={shoe.size}
                  />}
            </div>
            );
          }
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList;