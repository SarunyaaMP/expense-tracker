import ExpenseComponent from "../src/layout/index";
import Expenselist from "./components/Expenses/Expenselist";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Expenseform from "./components/Expenses/Expenseform";

const router = createBrowserRouter([
  {
      path : "/",
      element : <ExpenseComponent/>,
      children : [
        {
          path : "",
          element : <Expenselist/>
        },
        {
          path : "add-expense",
          element : <Expenseform operation={"ADD"}/>
        },
        {
          path : "edit-expense/:id",
          element : <Expenseform operation={"EDIT"}/>
        },
        {
          path : "analytics",
          element : <h1>Analytics Page</h1>
        },
        {
          path : "*",
          element : <h1>Page is not found</h1>
        }
      ]
  }
])

function App() {

  return (
    <RouterProvider router={router}/>
  );
}

export default App;