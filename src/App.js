
import './App.css';
import Form from './component/Form/Form';
import InventoryProvider from './component/Store/InventoryProvider';
import Inventory from './component/InventoryItems/Inventory';
import CartButton from './component/Cart/CartButton';
function App() {
  return (
    <InventoryProvider>
     <CartButton/>
      <Form />
      <Inventory/>
    </InventoryProvider>
  );
}

export default App;
