import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'tastygo_cart';

function loadInitialCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find((i) => i.id === action.item.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case 'REMOVE':
      return state.filter((i) => i.id !== action.id);
    case 'INCREASE':
      return state.map((i) => (i.id === action.id ? { ...i, qty: i.qty + 1 } : i));
    case 'DECREASE':
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  // Lazy initializer reads any saved cart once, on first render, so the UI
  // never flashes an empty cart before hydrating from LocalStorage.
  const [items, dispatch] = useReducer(cartReducer, undefined, loadInitialCart);

  // Every cart change is written straight back to LocalStorage, so the cart
  // survives a page refresh — this is the PDF's "LocalStorage (Optional)"
  // feature, used for exactly what it's meant for.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.warn('Could not save cart to LocalStorage:', err);
    }
  }, [items]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const deliveryFee = items.length ? 40 : 0; // flat ₹40 delivery fee
    const total = subtotal + deliveryFee;
    const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
    return { subtotal, deliveryFee, total, itemCount };
  }, [items]);

  const value = {
    items,
    ...totals,
    addItem: (item) => dispatch({ type: 'ADD', item }),
    removeItem: (id) => dispatch({ type: 'REMOVE', id }),
    increase: (id) => dispatch({ type: 'INCREASE', id }),
    decrease: (id) => dispatch({ type: 'DECREASE', id }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
