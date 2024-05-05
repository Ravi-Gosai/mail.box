import React from 'react'
import './ExpenseItem.css'
const ExpenseItem = (props) => {
  return (
    <>
    <div className='maindivwithbtn'>
      <li>
        <div className='expense'>
            expense money :{props.exp.expensemoney} rs
        </div>
        <div className='expense'>
            
            description : {props.exp.expensedescription}
            </div>
            <div className='expense'>
            
            category : {props.exp.expensecategory}
        </div>
       
      
      </li>
      <div className='divbtn'>
          <button onClick={()=>props.onEditExpense(props.exp)}> edit </button>
          <button onClick={()=>props.onDeleteExpense(props.exp.id)} > delete </button>
        </div>
      </div>
    </>
  )
}

export default ExpenseItem
