function handleOnLoad(){
    const ApiUrl = "https://localhost:7003/API/Employee"
    fetch(ApiUrl).then(function(response){
        console.log(response)
        return response.json();
    })
}

async function handleLoginClick(){
    const GetUrl = "https://localhost:7003/API/Employee"
    const empId = document.getElementById("employeeId").value;
    const password = document.getElementById("typePasswordX-2").value;

    //try{
    const employee = await fetch(GetUrl).then((response) => response.json());
    const filter = employee.filter((e) => e.emp_ID == empId);
    let emp = filter[0];
    try{
    emp.PasswordHash = password    
    fetch(GetUrl, {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(emp)
    
            }).then((response) => response.json()).then((json) =>{
                console.log(json)
                if(json && emp.isManager && emp.isActive){
                    window.location.assign("manager.html")
                }
                else if(json && emp.isActive){
                    window.location.assign("employee.html")
                }
                else{
                    window.alert("Employee ID and Password combination do not match an active Employee on record.")  
                }
            })
    }
    catch{
        alert("Employee ID not found. Please try again")
    }

            
    

}


