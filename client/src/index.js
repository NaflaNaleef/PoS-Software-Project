<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
=======
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import {BrowserRouter} from 'react-router-dom';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
    
//     <App />
   
//   </React.StrictMode>
// );

// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14


const stripePromise = loadStripe("pk_test_51R5U4eED2StRK7aLViqTuosxjsbxJoKo4px42qj00nROwB7Nq7TvzfpU6hOJCXjAJmBR5OEULvgbh9hTglKnXY7u00c7IxsNZQ");

ReactDOM.render(
  <React.StrictMode>
<<<<<<< HEAD
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById("root")
);


=======
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
>>>>>>> 2e821696327acc44563cdcb6768e199e64f37e14
