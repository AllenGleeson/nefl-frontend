# Cart Components

This folder contains all the shopping cart related components for the NEFL store.

## Components

### CartContext.tsx
- Provides cart state management using React Context and useReducer
- Handles cart operations: add, remove, update quantity, clear
- Persists cart data to localStorage
- Exports `CartProvider` and `useCart` hook

### CartIcon.tsx
- Displays the shopping cart icon with item count badge
- Clickable to toggle cart dropdown
- Shows "99+" for counts over 99

### CartDropdown.tsx
- Full-screen dropdown cart interface
- Contains cart items list and summary
- Handles outside clicks and escape key to close
- Responsive design with backdrop

### CartItem.tsx
- Individual cart item display
- Quantity controls (increase/decrease/remove)
- Shows product image, name, price, and options
- Handles item removal and quantity updates

### CartSummary.tsx
- Cart totals and checkout section
- Calculates shipping and tax
- Empty cart state display
- Checkout and clear cart buttons

## Usage

```tsx
import { CartProvider, CartIcon, CartDropdown, useCart } from './Cart'

// Wrap your store with CartProvider
<CartProvider>
  <StoreHeader />
  <ProductGrid />
</CartProvider>

// Use cart in components
const { addToCart, cart, removeFromCart } = useCart()
```

## Features

- ✅ Add/remove items from cart
- ✅ Update quantities
- ✅ Persistent storage (localStorage)
- ✅ Responsive design
- ✅ Keyboard navigation (Escape to close)
- ✅ Outside click to close
- ✅ Item count badge
- ✅ Cart totals with shipping/tax
- ✅ Empty cart state
- ✅ Product options (size, color) support
