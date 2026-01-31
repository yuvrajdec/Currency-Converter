import { useState } from 'react'
import Input from './Components/Input'
import useCurrencyInfo from './Hooks/useCurrencyInfo'
import {HiSwitchHorizontal} from 'react-icons/hi'
import { GrPowerReset } from "react-icons/gr"
import FallingCash from "./assets/FallingCash.mp4";



function App() {

  const [amount, setAmount] = useState("");
  const [from,setFrom] = useState("usd");
  const [to,setTo] = useState("inr");
  const [convertedAmount,setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  // swapping two varibales to > from , from > to
  const swap = ()=>{

    const tempCurrency = from;
    setFrom(to);
    setTo(tempCurrency);

    const tempAmount = amount;
    setAmount(convertedAmount);
    setConvertedAmount(tempAmount);

  }

  const reset = () => {
    setAmount("");
    setConvertedAmount("");
    setFrom("usd");
    setTo("inr");
  }

  const convert = ()=>{

    if(!currencyInfo || !currencyInfo[to]) return;

    const rate = currencyInfo[to];
    setConvertedAmount(amount * rate);

  }

  return (
    <>
    <div className='relative h-screen overflow-hidden flex justify-center items-center gap-4'>
    <video 
    autoPlay
    loop
    muted
    className='absolute top-0 left-0 w-full h-full object-cover'
    >
      <source src = {FallingCash}
      type='video/mp4'/>
    </video>

    <div className='absolute top-0 left-0 w-full h-full bg-black opacity-75'></div>

    <form 
    onSubmit={(e)=>{
      e.preventDefault();
      convert();
    }}
    className='relative z-10 bg-white/ backdrop-blur-md shadow-lg  flex flex-col items-center gap-4 p-8'
    >

      <Input 
      label="From"
      amount={amount}
      currencyOptions={options}
      onCurrencyChange={(currency)=>
         setFrom(currency)
      }
      onAmountChange={(amount)=>{
        setAmount(amount)
      }}
      selectCurrency={from}
      />
      
      <div className='flex justify-center gap-4'>
        <button
      type='button'
      className='h-16 w-38 bg-orange-500 hover:bg-orange-600 rounded-full text-xl text-white font-extrabold flex items-center justify-center transition-transform duration-150 ease-out hover:-translate-y-1 active:translate-y-0 cursor-pointer'
      onClick={swap}
      ><HiSwitchHorizontal size={50}/></button>

      <button
      type='button'
      className='h-16 w-38 bg-orange-500 hover:bg-orange-600 rounded-full text-xl text-white font-extrabold flex items-center justify-center transition-transform duration-150 ease-out hover:-translate-y-1 active:translate-y-0 cursor-pointer'
      onClick={reset}
      ><GrPowerReset size={40}/></button>
      </div>
      

      <Input 
      label="To"
      amount={convertedAmount}
      currencyOptions={options}
      onCurrencyChange={(currency)=>{
        setTo(currency)
      }}
      selectCurrency={to}
      amountDisable
      />

      <div className="relative inline-block w-full">
        {/* Background plate */}
        <div className="absolute inset-0 rounded-md z-0"></div>

          <button
            className="relative z-10 w-full h-14        bg-orange-500 text-white font-bold text-xl
               rounded-full transition-transform duration-150 ease-out
               hover:-translate-y-1 active:translate-y-0 hover:bg-orange-600 cursor-pointer"
          >
          Convert {from.toUpperCase()} to {to.toUpperCase()}
        </button>
      </div>


    </form>

    </div>
    </>
  )
}

export default App
