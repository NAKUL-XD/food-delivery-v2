import { createContext, useEffect, useState } from 'react';
import api from '../api'; // ✅ Axios instance with baseURL from env

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  // ✅ Add to Cart
  const addToCart = async (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      try {
        await api.post('/api/cart/add', { itemId }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        console.error("❌ Error adding item to cart:", error);
      }
    }
  };

  // ✅ Remove from Cart
  const removeFromCart = async (itemId) => {
    setCartItems(prev => {
      const updated = { ...prev };
      if (!updated[itemId]) return prev;

      if (updated[itemId] === 1) delete updated[itemId];
      else updated[itemId] -= 1;

      return updated;
    });

    if (token) {
      try {
        await api.post('/api/cart/remove', { itemId }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        console.error("❌ Error removing item from cart:", error);
      }
    }
  };

  // ✅ Fetch food list
  const fetchFoodList = async () => {
    try {
      const response = await api.get('/api/food/list');
      setFoodList(response.data.data);
    } catch (error) {
      console.error("❌ Error fetching food list:", error);
    }
  };

  // ✅ Fetch cart from backend
  const fetchCart = async (authToken) => {
    try {
      const res = await api.get('/api/cart/get', {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (err) {
      console.error("❌ Error fetching cart:", err);
    }
  };

  // ✅ Total cart value
  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const item = food_list.find(p => p._id === itemId);
      if (item) total += item.price * cartItems[itemId];
    }
    return total;
  };

  // ✅ Total cart item count
  const getCartItemCount = () => {
    return Object.values(cartItems).reduce((acc, qty) => acc + qty, 0);
  };

  // ✅ Load food and cart on first render
  useEffect(() => {
    const init = async () => {
      await fetchFoodList();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await fetchCart(savedToken);
      }
    };
    init();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getCartItemCount,
    token,
    setToken,
    setCartItems,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
