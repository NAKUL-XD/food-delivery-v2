import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
 
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      console.log("✅ API response:", response.data); // Debug log

      // Ensure you're accessing the correct key
      if (response.data.success && Array.isArray(response.data.data)) {
        setList(response.data.data);
      } else {
        toast.error("No data found in list!");
      }
    } catch (error) {
      console.error("❌ Error fetching list:", error);
      toast.error("Server error while fetching list");
    }
  };

const removeFood = async (foodId) => {
  try {
    const response = await axios.post(`${url}/api/food/remove`, { foodId }); // key should be foodId
    if (response.data.success) {
      toast.success("Item removed!");
      fetchList(); // Refresh the list
    } else {
      toast.error("Failed to remove item");
    }
  } catch (error) {
    toast.error("Error removing item");
    console.log(error);
  }
};


  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>ALL FOODS LIST</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.length > 0 ? (
          list.map((item, index) => (
            <div className="list-table-format" key={index}>
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p
                className='cursor'
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => removeFood(item._id)}
              >
                X
              </p>

            </div>
          ))
        ) : (
          <p onClick={() => removeFood(item._id)} style={{ marginTop: '20px' }}>No items found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
