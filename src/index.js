import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
//import App from "./App";
import reportWebVitals from "./reportWebVitals";

function Header() {
  const red = { color: "red" };

  return (
    <header className="menu">
      <h1>Fast React Pizza Sevice</h1>
      <h1 className="menu-head" style={{ fontSize: "40px", ...red }}>
        Our menu:
      </h1>
    </header>
  );
}

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: true,
  },
];

function Pizza({ pizzaObj, addPizza }) {
  // if (pizzaObj.soldOut) return null;

  return (
    <li className="pizza" onClick={() => addPizza(pizzaObj.name)}>
      <h3>{pizzaObj.name}</h3>
      {pizzaObj.soldOut ? (
        <>
          <img
            className="sold-out"
            alt={pizzaObj.name}
            src={pizzaObj.photoName}
          />
          <p>{pizzaObj.ingredients}</p>
          <p className="red">is empty</p>
        </>
      ) : (
        <>
          <img alt={pizzaObj.name} src={pizzaObj.photoName} />
          <p>{pizzaObj.ingredients}</p>
          <p>{pizzaObj.price}€</p>
        </>
      )}
    </li>
  );
}

function Menu({ addPizza }) {
  return (
    <main className="menu">
      <ul className="pizzas">
        {pizzaData.map((pizza) => (
          <Pizza key={pizza.name} pizzaObj={pizza} addPizza={addPizza} />
        ))}
      </ul>
    </main>
  );
}

function Footer({ pizzaOrder, orderCount, updateOrderCount }) {
  const [time, setTime] = useState(new Date());
  const startOpen = 12;
  const endOpen = 22;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isOpen = time.getHours() >= startOpen && time.getHours() < endOpen;

  return (
    <footer>
      <p>{time.toLocaleTimeString()}</p>
      <p style={{ color: isOpen ? "black" : "red" }}>
        {isOpen ? "We're currently open." : "We're currently closed."}
      </p>
      <div className="order">
        <button className="btn" onClick={updateOrderCount}>
          Order
        </button>
      </div>
      <p>You ordered {orderCount} times.</p>
      <p>
        Your order:{" "}
        {pizzaOrder.length === 0 ? "nothing" : pizzaOrder.join(", ")}
      </p>
    </footer>
  );
}

function App() {
  const [pizzaOrder, setPizzaOrder] = useState([]);
  const [orderCount, setOrderCount] = useState(0);

  const addPizza = (name) => {
    setPizzaOrder((prevOrder) => [...prevOrder, name]);
  };

  const updateOrderCount = () => {
    setOrderCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <Header />
      <Menu pizzaData={pizzaData} addPizza={addPizza} />
      <Footer
        pizzaOrder={pizzaOrder}
        orderCount={orderCount}
        updateOrderCount={updateOrderCount}
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
