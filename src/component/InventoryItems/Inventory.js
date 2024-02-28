
import "./Inventory.css";
import InventoryContext from "../Store/InvertoryContext";
import { useContext } from "react";
import Button from "../Button/Button";

function Inventory() {
  const MedsCtx = useContext(InventoryContext);
  const { form, handleAddToCart, handleInventoryDel } = MedsCtx;

  const handleCart = (id) => {
    handleAddToCart(id);
  };

  const deleteInventory = (id) => {
    handleInventoryDel(id)
  };
  const medsList =
    form &&
    form.map((meds) => (
      <ul className="items" key={meds._id}>
        <li>
          <span>Name--{meds.name}</span>
          <span>Description--{meds.des}</span>
          <span>Price--{meds.price}</span>
          <span>Qty--{meds.qty}</span>

          <span>
            <Button type="button" onClick={() => handleCart(meds._id)}>
              Add-To-Cart
            </Button>
          </span>
          <span>
            <Button type="button" onClick={() => deleteInventory(meds._id)}>
             X
            </Button>
          </span>
        </li>
      </ul>
    ));

  return <div>{medsList}</div>;
}
export default Inventory;
