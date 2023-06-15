interface SearchState {
    dealtype: number;
    make: number[];
    category: number[];
    Minprice: number;
    MaxPrice: number;
  }
  
  import React, { createContext } from 'react';

const initialSearchState: SearchState = {
  dealtype: 0,
  make: [],
  category: [],
  Minprice: 0,
  MaxPrice: 0,
};

export const SearchContext = createContext<SearchState>(initialSearchState);
