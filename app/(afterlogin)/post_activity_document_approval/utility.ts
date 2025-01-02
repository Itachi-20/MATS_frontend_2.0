export default function EventDataApi = async()=>{
    console.log("inside event Data")
    try {
      const response = await fetch(
        "/api/previewData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials:'include',
          body:JSON.stringify({
            name:param.get("refno")
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        setEventData(data.data);
        
        
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
};