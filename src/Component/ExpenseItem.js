import React from 'react'
import './ExpenseItem.css'
import { useSelector } from 'react-redux'
const ExpenseItem = (props) => {
  const darkModeValue = useSelector(state=>state.darkmode.darkModeIs)

  return (
    <>
    <div className={`maindivwithbtn ${darkModeValue ? 'darkmode' : ''}`}>
      <li className={`${darkModeValue ? 'darkmode' : ''}`}>
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
