import { useEffect,useState } from "react";
// this hook returns the value of currency as "data'
function useCurrencyInfo(currency){
    const [data,SetData] = useState({});
    useEffect(()=>{
        const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        fetch(url)
        .then((res)=> res.json())
        .then((res)=> SetData(res[currency]))
        console.log("Updated currency data : ", data);
        
    }, [currency]);
    console.log(data);
    return data
}

export default useCurrencyInfo;
