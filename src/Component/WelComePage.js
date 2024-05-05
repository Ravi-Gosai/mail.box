import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../auth-context";
import classes from "./WelcomePage.module.css";
import ExpenseItem from "./ExpenseItem";
import { useCallback } from "react";

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
  const [editExpense, setEditExpense] = useState(false);
  const idRef = useRef('')

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


  // const expenseFormHandler = (e)=>{
  //   e.preventDefault()
  //   console.log(expenseMoney,expenseDescription,expenseCategory)
    // let obj = {
    //   expensemoney : expenseMoney,
    //   expensecategory:expenseCategory,
    //   expensedescription: expenseDescription,
    //   id : Math.random()
    // }

  //   setExpenseList([...expenseList,obj])
  // }
  const fetchExpenseHandler =  useCallback( async () => {
 
    try {
      const response = await fetch("https://authproject-16084-default-rtdb.firebaseio.com/expense.json");
      console.log(response);
      if (!response.ok) {
        throw new Error("something went wrong ..retrying");
      }
      const dataJson = await response.json();
      console.log(dataJson);
      const loadedexpense = []
    
      for(let key in dataJson){
        loadedexpense.push({
          id : key,
          expensemoney : dataJson[key].expensemoney,
          expensecategory : dataJson[key].expensecategory,
          expensedescription : dataJson[key].expensedescription
        })
      }
      

      
      setExpenseList(loadedexpense);
    } catch (error) {
      console.log(error.message);
     
     
    }
   
  },[])


  const expenseFormHandler =  async (e)=>{
    // console.log(expense)
    e.preventDefault()
    if(expenseCategory === ''){
      setExpenseCategory('food')
    }
    let obj = {
      expensemoney : expenseMoney,
      expensecategory:expenseCategory,
      expensedescription: expenseDescription,
      // id : Math.random()
    }
   const response = await fetch('https://authproject-16084-default-rtdb.firebaseio.com/expense.json',{
      method: 'POST',
      body : JSON.stringify(obj),
      headers : {
        'Content-Type' : 'application/json'
      }
    })
    const data = await response.json()
    // console.log(data) 
    fetchExpenseHandler()
  }

  useEffect(()=>{
    fetchExpenseHandler()
  },[fetchExpenseHandler])


  const deleteExpenseFun = async (id)=>{
    console.log(id)
    await fetch(`https://authproject-16084-default-rtdb.firebaseio.com/expense/${id}.json`,{
      method: 'DELETE'
    })
    fetchExpenseHandler()

  }

  const  editExpenseFun = (exp)=>{
    console.log(exp)
    setEditExpense(true)
    setExpenseCategory(exp.expensecategory)
    setExpenseDescription(exp.expensedescription)
    setExpenseMoney(exp.expensemoney)
    idRef.current = exp.id
  }

  const expenseUpadateHandler = ()=>{

    let obj = {
      expensemoney : expenseMoney,
      expensecategory:expenseCategory,
      expensedescription: expenseDescription,
      // id : Math.random()
    }
    fetch(`https://authproject-16084-default-rtdb.firebaseio.com/expense/${idRef.current}.json`,{
      method : "PUT",
      body : JSON.stringify(obj),
      headers :{
        'Content-Type' : 'application/json'
      }
    }).then((res)=>{
      console.log(res)
      fetchExpenseHandler()
      setEditExpense(false)
    setExpenseCategory('')
    setExpenseDescription('')
    setExpenseMoney('')
    idRef.current = ''
    alert('update Item Succussfully')
    })
    
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
            <input value={expenseMoney} type="number" id="money"  onChange={(e) => { setExpenseMoney(e.target.value)}} />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">description</label>
            <input value={expenseDescription} type="text" id="description"  onChange={(e) => { setExpenseDescription(e.target.value)}} />
            <label htmlFor="category">Choose a : category</label>

            <select  name="category" id="category" onChange={(e) => { setExpenseCategory(e.target.value)}}>
              <option value="food">food</option>
              <option value="petrol">petrol</option>
              <option value="moive">moive</option>
              <option value="rent">rent</option>
              <option value="salary">salary</option>
              <option value="travel">travel</option>
            </select>
          </div>

          {!editExpense && <button type="submit"> add Expense</button>}
        </form>
          {editExpense && <button type="button" onClick={expenseUpadateHandler}> Edit  And upadate</button>}
      </section>

      <section>
        {expenseList.map((expense)=><ExpenseItem onEditExpense={editExpenseFun} onDeleteExpense={deleteExpenseFun} key={expense.id} exp={expense} />)}
      </section>
    </>
  );
};

export default WelComePage;
