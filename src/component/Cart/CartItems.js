import InventoryContext from "../Store/InvertoryContext";
import { useContext } from "react";
import "./CartItems.css";
import Button from "../Button/Button";
import ReactDOM from "react-dom";

function CartItems(props) {
  const MedsCtx = useContext(InventoryContext);
  const { addToCart, handleCartItemsDel } = MedsCtx;

  const totalAmount = addToCart.reduce(
    (total, meds) => total + meds.price*meds.qty ,
    0
  );

  const handleDelete = (id) => {
    handleCartItemsDel(id);
  };

  let CartItem =
    addToCart &&
    addToCart.map((meds) => (
      <ul className="cart-modal-items" key={meds._id}>
        <li>
          <span>Name:{meds.name}</span>
          <span>Price:{meds.price}</span>
          <span>Qty:{meds.qty}</span>

          <span>
            <Button
              type="button"
              onClick={() => handleDelete(meds._id)}
            >
              X
            </Button>
          </span>
        </li>
      </ul>
    ));

  return (
    <div className="cart">
      <div className="cart-modal">
        {CartItem}
        <div className="amt">
          {addToCart.length > 0 ? (
            <>
              <span>Total Amount: {totalAmount}</span>
              <div className="btn-cart">
                <Button type="button" onClick={props.onClick}>
                  Close
                </Button>
                <Button type="button">Order</Button>
              </div>
            </>
          ) : (
            <>
              <p>Cart-Is-Empty</p>
              <Button type="button" onClick={props.onClick}>
                Close
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const CartModal = (props) => {
  return ReactDOM.createPortal(
    <CartItems onClick={props.onClick} />,
    document.getElementById("modal-root")
  );
};

export default CartModal;
