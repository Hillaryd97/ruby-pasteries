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
  const [name, setName] = useState(""); // Add name state
  const [address, setAddress] = useState(""); // Add address state
  const [email, setEmail] = useState(""); // Add email state
  const [deliveryLocation, setDeliveryLocation] = useState("Abuja"); // Set your default location here

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
  const [deliveryType, setDeliveryType] = useState("Pickup (Free)");
  const [updatedTotalPrice, setupdatedTotalPrice] = useState(0);
  const deliveryFees = {
    "ABACHA BARRACKS": 2500,
    AIRPORT: 6000,
    "APO 1": 2500,
    "APO 2": 2500,
    "APO 3": 2500,
    ASOKORO: 2000,
    CBD: 1500,
    DAWAKI: 3000,
    DURUMI: 2500,
    DUTSE: 4000,
    GADUWA: 2500,
    GALADIMAWA: 2500,
    GARKI: 2000,
    GISHIRI: 2000,
    GUDU: 2500,
    GUZAPE: 2500,
    "GWARIMPA 1": 3000,
    "GWARIMPA 2": 3500,
    IDU: 2500,
    JABI: 2000,
    JAHI: 2000,
    JIKWOYI: 3500,
    KADO: 2500,
    KARIMO: 3000,
    KARO: 3000,
    KATAMPE: 2500,
    "KUBWA 1": 3500,
    "KUBWA 2": 4000,
    KUJE: 6000,
    "LIFE CAMP 1": 2500,
    "LIFE CAMP 2": 3000,
    LOKOGOMA: 2500,
    "LUGBE 1": 3000,
    "LUGBE 2": 3500,
    "LUNGI BARRACKS": 2000,
    MABUSHI: 2000,
    MAITAMA: 1500,
    MPAPE: 2500,
    SAUKA: 5000,
    UTAKO: 2000,
    WUSE: 1500,
    WUYE: 2000,
  };

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

  const handleNameChange = (e) => {
    const nameValue = e.target.value;
    // setFormData({ ...formData, phone: phoneValue });
    setName(nameValue); // Update the phone in the context
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    // setFormData({ ...formData, phone: phoneValue });
    setEmail(emailValue); // Update the phone in the context
  };

  const handleAddressChange = (e) => {
    const addressValue = e.target.value;
    // setFormData({ ...formData, address: addressValue });
    setAddress(addressValue); // Update the address in the context
  };

  const [deliveryFee, setDeliveryFee] = useState(0); // Initialize with 0

  const calculateDeliveryFee = () => {
    if (deliveryType === "Home Delivery") {
    } else if (deliveryType === "AIRPORT") {
      return 6000.0;
    } else if (deliveryType === "APO 1") {
      return 2500.0;
    } else if (deliveryType === "APO 2") {
      return 2500.0;
    } else if (deliveryType === "APO 3") {
      return 2500.0;
    } else if (deliveryType === "ASOKORO") {
      return 2000.0;
    } else if (deliveryType === "CBD") {
      return 1500.0;
    } else if (deliveryType === "DAWAKI") {
      return 3000.0;
    } else if (deliveryType === "DURUMI") {
      return 2500.0;
    } else if (deliveryType === "DUTSE") {
      return 4000.0;
    } else if (deliveryType === "GADUWA") {
      return 2500.0;
    } else if (deliveryType === "GALADIMAWA") {
      return 2500.0;
    } else if (deliveryType === "GARKI") {
      return 2000.0;
    } else if (deliveryType === "GISHIRI") {
      return 2000.0;
    } else if (deliveryType === "GUDU") {
      return 2500.0;
    } else if (deliveryType === "GUZAPE") {
      return 2500.0;
    } else if (deliveryType === "GWARIMPA 1") {
      return 3000.0;
    } else if (deliveryType === "GWARIMPA 2") {
      return 3500.0;
    } else if (deliveryType === "IDU") {
      return 2500.0;
    } else if (deliveryType === "JABI") {
      return 2000.0;
    } else if (deliveryType === "JAHI") {
      return 2000.0;
    } else if (deliveryType === "JIKWOYI") {
      return 3500.0;
    } else if (deliveryType === "KADO") {
      return 2500.0;
    } else if (deliveryType === "KARIMO") {
      return 3000.0;
    } else if (deliveryType === "KARO") {
      return 3000.0;
    } else if (deliveryType === "KATAMPE") {
      return 2500.0;
    } else if (deliveryType === "KUBWA 1") {
      return 3500.0;
    } else if (deliveryType === "KUBWA 2") {
      return 4000.0;
    } else if (deliveryType === "KUJE") {
      return 6000.0;
    } else if (deliveryType === "LIFE CAMP 1") {
      return 2500.0;
    } else if (deliveryType === "LIFE CAMP 2") {
      return 3000.0;
    } else if (deliveryType === "LOKOGOMA") {
      return 2500.0;
    } else if (deliveryType === "LUGBE 1") {
      return 3000.0;
    } else if (deliveryType === "LUGBE 2") {
      return 3500.0;
    } else if (deliveryType === "LUNGI BARRACKS") {
      return 2000.0;
    } else if (deliveryType === "MABUSHI") {
      return 2000.0;
    } else if (deliveryType === "MAITAMA") {
      return 1500.0;
    } else if (deliveryType === "MPAPE") {
      return 2500.0;
    } else if (deliveryType === "SAUKA") {
      return 5000.0;
    } else if (deliveryType === "UTAKO") {
      return 2000.0;
    } else if (deliveryType === "WUSE") {
      return 1500.0;
    } else if (deliveryType === "WUYE") {
      return 2000.0;
    } else if (deliveryType === "ABACHA BARRACKS") {
      return 2500.0;
    } else if (deliveryType === "Pickup") {
      return 0.0; // No delivery fee for Pickup
    }

    return 0.0; // Default to 0 if deliveryType is not recognized
  };

  // Update delivery fee when deliveryType changes
  useEffect(() => {
    const fee = calculateDeliveryFee();
    setDeliveryFee(fee);
  }, [deliveryType]);

  // Calculate the total price including delivery fee
  const totalWithDelivery = totalPrice + deliveryFee;

  // // Update delivery fee when deliveryType changes
  // useEffect(() => {
  //   const fee = calculateDeliveryFee();
  //   setDeliveryFee(fee);
  // }, [deliveryType]);

  // // / Calculate the total price including delivery fee
  // const totalWithDelivery = totalPrice + deliveryFee;
  function generateRandomOrderId() {
    // Generate a random number between 100000 and 999999
    const orderId = Math.floor(Math.random() * 900000) + 100000;
    return orderId.toString(); // Convert the number to a string
  }
  const productNamesString = productNamesWithQuantity.join(", ");
  const postCartDetailsToSupabase = async () => {
    try {
      if (cartItems.length === 0) {
        alert(
          "Your cart is empty. Please add items to your cart before checking out."
        );
        return; // Don't proceed with the submission
      }

      // setupdatedTotalPrice(totalPrice + deliveryFee);

      setIsSubmitting(true); // Disable the submit button

      // Fetch existing rows with the same email
      const { data: existingRows, error: fetchError } = await supabase
        .from("cartDetails")
        .select("created_at")
        .eq("email", email);
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
        const randomOrderId = generateRandomOrderId();
        const { data, error } = await supabase.from("cartDetails").upsert([
          {
            order_id: randomOrderId,
            customer_name: name,
            email: email,
            product_name: productNamesString, // Concatenate product names
            quantity: totalQuantity,
            total_price: totalWithDelivery, // Update the total price with delivery fee
            delivery_type: deliveryType,
            payment_type: paymentType,
            phone: phone, // Include phone in the data
            address: address, // Include address in the data
            created_at: new Date(), // Replace with the actual created_at value
            order_completed: "Pending"
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
    // clearCart();
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
        handleEmailChange,
        handleNameChange,
        handlePhoneChange,
        phone, // Provide phone to the context
        address, // Provide address to the context
        name,
        email,
        updatedTotalPrice,
        calculateDeliveryFee,
        deliveryFee,
        setDeliveryFee,
        totalWithDelivery,
        deliveryFees,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
