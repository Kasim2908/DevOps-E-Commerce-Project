# Frontend Components

This directory contains reusable React components for the ShopHub e-commerce platform.

## Components Overview

### 🔍 ProductComparison.js
- **Purpose**: Allows users to compare up to 4 products side by side
- **Features**: 
  - Feature-based comparison table
  - Filter comparison by specific features
  - Add to cart directly from comparison
  - Remove products from comparison

### 🎛️ AdvancedFilters.js
- **Purpose**: Provides advanced filtering and sorting options
- **Features**:
  - Price range slider and input fields
  - Minimum rating filter
  - Sort by multiple criteria (price, rating, popularity, etc.)
  - Quick filter buttons
  - Clear all filters functionality

### 👤 UserAccount.js
- **Purpose**: User profile and account management
- **Features**:
  - Profile information editing
  - Order history with detailed views
  - Wishlist management
  - Account settings and notifications
  - Security settings

### 💬 LiveChat.js
- **Purpose**: Customer support chat interface
- **Features**:
  - Real-time messaging simulation
  - Quick reply buttons
  - Typing indicators
  - Online/offline status
  - Message timestamps

## Usage

```javascript
import { ProductComparison, AdvancedFilters, UserAccount, LiveChat } from '../components';

// Or import individually
import ProductComparison from '../components/ProductComparison';
```

## Component Props

### ProductComparison
```javascript
<ProductComparison
  products={compareProducts}
  onClose={() => setShowComparison(false)}
  onRemoveProduct={removeFromComparison}
/>
```

### AdvancedFilters
```javascript
<AdvancedFilters
  isOpen={showAdvancedFilters}
  onToggle={() => setShowAdvancedFilters(!showAdvancedFilters)}
  categories={categories}
  priceRange={priceRange}
  onPriceRangeChange={setPriceRange}
  sortBy={sortBy}
  onSortChange={setSortBy}
  minRating={minRating}
  onRatingChange={setMinRating}
/>
```

### UserAccount
```javascript
<UserAccount
  isOpen={showUserAccount}
  onClose={() => setShowUserAccount(false)}
  user={currentUser}
  orders={userOrders}
/>
```

### LiveChat
```javascript
<LiveChat
  isOpen={showLiveChat}
  onToggle={() => setShowLiveChat(!showLiveChat)}
/>
```

## Styling

All components use Tailwind CSS classes and custom CSS variables defined in `globals.css`. They support both light and dark themes automatically.

## State Management

Components are designed to be controlled components, receiving their state and handlers as props from the parent component. This ensures better state management and reusability.