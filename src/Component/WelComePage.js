import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../auth-context";
import classes from "./WelcomePage.module.css";
import ExpenseItem from "./ExpenseItem";

const WelComePage = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [usersDetails, setUserDetails] = useState({
    photoUrl: "",
    displayName: "",
    email: "r",
  });
  
  const [expenseList, setExpenseList] = useState([]);
  const [expenseMoney, setExpenseMoney] = useState("");
  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("");

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCur9xCsh35ycJRAqP2U3DynKEpK8MDbj8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "applicaton/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        // console.log(data.users[0])
        setUserDetails(data.users[0]);
      });
  }, [authCtx.token]);
  const emailVerifyHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCur9xCsh35ycJRAqP2U3DynKEpK8MDbj8",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authCtx.token,
        }),
        headers: {
          "Content-Type": "applicaton/json",
        },
      }
    ).then((res) => {
      console.log(res, "vvvvv");
    });
  };

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };


  const expenseFormHandler = (e)=>{
    e.preventDefault()
    console.log(expenseMoney,expenseDescription,expenseCategory)
    let obj = {
      expensemoney : expenseMoney,
      expensecategory:expenseCategory,
      expensedescription: expenseDescription,
      id : Math.random()
    }

    setExpenseList([...expenseList,obj])
  }
  return (
    <>
      <header className={classes.header}>
        <h1>welcome to expense treacker </h1>
        <div>
          <p>
            {" "}
            your profile is incomplate{" "}
            <NavLink state={usersDetails} to="/update">
              update here
            </NavLink>
          </p>{" "}
          <button onClick={logoutHandler}> logout </button>
          <button onClick={emailVerifyHandler}>
            {" "}
            verify email {usersDetails.email}
          </button>
        </div>
      </header>

      <section className={classes.auth}>
        <h1> expense from</h1>
        <form onSubmit={expenseFormHandler}> 
          <div className={classes.control}>
            <label htmlFor="money">money</label>
            <input type="number" id="money"  onChange={(e) => { setExpenseMoney(e.target.value)}} />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">description</label>
            <input type="text" id="description"  onChange={(e) => { setExpenseDescription(e.target.value)}} />
            <label htmlFor="category">Choose a : category</label>

            <select name="category" id="category" onChange={(e) => { setExpenseCategory(e.target.value)}}>
              <option value="food">food</option>
              <option value="petrol">petrol</option>
              <option value="moive">moive</option>
              <option value="rent">rent</option>
            </select>
          </div>

          <button type="submit"> add Expense</button>
        </form>
      </section>

      <section>
        {expenseList.map((expense)=><ExpenseItem key={expense.id} exp={expense} />)}
      </section>
    </>
  );
};

export default WelComePage;
