import React, { useEffect, useState } from "react";
import InventoryContext from "./InvertoryContext";

function InventoryProvider(props) {

  const [form, setForm] = useState([]);
  const [addToCart, setAddToCart] = useState([]);


  useEffect(() => {
    fetchData("product");
  }, []);

  useEffect(() => {
    fetchData("productToCart");
  }, []);

  // Making Api Call to fetch Data

  const fetchData = async (endpoint) => {
    try {
      let Api;
      
      if (endpoint === "product") {
        Api =
          "https://crudcrud.com/api/e5076da2826c4ac5a762a49590213084/product";
      } else if (endpoint === "productToCart") {
        Api =
          "https://crudcrud.com/api/e5076da2826c4ac5a762a49590213084/productToCart";
      }

      const fetchProduct = await fetch(Api);
      let response = await fetchProduct.json();
  
      if (fetchProduct.ok) {
        if (endpoint === "product") {
          setForm(response);
        } else if (endpoint === "productToCart") {
          setAddToCart(response);
        }
      } else {
        throw new Error(response.Error.message);
      }
    } catch (error) {
      alert("failed", error);
    }
  };

  // Making Api call to send Data

  const sendData = async (data, endpoint) => {
    try {
      let Api;
      if (endpoint === "product") {
        Api =
          "https://crudcrud.com/api/e5076da2826c4ac5a762a49590213084/product";
      } else if (endpoint === "productToCart") {
        Api =
          "https://crudcrud.com/api/e5076da2826c4ac5a762a49590213084/productToCart";
      }

      const sendingProduct = await fetch(Api, {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "content-type": "application/json",
        },
      });
      let response = await sendingProduct.json();
      if (sendingProduct.ok) {
        alert("successful");
      } else {
        throw new Error(response.Error.message);
      }
    } catch (error) {
      alert("failed", error);
    }
  };


  

  //handling form submit and form state

  const handleFormSubmit = (medsData) => {
    const existingMed = form.find((meds) => meds._id === medsData._id);

    if (existingMed) {
      
      setForm((prev) => {
        return prev.map((meds) => {
          if (meds._id === existingMed._id) {
            return { ...meds };
          }
          return meds;
        })
      })
    } else {
      
      setForm((prev) => [...prev, medsData]);
    }


    sendData(medsData, "product");
  };


// Deleting Inventory
  const handleInventoryDel =(id)=>{
       let updateForm = form.filter((medsItems) => id !== medsItems._id);

       setForm(updateForm);
       deleteData(id, "product");
  
  }

  // Add-to-cart Button clicked

  const handleAddToCart = (id) => {
    let existingMeds = addToCart.find((meds) => id === meds._id);

    if (existingMeds) {
      setAddToCart((prevCartItems) => {
        return prevCartItems.map((meds) => {
          if (meds._id === id) {
            return { ...meds,qty:1};
          }
          return meds;
        });
      });
      sendData(existingMeds, "productToCart");
    } else {
      let cart = form.find((meds) => id === meds._id);
      setAddToCart((prev) => [...prev, { ...cart}]);
      sendData(cart, "productToCart");
    }
  };


  const handleCartItemsDel = (id) => {
    let updateCart = addToCart.filter((medsItems) => id !== medsItems._id);
   
    setAddToCart(updateCart);
     deleteData(id,'productToCart');
  
  };

  const deleteData = async (id,endpoint) => {
    try {


       let Api;
       if (endpoint === "product") {
         Api =
           `https://crudcrud.com/api/e5076da2826c4ac5a762a49590213084/product/${id}`;
       } else if (endpoint === "productToCart") {
         Api =
           `https://crudcrud.com/api/e5076da2826c4ac5a762a49590213084/productToCart/${id}`;
       }
      const deletingProduct = await fetch(Api, {
        method: "DELETE",
      });
     
      if (deletingProduct.ok) {
        alert("successfully Deleted");
      
      } else {
         let response = await deletingProduct.json();
        throw new Error(response.Error.message);
      }
    } catch (error) {
      alert("failed", error);
    }
  };



 
  const inventory = {
    handleFormSubmit,
    form,
    handleAddToCart,
    addToCart,
    handleCartItemsDel,
    handleInventoryDel,
  };

  return (
    <InventoryContext.Provider value={inventory}>
      {props.children}
    </InventoryContext.Provider>
  );
}

export default InventoryPro