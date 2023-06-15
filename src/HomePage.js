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

  let [groceriesStock, changeGroceriesStock] = useState({
    avocado: 23,
    beef: 10,
    bread: 8,
    carrot: 6,
    cheese: 12,
    icecream: 21,
    chocolate: 18,
  });

  let [cartStock, changeCartStock] = useState({
    avocado: 1,
    beef: 1,
    bread: 1,
    carrot: 1,
    cheese: 1,
    icecream: 1,
    chocolate: 1,
  });

  let [groceries, emptyGroceries] = useState([])

  let [total, updateTotal] = useState(0)

  let [mode, changeMode] = useState("shop")

  let [quantity, setQuantity] = useState(0)

  function decreaseGroceriesStock(itemName, price, image) {
    if (groceriesStock[itemName] > 0) {
      groceriesStock[itemName] = groceriesStock[itemName] - 1
      let updateStock = {
        ...groceriesStock,
        [itemName]: groceriesStock[itemName]
      }
      groceries.push({ image: image, groceryName: itemName, price: price, stock: cartStock[itemName], handleClick: decreaseCartStock })
      increaseCartStock(itemName)
      changeGroceriesStock(updateStock)
      countTotal()
    }
  }

  function increaseCartStock(itemName) {
    cartStock[itemName] = cartStock[itemName] + 1
    let updateStock = {
      ...cartStock,
      [itemName]: cartStock[itemName]
    }
    changeCartStock(updateStock)
  }

  function decreaseCartStock(itemName) {
    if (cartStock[itemName] > 0) {
      cartStock[itemName] = cartStock[itemName] - 1
      let updateStock = {
        ...cartStock,
        [itemName]: cartStock[itemName]
      }
      changeCartStock(updateStock)
      increaseGroceriesStock(itemName)
    }
  }

  function increaseGroceriesStock(itemName) {
    groceriesStock[itemName] = groceriesStock[itemName] + 1
    let updateStock = {
      ...groceriesStock,
      [itemName]: groceriesStock[itemName]
    }
    changeGroceriesStock(updateStock)
  }

  function countTotal() {
    total = total + 1
    let prices = [];
    let sum = 0;
    for (let i = 0; i < groceries.length; i++) {
      prices.push(groceries[i].price)
    }
    prices.forEach(num => { sum += num })
    updateTotal(sum)
  }

  function showReceipt() {
    changeMode('receipt')
    setQuantity(groceries.length)
  }

  function showShop() {
    emptyGroceries([])
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
                  <Grocery image={item.img} groceryName={item.groceryName} price={item.price} stock={groceriesStock[item.groceryName]} handleClick={decreaseGroceriesStock} />
                )
              })}
            </div>
            <div className='col'>
              <h1 className='text-center'>Cart</h1>
              {groceries.map((item) => <CartGrocery image={item.image} groceryName={item.groceryName} price={item.price} stock={item.stock} handleClick={item.handleClick} />)}
            </div>
          </div>
        </div>
        <Total countTotal={total} getReceipt={showReceipt} buttonName={"Order"}/>
        <Footer />
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <Receipt getShop={showShop} buttonName={"Continue Shopping"} totalSum={total} itemBought={quantity}/>
        <Footer />
      </div>
    );

  }
}

export default HomePage;
