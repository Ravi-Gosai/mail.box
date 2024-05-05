import React from 'react'
import './ExpenseItem.css'
const ExpenseItem = (props) => {
  return (
    <>
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
    </>
  )
}

export default ExpenseItem
