import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText,setSearch]=useState("")
  const [itemName, setItemName] =useState("")
  const [itemCategory, setItemCategory]=useState("Produce")
  const [allItems, setAllItems]=useState(items)

  function handleName(e){
    setItemName(e.target.value)
  }
  function handleCategory(e){
    setItemCategory(e.target.value)
  }
  
  function onItemFormSubmit (e){
  e.preventDefault();
  const newItem={
    id:uuid(),
    name:itemName,
    category:itemCategory
  }
  const newArrayofItems=[...items, newItem]
  setAllItems(newArrayofItems)
  console.log(newItem)
  console.log(allItems)

}
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function filters() {
    const itemsToDisplay = allItems.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });
    const searchFiltered= itemsToDisplay.filter((item)=>item.name.toLowerCase().includes(searchText.toLowerCase()))
  
  return searchFiltered.map((item) => (
    <Item key={item.id} name={item.name} category={item.category} />
  ))
}

  
  const handleSearch=(e)=>{
    setSearch(e.target.value)
  }

  return (
    <div className="ShoppingList">
      <ItemForm 
      onItemFormSubmit={onItemFormSubmit}
      handleName={handleName}
      handleCategory={handleCategory}/>
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearch}/>
      <ul className="Items">
        {filters()}
        
      </ul>
    </div>
  );
}

export default ShoppingList;
