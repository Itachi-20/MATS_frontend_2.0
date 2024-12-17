export const FormatDate = (dateString: string) => {
    if(dateString){
      const [year, month, day] = dateString.split('-').map(Number);
    
      // Create a new Date object (Note: months are 0-indexed in JavaScript)
      const date = new Date(year, month - 1, day);
    
      // Manually format the date to 'dd-MM-yyyy'
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    
      return formattedDate;
    }
  };