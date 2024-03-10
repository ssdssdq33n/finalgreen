import { useState,useEffect } from "react";
function useDebounce(value:any,delay:number){
    const [debouncedValue,setDebouncedValue]=useState<any>(value)
    useEffect(()=>{
        const handler=setTimeout(()=>setDebouncedValue(value),delay)
        return ()=>clearTimeout(handler)
    },[value])
    return debouncedValue
}
export default useDebounce