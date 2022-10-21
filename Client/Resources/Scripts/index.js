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

    // const employee = await fetch(GetUrl).then((response) => response.json());
    // const filter = employee.filter((e) => e.emp_ID == empId);
    // let emp = filter[0];

    let loginUser = {
        "Emp_ID" : 1,
        "EmailAddress" : 'null',
        "IsManager" : true,
        "IsActive" : true,
        "FirstName" : 'null',
        "LastName" : 'null',
        "PasswordHash" : password
    }
    console.log(loginUser)
    fetch(GetUrl, {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify(loginUser)
    
            }).then((response) => {
                if(response){
                    console.log('Correct Password')
                }
                else{
                    console.log('Incorrect Password')
                }
      
            })
    
    // const employee = await fetch(GetUrl).then((response) => response.json());
    // console.log(employee);
    // console.log(empId);

    // const filter = employee.filter((e) => e.emp_ID == empId);
    // let emp = filter[0];
    // console.log(emp);

    // fetch(GetUrl,{
    //     method: 'POST',
    //     headers: {
    //         "Accept": 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(emp,password)

    //     }).then((response) => {
    //         if(response){
    //             console.log('Correct Password')
    //         }
    //         else{
    //             console.log('Incorrect Password')
    //         }
  
    //     })
    
    // if (emp && emp.emp_ID)
    // {
    //     console.log(emp);
    //     console.log(password)
    //     if (emp.passwordHash == password){
    //         console.log(emp);
    //     }
    // };
}


