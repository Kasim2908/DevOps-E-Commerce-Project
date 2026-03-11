"use client";

import { useEffect, useState, useCallback } from "react";

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <span className="mr-2">{type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
      {message}
    </div>
  );
};

// Star Rating Component
const StarRating = ({ rating, size = 'text-sm' }) => (
  <div className={`flex items-center ${size}`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ))}
  </div>
);

// Skeleton Loader Component
const ProductSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden">
    <div className="h-64 skeleton" />
    <div className="p-6 space-y-3">
      <div className="h-4 skeleton w-3/4" />
      <div className="h-3 skeleton w-1/2" />
      <div className="h-8 skeleton w-1/3 mt-4" />
    </div>
  </div>
);

// Quick View Modal Component
const QuickViewModal = ({ product, onClose, onAddToCart, onAddToWishlist, isInWishlist }) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-700 dark:to-slate-600 rounded-2xl h-80 md:h-full flex items-center justify-center">
              <span className="text-[120px]">{product.emoji}</span>
              {product.badge && (
                <span className={`badge badge-${product.badge} absolute top-4 left-4`}>
                  {product.badge.toUpperCase()}
                </span>
              )}
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col">
              <button 
                onClick={onClose}
                className="self-end p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition"
              >
                ✕
              </button>
              
              <span className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-2">
                {product.category}
              </span>
              
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {product.name}
              </h2>
              
              <div className="flex items-center gap-3 mb-4">
                <StarRating rating={product.rating} size="text-lg" />
                <span className="text-gray-500 dark:text-gray-400">({product.reviews} reviews)</span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {product.fullDescription || product.description}
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                )}
                <span className="text-4xl font-bold gradient-text">${product.price}</span>
                {product.originalPrice && (
                  <span className="badge badge-sale">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
              
              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button 
                    className="qty-btn dark:bg-slate-700"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button 
                    className="qty-btn dark:bg-slate-700"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-4 mt-auto">
                <button
                  onClick={() => onAddToCart(product, quantity)}
                  className="flex-1 btn-primary text-white py-4 rounded-xl font-semibold text-lg"
                >
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </button>
                <button
                  onClick={() => onAddToWishlist(product)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isInWishlist 
                      ? 'bg-red-50 border-red-500 text-red-500' 
                      : 'border-gray-200 dark:border-slate-600 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  {isInWishlist ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Home() {
  const [message, setMessage] = useState("Connecting...");
  const [isConnected, setIsConnected] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [email, setEmail] = useState("");

  const categories = ["All", "Electronics", "Accessories", "Wearables", "Gaming"];

  const products = [
    { 
      id: 1, name: "Wireless Headphones Pro", price: 79.99, originalPrice: 99.99,
      emoji: "🎧", description: "Premium noise cancellation",
      fullDescription: "Experience crystal-clear audio with our premium wireless headphones featuring advanced noise cancellation technology, 40-hour battery life, and ultra-comfortable memory foam ear cushions.",
      category: "Electronics", rating: 5, reviews: 328, badge: "hot"
    },
    { 
      id: 2, name: "Smart Watch Ultra", price: 199.99, 
      emoji: "⌚", description: "Health & fitness tracking",
      fullDescription: "Track your fitness goals with precision. Features include heart rate monitoring, GPS tracking, sleep analysis, and water resistance up to 50 meters.",
      category: "Wearables", rating: 4, reviews: 256, badge: "new"
    },
    { 
      id: 3, name: "Premium Laptop Bag", price: 49.99, originalPrice: 69.99,
      emoji: "💼", description: "Stylish & protective",
      fullDescription: "Protect your laptop in style with our premium leather bag. Features multiple compartments, padded laptop sleeve, and adjustable shoulder strap.",
      category: "Accessories", rating: 4, reviews: 142, badge: "sale"
    },
    { 
      id: 4, name: "Smartphone Pro Max", price: 899.99, 
      emoji: "📱", description: "Pro-grade camera system",
      fullDescription: "Capture life's moments with our flagship smartphone featuring a 108MP camera system, 5G connectivity, and all-day battery life.",
      category: "Electronics", rating: 5, reviews: 489
    },
    { 
      id: 5, name: "Gaming Controller Elite", price: 69.99, 
      emoji: "🎮", description: "Pro-level precision",
      fullDescription: "Dominate your games with our elite controller featuring customizable buttons, hair-trigger locks, and textured grips for ultimate control.",
      category: "Gaming", rating: 5, reviews: 892, badge: "hot"
    },
    { 
      id: 6, name: "Wireless Earbuds", price: 129.99, originalPrice: 159.99,
      emoji: "🎵", description: "Immersive sound experience",
      fullDescription: "True wireless freedom with premium sound quality. Features active noise cancellation, transparency mode, and 8-hour battery life.",
      category: "Electronics", rating: 4, reviews: 567, badge: "sale"
    },
    { 
      id: 7, name: "Fitness Tracker Band", price: 39.99, 
      emoji: "💪", description: "24/7 activity monitoring",
      fullDescription: "Stay on top of your fitness goals with comprehensive activity tracking, sleep monitoring, and smartphone notifications.",
      category: "Wearables", rating: 4, reviews: 234, badge: "new"
    },
    { 
      id: 8, name: "Mechanical Keyboard RGB", price: 149.99, 
      emoji: "⌨️", description: "Tactile typing experience",
      fullDescription: "Elevate your typing with our mechanical keyboard featuring RGB backlighting, hot-swappable switches, and aluminum frame construction.",
      category: "Gaming", rating: 5, reviews: 412
    }
  ];

  const testimonials = [
    { id: 1, name: "Sarah Johnson", role: "Tech Enthusiast", avatar: "👩‍💻", rating: 5, 
      comment: "Amazing quality products and lightning-fast shipping! Will definitely shop here again." },
    { id: 2, name: "Mike Chen", role: "Gamer", avatar: "🎮", rating: 5, 
      comment: "Best gaming gear I've ever purchased. The controller quality is outstanding!" },
    { id: 3, name: "Emily Davis", role: "Fitness Coach", avatar: "🏃‍♀️", rating: 5, 
      comment: "The smart watch has transformed how I track my clients' progress. Highly recommend!" }
  ];

  const stats = [
    { label: "Happy Customers", value: 50000, suffix: "+" },
    { label: "Products Sold", value: 120000, suffix: "+" },
    { label: "5-Star Reviews", value: 15000, suffix: "+" },
    { label: "Countries Shipped", value: 45, suffix: "" }
  ];

  // Effects
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setIsConnected(true);
      })
      .catch(() => {
        setMessage("Backend offline - Demo mode");
        setIsConnected(false);
      });

    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Functions
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    showToast(`${product.name} added to cart!`);
    setQuickViewProduct(null);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      showToast('Removed from wishlist', 'info');
    } else {
      setWishlist([...wishlist, product]);
      showToast(`${product.name} added to wishlist!`);
    }
  };

  const getTotalPrice = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  const getTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showToast('Successfully subscribed to newsletter!');
      setEmail('');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-900' : 'bg-gray-50'}`}>
      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
        onAddToWishlist={toggleWishlist}
        isInWishlist={quickViewProduct && wishlist.some(item => item.id === quickViewProduct.id)}
      />

      {/* Header */}
      <header className="fixed w-full top-0 z-50 glass border-b border-gray-200/20">
        <div className="container-custom">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold gradient-text">ShopHub</span>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {['Home', 'Products', 'Features', 'Testimonials'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-3 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>

              {/* Wishlist */}
              <button className="relative p-3 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                <span>❤️</span>
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce-in">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative p-3 px-5 rounded-xl btn-primary text-white flex items-center gap-2"
              >
                <span>🛒</span>
                <span className="font-semibold">Cart ({getTotalItems()})</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sidebar */}
      {showCart && (
        <>
          <div className="modal-overlay" onClick={() => setShowCart(false)} />
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-800 z-[101] shadow-2xl animate-slide-in-right">
            <div className="flex flex-col h-full">
              {/* Cart Header */}
              <div className="p-6 border-b dark:border-slate-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart</h3>
                  <button onClick={() => setShowCart(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
                    ✕
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <span className="text-6xl mb-4 block">🛒</span>
                    <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-600 dark:to-slate-500 rounded-lg flex items-center justify-center">
                          <span className="text-3xl">{item.emoji}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                          <p className="text-indigo-600 dark:text-indigo-400 font-bold">${item.price}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="qty-btn dark:bg-slate-600 text-sm"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-medium dark:text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="qty-btn dark:bg-slate-600 text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600 self-start"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-2xl font-bold gradient-text">${getTotalPrice()}</span>
                  </div>
                  <button className="w-full btn-primary text-white py-4 rounded-xl font-semibold text-lg">
                    Checkout →
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 animate-bounce-in">
                🎉 New arrivals just dropped!
              </span>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
                Shop the Future of
                <span className="block">Technology</span>
              </h1>
              <p className="text-xl opacity-90 mb-8 max-w-lg animate-slide-up" style={{animationDelay: '0.2s'}}>
                Discover premium products with cutting-edge features. Free shipping on orders over $50.
              </p>
              <div className="flex gap-4 animate-slide-up" style={{animationDelay: '0.4s'}}>
                <button
                  onClick={() => scrollToSection('products')}
                  className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  Shop Now →
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                  Learn More
                </button>
              </div>

              {/* Backend Status */}
              <div className="mt-12 flex items-center gap-3 animate-fade-in" style={{animationDelay: '0.6s'}}>
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
                <span className="text-white/80 text-sm">{message}</span>
              </div>
            </div>

            {/* Floating Product Showcase */}
            <div className="relative hidden lg:block">
              <div className="relative w-96 h-96 mx-auto">
                {products.slice(0, 4).map((product, index) => (
                  <div
                    key={product.id}
                    className="absolute w-32 h-32 bg-white/20 glass rounded-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      top: `${[10, 0, 50, 60][index]}%`,
                      left: `${[0, 60, 70, 10][index]}%`,
                      animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                      animationDelay: `${index * 0.5}s`
                    }}
                    onClick={() => setQuickViewProduct(product)}
                  >
                    <span className="text-5xl">{product.emoji}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce">
          <span className="block mb-2 text-sm opacity-80">Scroll Down</span>
          <span className="block text-2xl">↓</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-800 border-y dark:border-slate-700">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 dark:bg-slate-900">
        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our curated collection of premium tech products designed to elevate your lifestyle
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            {/* Search */}
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-4 rounded-xl font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'btn-primary text-white'
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading
              ? [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
              : filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="product-card group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden card-hover animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Product Image */}
                    <div className="relative h-64 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center overflow-hidden">
                      <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                        {product.emoji}
                      </span>
                      
                      {/* Badge */}
                      {product.badge && (
                        <span className={`badge badge-${product.badge} absolute top-4 left-4`}>
                          {product.badge.toUpperCase()}
                        </span>
                      )}

                      {/* Quick Actions Overlay */}
                      <div className="product-image-overlay flex items-end justify-center gap-2 pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="p-3 bg-white rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
                        >
                          👁️
                        </button>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="p-3 bg-white rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                        >
                          {wishlist.some(item => item.id === product.id) ? '❤️' : '🤍'}
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                        {product.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <StarRating rating={product.rating} />
                        <span className="text-sm text-gray-400">({product.reviews})</span>
                      </div>

                      {/* Price & Action */}
                      <div className="flex items-center justify-between">
                        <div>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through mr-2">
                              ${product.originalPrice}
                            </span>
                          )}
                          <span className="text-2xl font-bold gradient-text">${product.price}</span>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="p-3 btn-primary text-white rounded-lg"
                        >
                          🛒
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            }
          </div>

          {filteredProducts.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">🔍</span>
              <p className="text-gray-500 dark:text-gray-400 text-lg">No products found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-slate-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose <span className="gradient-text">ShopHub</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'Free delivery on orders over $50' },
              { icon: '🔒', title: 'Secure Payment', desc: '256-bit SSL encryption' },
              { icon: '↩️', title: 'Easy Returns', desc: '30-day hassle-free returns' },
              { icon: '💬', title: '24/7 Support', desc: 'Round-the-clock assistance' }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-slate-700 card-hover"
              >
                <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                  <span className="text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 dark:bg-slate-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              What Our <span className="gradient-text">Customers</span> Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl card-hover animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <StarRating rating={testimonial.rating} size="text-xl" />
                <p className="text-gray-600 dark:text-gray-300 my-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{testimonial.avatar}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container-custom text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get 10% off your first order plus exclusive deals!
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:ring-4 focus:ring-white/30"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-2xl font-bold">ShopHub</span>
              </div>
              <p className="text-gray-400 mb-6">
                Your premium destination for cutting-edge tech products and accessories.
              </p>
              <div className="flex gap-4">
                {['📘', '🐦', '📸', '💼'].map((icon, i) => (
                  <button key={i} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors">
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {[
              { title: 'Shop', links: ['All Products', 'New Arrivals', 'Best Sellers', 'Sale'] },
              { title: 'Support', links: ['Help Center', 'Shipping Info', 'Returns', 'Contact Us'] },
              { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Blog'] }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-bold text-lg mb-6">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <button className="text-gray-400 hover:text-white transition-colors">{link}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">© 2026 ShopHub. All rights reserved.</p>
            <div className="flex gap-6 text-gray-400">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
      >
        ↑
      </button>
    </div>
  );
}