import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import AuthContext from "../auth-context";
import classes from "./WelcomePage.module.css";
import ExpenseItem from "./ExpenseItem";
import { useCallback } from "react";
import { authAction } from "../store/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CSVDownload, CSVLink } from "react-csv";

const WelComePage = () => {
  const navigate = useNavigate();
  // const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const totalExpense = useSelector((state) => state.auth.totalExpense);

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
  const idRef = useRef("");
  const downExpense = useSelector(state=>state.auth.downLoadExpense)
  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCpDrn_T5nS2xI1qSHkdkYoigcnx1topC4",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authToken,
        }),
        headers: {
          "Content-Type": "applicaton/json",
        },
      }
    )
      .then((res) => {
        // console.log(res);
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        // console.log(data.users[0])
        setUserDetails(data.users[0]);
      });
  }, [authToken]);

  const emailVerifyHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCpDrn_T5nS2xI1qSHkdkYoigcnx1topC4",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authToken,
        }),
        headers: {
          "Content-Type": "applicaton/json",
        },
      }
    ).then((res) => {
      // console.log(res, "vvvvv");
    });
  };

  const logoutHandler = () => {
    // authCtx.logout();
    dispatch(authAction.logout());
    navigate("/");
  };

  
  const fetchExpenseHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://mail-box-d0c08-default-rtdb.firebaseio.com/mail.json"
      );
      // console.log(response);
      if (!response.ok) {
        throw new Error("something went wrong ..retrying");
      }
      const dataJson = await response.json();
      console.log(dataJson);
      const loadedexpense = [];

      let totalExpense = 0; 
      let downloadExpenseArray = [['money','descriprion','categroy']]
      for (let key in dataJson) {
        totalExpense += +dataJson[key].expensemoney;
        loadedexpense.push({
          id: key,
          expensemoney: dataJson[key].expensemoney,
          expensecategory: dataJson[key].expensecategory,
          expensedescription: dataJson[key].expensedescription,
        });

        downloadExpenseArray.push([dataJson[key].expensemoney,dataJson[key].expensedescription,dataJson[key].expensecategory])

      }
      dispatch(authAction.downLoadExpense(downloadExpenseArray))
      dispatch(authAction.expenseCounter(totalExpense));

      setExpenseList(loadedexpense);
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);

  const expenseFormHandler = async (e) => {
    // console.log(expense)
    e.preventDefault();
    if (expenseCategory === "") {
      setExpenseCategory("food");
    }
    let obj = {
      expensemoney: expenseMoney,
      expensecategory: expenseCategory,
      expensedescription: expenseDescription,
      // id : Math.random()
    };
    await fetch(
      "https://mail-box-d0c08-default-rtdb.firebaseio.com/mail.json",
      {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // const data = await response.json();
    // console.log(data)
    fetchExpenseHandler();
  };

  useEffect(() => {
    fetchExpenseHandler();
  }, [fetchExpenseHandler]);

  const deleteExpenseFun = async (id) => {
    // console.log(id)
    await fetch(
      `https://mail-box-d0c08-default-rtdb.firebaseio.com/mail/${id}.json`,
      {
        method: "DELETE",
      }
    );
    fetchExpenseHandler();
  };

  const editExpenseFun = (exp) => {
    // console.log(exp)
    setEditExpense(true);
    setExpenseCategory(exp.expensecategory);
    setExpenseDescription(exp.expensedescription);
    setExpenseMoney(exp.expensemoney);
    idRef.current = exp.id;
  };

  const expenseUpadateHandler = () => {
    let obj = {
      expensemoney: expenseMoney,
      expensecategory: expenseCategory,
      expensedescription: expenseDescription,
      // id : Math.random()
    };
    fetch(
      `https://mail-box-d0c08-default-rtdb.firebaseio.com/mail/${idRef.current}.json`,
      {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      // console.log(res)
      fetchExpenseHandler();
      setEditExpense(false);
      setExpenseCategory("");
      setExpenseDescription("");
      setExpenseMoney("");
      idRef.current = "";
      alert("update Item Succussfully");
    });
  };

  
  
  return (
    <>
      <header className={classes.header}>
        <h1>welcome to mail box </h1>
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
        <div>
          total Expense : {totalExpense}
          {totalExpense > 10000 && <button>Premium Button</button>}
        </div>
      </header>

      {/* <section className={classes.auth}>
        <h1> expense from</h1>
        <form onSubmit={expenseFormHandler}>
          <div className={classes.control}>
            <label htmlFor="money">money</label>
            <input
              value={expenseMoney}
              type="number"
              id="money"
              onChange={(e) => {
                setExpenseMoney(e.target.value);
              }}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">description</label>
            <input
              value={expenseDescription}
              type="text"
              id="description"
              onChange={(e) => {
                setExpenseDescription(e.target.value);
              }}
            />
            <label htmlFor="category">Choose a : category</label>

            <select
              name="category"
              id="category"
              onChange={(e) => {
                setExpenseCategory(e.target.value);
              }}
            >
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
        {editExpense && (
          <button type="button" onClick={expenseUpadateHandler}>
            {" "}
            Edit And upadate
          </button>
        )}
      </section>
        
        <CSVLink data={downExpense}>download expense</CSVLink>
        
      <section>
        {expenseList.map((expense) => (
          <ExpenseItem
            onEditExpense={editExpenseFun}
            onDeleteExpense={deleteExpenseFun}
            key={expense.id}
            exp={expense}
          />
        ))}
      </section> */}
    </>
  );
};

export default WelComePage;
