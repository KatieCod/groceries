import './App.css';
import Footer from './Footer';
import Header from './Header';
import Grocery from './Grocery';
import CartGrocery from './CartGrocery';
import Receipt from './Receipt';
import data from './data';
import Total from './Total';
import { useState } from 'react';

function HomePage() {

  let [groceriesStock, changeGroceriesStock] = useState(data.groceryData);

  let [shoppingCart, setShoppingCart] = useState([])

  let [total, updateTotal] = useState(0)

  let [mode, changeMode] = useState("shop")

  let [quantity, setQuantity] = useState(0)

  function decreaseGroceriesStock(itemName, price, image) {

    data.groceryData.map((item) => {
      if (item.groceryName === itemName && item.stock > 0) {
        item.stock = item.stock - 1
        let updateStock = {
          ...item,
          stock: item.stock
        }
        changeGroceriesStock(updateStock)

        const exist = shoppingCart.find(item => item.groceryName === itemName)
        if (exist) {
          item.cartStock = item.cartStock + 1
          let updateCart = {
            ...item,
            cartStock: item.cartStock
          }
          changeGroceriesStock(updateCart)
          let newShoppingCart = [...shoppingCart];
          let selectedItem;
          let index;
          for (let i = 0; i < newShoppingCart.length; i++) {
            if (newShoppingCart[i].groceryName === itemName) {
              selectedItem = { ...newShoppingCart[i] };
              index = i;
              break;
            }
          }
          selectedItem.cartStock = item.cartStock;
          newShoppingCart[index] = selectedItem;
          setShoppingCart(newShoppingCart)

        } else {
          changeGroceriesStock(updateStock)
          setShoppingCart([...shoppingCart, { image: image, groceryName: itemName, price: price, cartStock: item.cartStock, handleClick: decreaseCartStock }])
        }
        countTotal()
      }
    })
  }

  function decreaseCartStock(itemName) {
    setShoppingCart((prevShoppingCart) => {
      const updateShoppingCart = prevShoppingCart.map((item) => {
        if (item.groceryName === itemName && item.cartStock > 0) {
          item.cartStock = item.cartStock - 1;
        }
        return item;
      });
      return updateShoppingCart;
    });
    increaseGroceriesStock(itemName);
  }

  function increaseGroceriesStock(itemName) {
    data.groceryData.map((item) => {
      if (item.groceryName === itemName && item.cartStock > 0) {
        item.stock = item.stock + 1
        let updateStock = {
          ...groceriesStock,
          stock: item.stock
        }
        changeGroceriesStock(updateStock)
      }
    })
  }

  function countTotal() {
    let newShoppingCart = [...shoppingCart];
    let prices = [];
    let sum = 0;
    newShoppingCart.forEach(item => prices.push(item.price * item.cartStock))
    prices.forEach(num => { sum += num })
    updateTotal(sum)
  }

  function showReceipt() {
    changeMode('receipt')
    setQuantity(shoppingCart.length)
  }

  function showShop() {
    setShoppingCart([])
    changeMode('shop')
  }

  if (mode === 'shop') {
    return (
      <div>
        <Header />
        <div className='container justify-content-center'>
          <div className='row'>
            <div className='col'>
              <h1 className='text-center'>Groceries</h1>
              {data.groceryData.map((item) => {
                return (
                  <Grocery image={item.img} groceryName={item.groceryName} price={item.price} stock={item.stock} handleClick={decreaseGroceriesStock} />
                )
              })}
            </div>
            <div className='col'>
              <h1 className='text-center'>Cart</h1>
              {shoppingCart.map((item) => <CartGrocery image={item.image} groceryName={item.groceryName} price={item.price} stock={item.cartStock} handleClick={item.handleClick} />)}
            </div>
          </div>
        </div>
        <Total countTotal={total} getReceipt={showReceipt} buttonName={"Order"} />
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <Receipt getShop={showShop} buttonName={"Continue Shopping"} totalSum={total} itemBought={quantity} />
        <Footer />
      </div>
    );

  }
}

export default HomePage;
