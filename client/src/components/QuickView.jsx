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
import { Fragment, useState, useEffect, useContext } from 'react'
import { Dialog, RadioGroup, Transition, Menu } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import ShoeContext from '../context/ShoeContext'

const product = {
  name: "Women's Basic Tee",
  price: '$32',
  rating: 3.9,
  reviewCount: 512,
  href: '#',
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
  imageAlt: "Back of women's Basic Tee in black.",
  colors: [
    { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
    { name: 'Heather Grey', bgColor: 'bg-gray-400', selectedColor: 'ring-gray-400' },
  ],
  sizes: [
    { name: 'XXS', inStock: true },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: 'XXL', inStock: false },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const QuickView = (props) => {
  const [open, setOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  const [sizes, setSizes] = useState(props.shoeSizes);
  const [shoeSize, setShoeSize] = useState('');
  const [shoe, setShoe] = useState(props.shoe);

  const setItemsInCart = useContext(ShoeContext).setItemsInCart;
  const numInCart = useContext(ShoeContext).numInCart;
  const setNumInCart = useContext(ShoeContext).setNumInCart;

  useEffect(() => {
    console.log('working on it');
    setOpen(props.isOpen);
    setShoeSize(shoe.size[0]);
    setShoe({...shoe, quantity: 1, size: sizes[0]});
    console.log(shoe);
  }, [props.isOpen])

  const sizeHandler = (e) => {
    setShoeSize(e.target.id);
    setShoe({...shoe, size: e.target.id})
    console.log(e.target.id)
  }

  const addToCart = (e) => {
    e.preventDefault();
    let currentProducts = JSON.parse(sessionStorage.getItem('itemsInCart'));

    if(currentProducts !== null){
      for(let i in currentProducts){
        console.log(currentProducts[i])
        if(Object.values(currentProducts[i]).includes(shoe._id) && Object.values(currentProducts[i]).includes(shoe.size)){
          currentProducts[i].quantity++;
          sessionStorage.setItem('itemsInCart', JSON.stringify([...currentProducts]));
          sessionStorage.setItem('numInCart', numInCart + 1);
          const updateItemsInCart = JSON.parse(sessionStorage.getItem('itemsInCart'));
          setItemsInCart(updateItemsInCart);
          setNumInCart(sessionStorage.numInCart);
          console.log('hello')
          return;
        }
      }
      sessionStorage.setItem('itemsInCart', JSON.stringify([...currentProducts, shoe]));
      sessionStorage.setItem('numInCart', numInCart + 1);
      const updateItemsInCart = JSON.parse(sessionStorage.getItem('itemsInCart'));
      setItemsInCart(updateItemsInCart);
    } else {
      sessionStorage.setItem('itemsInCart', JSON.stringify([shoe]));
      sessionStorage.numInCart = 1;
    }
    setNumInCart(sessionStorage.numInCart);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden md:inline-block md:h-screen md:align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => props.quickView(props.idx)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:items-center lg:gap-x-8">
                    <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img src={shoe.imgUrls[0]} alt={shoe.name} className="object-cover object-center" />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                    <p className=" text-green">{shoe.categories[0]}</p>
                      <h2 className="text-xl font-medium text-gray-900 sm:pr-12">{shoe.name}</h2>

                      <section aria-labelledby="information-heading" className="mt-1">
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="font-medium text-gray-900">${shoe.price}</p>

                        {/* Reviews */}
                        {/* <div className="mt-4">
                          <h4 className="sr-only">Reviews</h4>
                          <div className="flex items-center">
                            <p className="text-sm text-gray-700">
                              {product.rating}
                              <span className="sr-only"> out of 5 stars</span>
                            </p>
                            <div className="ml-1 flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                    'h-5 w-5 flex-shrink-0'
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <div className="ml-4 hidden lg:flex lg:items-center">
                              <span className="text-gray-300" aria-hidden="true">
                                &middot;
                              </span>
                              <a href="#" className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                See all {product.reviewCount} reviews
                              </a>
                            </div>
                          </div>
                        </div> */}
                      </section>

                      <section aria-labelledby="options-heading" className="mt-8">
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <form>
                          {/* Color picker */}
                          {/* <div>
                            <h4 className="text-sm font-medium text-gray-900">Color</h4>

                            <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                              <RadioGroup.Label className="sr-only"> Choose a color </RadioGroup.Label>
                              <div className="flex items-center space-x-3">
                                {product.colors.map((color) => (
                                  <RadioGroup.Option
                                    key={color.name}
                                    value={color}
                                    className={({ active, checked }) =>
                                      classNames(
                                        color.selectedColor,
                                        active && checked ? 'ring ring-offset-1' : '',
                                        !active && checked ? 'ring-2' : '',
                                        '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                      )
                                    }
                                  >
                                    <RadioGroup.Label as="span" className="sr-only">
                                      {' '}
                                      {color.name}{' '}
                                    </RadioGroup.Label>
                                    <span
                                      aria-hidden="true"
                                      className={classNames(
                                        color.bgColor,
                                        'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                      )}
                                    />
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                          </div> */}

                          {/* Size picker */}
                          <div className='flex items-center gap-3'>
                            <h2>Size:</h2>
                            <Menu as="div" className="relative inline-block text-left">
                                  <div>
                                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                          {shoeSize}
                                          <ChevronDownIcon
                                              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-green"
                                              aria-hidden="true"
                                          />
                                      </Menu.Button>
                                  </div>

                                  <Transition
                                      as={Fragment}
                                      enter="transition ease-out duration-100"
                                      enterFrom="transform opacity-0 scale-95"
                                      enterTo="transform opacity-100 scale-100"
                                      leave="transition ease-in duration-75"
                                      leaveFrom="transform opacity-100 scale-100"
                                      leaveTo="transform opacity-0 scale-95"
                                  >
                                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                          <div className="py-1">
                                            {sizes?.map((size, sizeIdx) => (
                                              <Menu.Item key={size + sizeIdx} id={size}>
                                                  <p onClick={(e) => sizeHandler(e)} className='block px-4 py-2 text-sm cursor-pointer hover:bg-light-blue hover:text-white'>{size}</p>
                                              </Menu.Item>
                                            ))}
                                          </div>
                                      </Menu.Items>
                                  </Transition>
                              </Menu>
                          </div>
                          {/* <div className="mt-8">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-gray-900">Size</h4>
                              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                Size guide
                              </a>
                            </div>

                            <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-2">
                              <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                              <div className="grid grid-cols-7 gap-2">
                                {shoe.sizes?.map((size) => (
                                  <RadioGroup.Option
                                    key={size.name}
                                    value={size}
                                    className={({ active, checked }) =>
                                      classNames(
                                        size.inStock
                                          ? 'cursor-pointer focus:outline-none'
                                          : 'opacity-25 cursor-not-allowed',
                                        active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                                        checked
                                          ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                                          : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                        'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                                      )
                                    }
                                    disabled={!size.inStock}
                                  >
                                    <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                          </div> */}

                          <button
                            type="submit"
                            className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-dark-blue py-3 px-8 text-base font-medium text-white hover:bg-light-blue focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={(e) => addToCart(e)}
                          >
                            Add to cart
                          </button>

                          <p className="absolute top-4 left-4 text-center sm:static sm:mt-8">
                            <a href={'/product/' + shoe._id} className="font-medium text-dark-blue hover:text-light-blue">
                              View full details
                            </a>
                          </p>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default QuickView;