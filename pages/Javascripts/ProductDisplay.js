// ProductDisplay.jss

import React, { useState } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { ShoppingCart, X, Package, Tag, Info } from 'lucide-react';

const ProductDisplay = ({ category = 'all' }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ title: '', message: '' });
  const [selectedSize, setSelectedSize] = useState(null);

  const products = {
    'Uniforms': [
      {
        id: 'uni-001',
        name: 'NU Basketball Jersey',
        price: 59.99,
        category: 'Uniforms',
        color: 'Blue/Gold',
        photo: '/api/placeholder/300/300',
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 20,
        description: 'Official NU Basketball team jersey, featuring moisture-wicking technology.'
      },
      {
        id: 'uni-002',
        name: 'NU Volleyball Jersey',
        price: 54.99,
        category: 'Uniforms',
        color: 'White/Blue',
        photo: '/api/placeholder/300/300',
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 15,
        description: 'Lightweight volleyball jersey with dynamic stretch fabric.'
      }
    ],
    'Bags': [
      {
        id: 'bag-001',
        name: 'NU Team Backpack',
        price: 45.99,
        category: 'Bags',
        color: 'Black/Gold',
        photo: '/api/placeholder/300/300',
        capacity: '30L',
        stock: 25,
        description: 'Durable team backpack with laptop compartment and water bottle holder.'
      }
    ],
    'Accessories': [
      {
        id: 'acc-001',
        name: 'NU Sports Water Bottle',
        price: 24.99,
        category: 'Accessories',
        color: 'Silver/Blue',
        photo: '/api/placeholder/300/300',
        capacity: '750ml',
        stock: 30,
        description: 'Insulated stainless steel water bottle with NU team logo.'
      }
    ]
  };

  const showNotification = (title, message) => {
    setAlertMessage({ title, message });
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const addToCart = (item) => {
    if (!selectedSize && item.sizes) {
      showNotification('Size Required', 'Please select a size before adding to cart');
      return;
    }

    const cartItem = {
      ...item,
      selectedSize,
      quantity: 1
    };

    setCartItems(prev => [...prev, cartItem]);
    showNotification('Added to Cart', `${item.name} has been added to your cart`);
    setSelectedSize(null);
    setSelectedItem(null);
  };

  const displayedProducts = category === 'all' ? 
    Object.values(products).flat() : 
    products[category] || [];

  const ProductCard = ({ item }) => (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={item.photo}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        {item.stock < 5 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            Low Stock
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">{item.name}</h3>
          <span className="text-xl font-bold text-blue-400">${item.price}</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <Tag className="w-4 h-4 text-gray-400" />
          <p className="text-gray-400 text-sm">{item.category}</p>
        </div>
        <button 
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          onClick={() => setSelectedItem(item)}
        >
          <Info className="w-4 h-4" />
          Quick View
        </button>
      </div>
    </div>
  );

  const QuickviewModal = ({ item, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <img 
              src={item.photo} 
              alt={item.name}
              className="w-full rounded-lg"
            />
            {item.stock < 5 && (
              <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                Only {item.stock} left
              </span>
            )}
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
            <p className="text-2xl font-bold text-blue-400 mb-4">${item.price}</p>
            
            <p className="text-gray-300 mb-4">{item.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                <p className="text-gray-400">Category: {item.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-400" />
                <p className="text-gray-400">Stock: {item.stock} available</p>
              </div>
            </div>
            
            {item.sizes && (
              <div className="mb-4">
                <p className="text-white font-semibold mb-2">Select Size:</p>
                <div className="flex gap-2 flex-wrap">
                  {item.sizes.map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        selectedSize === size 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <button 
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              onClick={() => addToCart(item)}
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {showAlert && (
        <Alert className="fixed top-20 right-4 z-50 w-96 bg-gray-800 border-blue-500">
          <AlertTitle className="text-white">{alertMessage.title}</AlertTitle>
          <AlertDescription className="text-gray-300">
            {alertMessage.message}
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedProducts.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      {selectedItem && (
        <QuickviewModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
};

export default ProductDisplay;