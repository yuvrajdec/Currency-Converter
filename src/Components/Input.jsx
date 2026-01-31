import React, { useId } from 'react'

const Input = ({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className=""

}) => {
  const amountInputId = useId()
  return (
    <div
     className={`bg-white text-black rounded grid grid-cols-2 grid-rows-2 p-6 gap-4 ${className}`}>
      <label htmlFor={amountInputId}
      className='self-start justify-self-start text-base'>
        {label}
        </label>

       <p 
       className='self-start justify-self-end text-base'
       >Currency Type
       </p>

        <input 
        id={amountInputId}
        className='focus:outline-none text-xs w-32'
        type="number"
        placeholder='enter your amount'
        disabled = {amountDisable}
        value = {amount}
        onChange={(e)=>{
          const val = e.target.value;
          onAmountChange && onAmountChange(val === "" ? "" : Number(e.target.value))}}

        />

        <select
         name="currency"
          
          className='w-24 self-end justify-self-end focus:outline-none cursor-pointer'
          value={selectCurrency}
          onChange={(e)=>onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled = {currencyDisable}
          >

          {currencyOptions.map((cur)=>(
            <option
            key={cur}
            value={cur}
            >{cur}
            </option>
          ))}
          
        </select>

    </div>
  )
}

export default Input