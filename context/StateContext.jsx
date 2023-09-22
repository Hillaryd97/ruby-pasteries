import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Load cart data from local storage when the component mounts
  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem("cartData"));
    if (storedCartData) {
      const { cartItems, totalPrice, totalQuantity } = storedCartData;
      setCartItems(cartItems);
      setTotalPrice(totalPrice);
      setTotalQuantity(totalQuantity);
    }
  }, []);

  // Save cart data to local storage whenever it changes
  useEffect(() => {
    const cartData = { cartItems, totalPrice, totalQuantity };
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartItems, totalPrice, totalQuantity]);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantity((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }
    setQty(1);
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const removeProduct = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQuantity(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantity(prevTotalQuantities => prevTotalQuantities + 1);
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantity(prevTotalQuantities => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  const resetQty = () => {
    setQty(1);
  };

  const clearCart = () => {
    // Clear cart data and local storage
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantity(0);
    localStorage.removeItem("cartData");
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantity,
        qty,
        isCartOpen,
        toggleCart,
        incQty,
        decQty,
        onAdd,
        resetQty,
        toggleCartItemQuantity,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
