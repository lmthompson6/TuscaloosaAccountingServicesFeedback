function handleOnLoad(){
    const ApiUrl = "https://localhost:7003/API/Employee"
    fetch(ApiUrl).then(function(response){
        console.log(response)
        return response.json();
    })
}
function handleNewLoad(){
    handleActiveTaskTable();
    handleCompletedTaskTable();
}

async function handleLoginClick(){
    const GetUrl = "https://localhost:7003/API/Employee"
    const empId = document.getElementById("employeeId").value;
    const password = document.getElementById("typePasswordX-2").value;


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
                    window.localStorage.setItem('empId', empId)

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

async function handleActiveTaskTable(empId = window.localStorage.getItem('empId')){
    const AssignURL = "https://localhost:7003/API/Assignment"
    var html = ""
    await fetch(AssignURL+"/"+empId).then(async function (response) {
        const data = await response.json();    
        const sortedData = data.sort((a,b)=> b.dueDate - a.dueDate)
        sortedData.forEach(function(object){
        html+="<tr>"
        html+="<td>"
        html+="<div class='d-flex align-items-center'>"
        html+="<p class='fw-bold mb-1'>"+object.assignTitle+"</p>"
        html+="</div></td>"
        html+="<td><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.dueDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.statusDate+"</p>"
    })
    })

    document.getElementById("Active Tasks Table").innerHTML = html


}

async function handleCompletedTaskTable(empId = window.localStorage.getItem('empId')){
    const AssignURL = "https://localhost:7003/API/CompletedAssignment"
    var html = ""
    await fetch(AssignURL+"/"+empId).then(async function (response) {
        const data = await response.json();    
        const sortedData = data.sort((a,b)=> b.dueDate - a.dueDate)
        sortedData.forEach(function(object){
        html+="<tr>"
        html+="<td>"
        html+="<div class='d-flex align-items-center'>"
        html+="<p class='fw-bold mb-1'>"+object.assignTitle+"</p>"
        html+="</div></td>"
        html+="<td><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.dueDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.statusDate+"</p>"
    })
    })

    document.getElementById("Completed Tasks Table").innerHTML = html


}


