"use client"
import { createContext,useState,useContext, useEffect} from "react";

type AppContextType = {
    module: string;
    setModule: (module: string) => void;
    user:string,
    setUser:(user:string)=>void
  }

export const  AppContext = createContext<AppContextType|undefined>(undefined);

export function AppWrapper({children}:{
    children: React.ReactNode;
}){
    
    const [module,setModule] = useState("before");
    const [user,setUser] = useState("");

    useEffect(()=>{
      setUser(prev =>prev);
    },[user])

    return(
        <AppContext.Provider value={{module,setModule,user,setUser}}>
            {children}
        </AppContext.Provider>
    )
}


export const useAppContext = () => {
    const context = useContext(AppContext);
    
    if (!context) {
      throw new Error("useAppContext must be used within an AppWrapper");
    }
  
    return context;
  };