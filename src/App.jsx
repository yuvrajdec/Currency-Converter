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
    className='relative z-10 bg-white/ backdrop-blur-md sm:p-6 md:p-8 rounded-xl shadow-lg w-11/12 sm:w-96 md:w-1/2 lg:w-1/3 flex flex-col items-center gap-4 sm:gap-6 '
    >

      <Input 
      className="w-full sm:w-72 md:w-80"
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
      
      <div className='flex justify-center gap-10'>
        <button
      type='button'
      className='h-16 w-24 bg-orange-500 rounded text-xl text-white font-extrabold flex items-center justify-center transform active:scale-90 transition'
      onClick={swap}
      ><HiSwitchHorizontal size={50}/></button>

      <button
      type='button'
      className='h-16 w-24 bg-orange-500 rounded text-xl text-white font-extrabold flex items-center justify-center transform active:scale-90 transition'
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

      <button className='bg-orange-500 h-15 w-120 text-pink text-white text-xl font-bold rounded'>
        Convert {from.toUpperCase()} to {to.toUpperCase()}
      </button>

    </form>

    </div>
    </>
  )
}

export default App
