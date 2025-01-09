// 'use client'
// import { createContext, useContext, useState, ReactNode } from 'react';

// interface LoaderContextType {
//   loading: boolean;
//   setLoaderLoading: (loading: boolean) => void;
// }

// const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

// export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [loading, setLoaderLoading] = useState(false);

//   return (
//     <LoaderContext.Provider value={{ loading, setLoaderLoading }}>
//       {children}
//     </LoaderContext.Provider>
//   );
// };

// export const useLoader = (): LoaderContextType => {
//   const context = useContext(LoaderContext);
//   if (!context) {
//     throw new Error('useLoader must be used within a LoaderProvider');
//   }
//   return context;
// };
