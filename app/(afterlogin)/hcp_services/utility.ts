export const dropdown = async ()=>{
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_field_data`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.data
        } else {
            console.log('error in dropdown api');
        }
    } catch (error) {
        console.error("Error form server:- ", error);
    }
}

export const activityList = async ()=>{
    try {
        const response = await fetch(`${process.env.FRAPPE_URL}/api/method/matsapp.api.event.event.get_document_and_activity_type`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials:'include'
        });
  
        if (response.ok) {
          const data = await response.json();
          return data.data;
        } else {
            console.log('Login failed');
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
}


export const handleBudgetChange = async (value: string) => {
    try {
      const response = await fetch(
        "/api/training_and_education/subtypeDropdown",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            budget: value,
          }),
        }
      );

      
      if (response.ok) {
          const data = await response.json();
          //setSubtypeActivity(data.data);
          if (value == "National") {
            //setSubtypeActivityVisible(true);
            const Response = {
                subtypeActivity:data.data,
                SubtypeActivityVisible:true
              } 
              return Response;
          } else {
            //setSubtypeActivityVisible(false);
            const Response = {
                subtypeActivity:data.data,
                SubtypeActivityVisible:false
              } 
              return Response;
          }
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

//   const handleBusinessUnitChange = async (value: string) => {
//     try {
//       const response = await fetch(
//         "/api/training_and_education/eventCostCenterDropdown",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             division: value,
//           }),
//         }
//       );

//       const data = await response.json();
//       setEventCostCenter(data.data);

//       if (response.ok) {
//       } else {
//         console.log("Login failed");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };
