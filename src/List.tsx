import React, { useEffect, useState } from 'react';

const List: React.FC = () => {
    const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api2.myauto.ge/ka/products/');
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setProducts]);
  return (
    <div>
    </div>
  )
}

export default List