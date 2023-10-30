import { Counter } from "./components/Counter";
import { Home } from "./components/Home";
import { Customer } from "./components/Customer";
import { Store } from "./components/Store"
import { Product } from "./components/Product";
import { Sale } from "./components/Sale";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },

  {
    path: '/Customers',
    element: <Customer />
    },
  {
    path: '/Stores',
    element: <Store />
    },
  {
      path: '/Products',
      element: <Product />
    },
  {
        path: '/Sales',
        element: <Sale />
    }
];

export default AppRoutes;
