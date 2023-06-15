  import React, { createContext, useState } from 'react';
interface SearchState {
    dealtype: number;
    make: number[];
    category: number[];
    Minprice: number;
    MaxPrice: number;
  }
const initialSearchState: SearchState = {
  dealtype: 0,
  make: [],
  category: [],
  Minprice: 0,
  MaxPrice: 0,
};

const [state ,setstate] = useState<SearchState>(initialSearchState)

export const SearchContext = createContext<SearchState>(state);


interface provider{
    Children: any
}
const ContextProvaider: React.FC<provider> = ({Children}) => {
    
  return (
    <SearchContext.Provider value={{state, setstate}}>
      {Children}
    </SearchContext.Provider>
  );
};

export default ContextProvaider;
