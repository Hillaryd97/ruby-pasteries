import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { supabase } from "../src/createClient.js";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);
  const token = JSON.parse(sessionStorage.getItem("token"));
  const [phone, setPhone] = useState(""); // Add phone state
  const [address, setAddress] = useState(""); // Add address state
  
  let foundProduct;
  let index;

  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const productNamesWithQuantity = cartItems.map(
    (item) => `${item.name} (${item.quantity})`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentType, setPaymentType] = useState("Bank Transfer"); // New state for payment type
  const [deliveryType, setDeliveryType] = useState("Home Delivery");

  const setDelivery = (type) => {
    setDeliveryType(type);
  };

  const setPayment = (type) => {
    setPaymentType(type);
  };


  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    // setFormData({ ...formData, phone: phoneValue });
    setPhone(phoneValue); // Update the phone in the context
  };

  const handleAddressChange = (e) => {
    const addressValue = e.target.value;
    // setFormData({ ...formData, address: addressValue });
    setAddress(addressValue); // Update the address in the context
  };

  const productNamesString = productNamesWithQuantity.join(", ");
  const postCartDetailsToSupabase = async () => {
    try {
      if (cartItems.length === 0) {
        alert(
          "Your cart is empty. Please add items to your cart before checking out."
        );
        return; // Don't proceed with the submission
      }
      setIsSubmitting(true); // Disable the submit button

      // Fetch existing rows with the same email
      const { data: existingRows, error: fetchError } = await supabase
        .from("cartDetails")
        .select("created_at")
        .eq("email", token.user.email);

      if (fetchError) {
        throw fetchError;
      }

      // Define a time threshold for considering duplicates (e.g., 1 minute)
      const duplicateThreshold = 10 * 1000; // 60 seconds

      // Check if there's an existing row with a similar created_at within the threshold
      const isDuplicate = existingRows.some((row) => {
        const existingTimestamp = new Date(row.created_at).getTime();
        const currentTimestamp = new Date().getTime();
        return (
          Math.abs(existingTimestamp - currentTimestamp) <= duplicateThreshold
        );
      });

      if (!isDuplicate) {
        // No duplicate, proceed with insertion
        const { data, error } = await supabase.from("cartDetails").upsert([
          {
            customer_name: token.user.user_metadata.fullname,
            email: token.user.email,
            product_name: productNamesString, // Concatenate product names
            quantity: totalQuantity,
            total_price: totalPrice,
            delivery_type: deliveryType,
            payment_type: paymentType,
            phone: phone, // Include phone in the data
            address: address, // Include address in the data
            created_at: new Date(), // Replace with the actual created_at value
          },
        ]);

        if (error) {
          throw error;
        }

        // Data has been successfully inserted or updated in Supabase
        console.log("Cart details posted to Supabase:", data);
      } else {
        // A row with a similar created_at already exists, handle accordingly
        alert("A similar order already exists!");
      }

      setIsSubmitting(false); // Re-enable the submit button
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error posting cart details to Supabase:", error.message);
    }
    clearCart();
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
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
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

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantity(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantity((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantity((prevTotalQuantities) => prevTotalQuantities - 1);
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
        paymentType, // Provide the selected payment type to the context
        setPayment,
        deliveryType, // Provide the selected delivery type to the context
        setDelivery,
        postCartDetailsToSupabase,
        handleAddressChange,
        handlePhoneChange,
        phone, // Provide phone to the context
        address, // Provide address to the context
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
