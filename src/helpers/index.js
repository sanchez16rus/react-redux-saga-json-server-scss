/*Functions to help*/
const changeItemInArray = (mass, changeItem) => { 
    return mass.map( (item) => {
      if(item.id !== changeItem.id) {
        return item;
      }
    
      return changeItem;    
    });
  }
  
  export default {
    changeItemInArray
  }