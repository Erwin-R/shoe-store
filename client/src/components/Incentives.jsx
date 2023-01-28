import { ChatBubbleLeftRightIcon, GiftTopIcon, GlobeAltIcon, ShoppingCartIcon,  } from '@heroicons/react/24/outline';


const incentives = [
  {
    name: 'Free Shipping',
    description: "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
    icon: <GlobeAltIcon />,
  },
  {
    name: '24/7 Customer Support',
    description: 'Our AI chat widget is powered by a naive series of if/else statements. Guaranteed to irritate.',
    icon: <ChatBubbleLeftRightIcon />,
  },
  {
    name: 'Fast Shopping Cart',
    description: "Look how fast that cart is going. What does this mean for the actual experience? I don't know.",
    icon: <ShoppingCartIcon />,
  },
  {
    name: 'Gift Cards',
    description: "Buy them for your friends, especially if they don't like our store. Free money for us, it's great.",
    icon: <GiftTopIcon />,
  },
]



const Incentives = (props) => {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
          {incentives.map((incentive) => (
            <div key={incentive.name}>
              <h1 className='h-12 w-12 text-green'>{incentive.icon}</h1>
              <h3 className="mt-6 text-sm font-medium text-dark-blue">{incentive.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{incentive.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Incentives;