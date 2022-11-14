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
function handleNewManagerLoad(){
    handleManagerActiveTaskTable()
    handleAssignedTaskTable();
    handleManagerCompletedTaskTable();
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
                    window.localStorage.setItem('empId', empId)
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
        if(object.assignStatus == "Completed ☑"){
            html+="<td style='background-color:green;color:white'><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"            
        }
        else if(object.assignStatus == "Overdue !!"){
            html+="<td style='background-color:red;color:white'><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"            
        }
        else if(object.assignStatus == "Awaiting Manager Approval ..." || object.assignStatus == "In Progress ..."){
            html+="<td style='background-color:yellow;color:black'><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"            

        }
        else{
            html+="<td><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"
        }
        html+="<td><p class='fw-bold mb-1'>"+object.dueDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.statusDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.assignedBy+"</p>"
        html+= "<td><button class='btn btn-link' id="+object.assign_ID+" data-bs-toggle='modal' data-bs-target='#AssignmentModal' onclick='handleActiveAssignmentModal()'>View</button></td>"
    })
    })

    document.getElementById("Active Tasks Table").innerHTML = html


}
async function handleManagerActiveTaskTable(empId = window.localStorage.getItem('empId')){
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
        if(object.assignStatus == "Completed ☑"){
            html+="<td style='background-color:green;color:white'><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"            
        }
        else if(object.assignStatus == "Overdue !!"){
            html+="<td style='background-color:red;color:white'><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"            
        }
        else if(object.assignStatus == "Awaiting Manager Approval ..." || object.assignStatus == "In Progress ..."){
            html+="<td style='background-color:yellow;color:black'><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"            

        }
        else{
            html+="<td><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"
        }
        html+="<td><p class='fw-bold mb-1'>"+object.dueDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.statusDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.assignedTo+"</p>"
        html+= "<td><button class='btn btn-link' id="+object.assign_ID+" data-bs-toggle='modal' data-bs-target='#AssignmentModal' onclick='handleActiveAssignmentModal()'>View</button></td>"
    })
    })

    document.getElementById("Active Tasks Table").innerHTML = html


}

async function handleAssignedTaskTable(empId = window.localStorage.getItem('empId')){
    const AssignURL = "https://localhost:7003/API/ManagerAssignment"
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
        if(object.assignStatus == "Completed ☑"){
            html+="<td style='background-color:green;color:white'><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"            
        }
        else if(object.assignStatus == "Overdue !!"){
            html+="<td style='background-color:red;color:white'><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"            
        }
        else if(object.assignStatus == "Awaiting Manager Approval ..." || object.assignStatus == "In Progress ..."){
            html+="<td style='background-color:yellow;color:black'><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"            

        }
        else{
            html+="<td><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"
        }
        html+="<td><p class='fw-bold mb-1'>"+object.dueDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.statusDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.assignedTo+"</p>"
        html+= "<td><button class='btn btn-link' id="+object.assign_ID+" data-bs-toggle='modal' data-bs-target='#AssignmentModal' onclick='handleActiveAssignmentModal()'>View</button></td>"
    })
    })

    document.getElementById("Assigned Tasks Table").innerHTML = html


}
//data-bs-toggle="modal"
//data-bs-target="#RatingModal" role="tab" onclick="handleTableLoad()"
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
        if(object.assignStatus == "Completed ☑"){
            html+="<td style='background-color:green;color:white'><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"            
        }
        else if(object.assignStatus == "Overdue !!"){
            html+="<td style='background-color:red;color:white'><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"            
        }
        else if(object.assignStatus == "Awaiting Manager Approval ..." || object.assignStatus == "In Progress ..."){
            html+="<td style='background-color:yellow;color:black'><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"            

        }
        else{
            html+="<td><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"
        }
        html+="<td><p class='fw-bold mb-1'>"+object.dueDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.statusDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.assignedBy+"</p>"
        html+= "<td><button class='btn btn-link' id="+object.assign_ID+" data-bs-toggle='modal' data-bs-target='#AssignmentModal' onclick='handleCompletedAssignmentModal()'>View</button></td>"
    })
    })

    document.getElementById("Completed Tasks Table").innerHTML = html


}
async function handleManagerCompletedTaskTable(empId = window.localStorage.getItem('empId')){
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

        if(object.assignStatus == "Completed ☑"){
            html+="<td style='background-color:green;color:white'><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"            
        }
        else if(object.assignStatus == "Overdue !!"){
            html+="<td style='background-color:red;color:white'><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"            
        }
        else if(object.assignStatus == "Awaiting Manager Approval ..." || object.assignStatus == "In Progress ..."){
            html+="<td style='background-color:yellow;color:black'><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"            

        }
        else{
            html+="<td><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"
        }
        html+="<td><p class='fw-bold mb-1'>"+object.dueDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.statusDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.assignedTo+"</p>"
        html+= "<td><button class='btn btn-link' id="+object.assign_ID+" data-bs-toggle='modal' data-bs-target='#AssignmentModal' onclick='handleCompletedAssignmentModal()'>View</button></td>"
    })
    })

    document.getElementById("Completed Tasks Table").innerHTML = html
    document.getElementById("Completed Tasks Table 2").innerHTML = html


}

function loadManagerTab(){
    var x = document.getElementById("managertab");
    x.style.display = "block";
    var y = document.getElementById("employeetab")
    y.style.display = "none";
    var z = document.getElementById("tabBar2")
    z.style.backgroundColor = "grey"
    var a = document.getElementById("tabBar1")
    a.style.backgroundColor = "crimson"
    handleNewManagerLoad()
}

function loadEmployeeTab(){
    var x = document.getElementById("employeetab");
    x.style.display = "block";
    var y = document.getElementById("managertab")
    y.style.display = "none";
    var z = document.getElementById("tabBar1")
    z.style.backgroundColor = "grey"
    var a = document.getElementById("tabBar2")
    a.style.backgroundColor = "crimson"
    handleNewManagerLoad()
}

async function handleActiveAssignmentModal(empId = window.localStorage.getItem('empId')){
    const QuestionURL = "https://localhost:7003/API/Question"
    var html = ""
    var count = 1
    await fetch(QuestionURL+"/"+2).then(async function (response) {
        const data = await response.json();    
        data.forEach(function(object){
        html+="<div class='mb-3 row'><label class='col-form-label'>"+count+". "+object.questText+"</label>"
        count+=1
    })
    })

    document.getElementById("AssignmentActiveModalBody").innerHTML = html

}
async function handleCompletedAssignmentModal(empId = window.localStorage.getItem('empId')){
    const QuestionURL = "https://localhost:7003/API/Question"
    var html = ""
    var count = 1
    await fetch(QuestionURL+"/"+1).then(async function (response) {
        const data = await response.json();    
        data.forEach(function(object){
        html+="<div class='mb-3 row'><label class='col-form-label'>"+count+". "+object.questText+"</label>"
        count+=1
    })
    })

    document.getElementById("AssignmentActiveModalBody").innerHTML = html


}

async function handleNewSelfAssignmentList(){
    const ApiUrl = "https://localhost:7003/API/Employee"
    var html = ""
    fetch(ApiUrl).then(async function(response){
        const data = await response.json();    
        data.forEach(function(object){

            if(object.isManager == false && object.isActive == true){
                html+="<tr>"
                html+="<td>"
                html+="<div class='d-flex align-items-center'>"
                html+="<p class='fw-bold mb-1'>"+object.emp_ID+"</p>"
                html+="</div></td>"
                html+="<td><p class='fw-bold mb-1'>"+object.firstName+"</p>"
                html+="<td><p class='fw-bold mb-1'>"+object.lastName+"</p>"
            }
    })
        document.getElementById("NewSelfModalBody").innerHTML = html
    })

}
async function handleNewPeerAssignmentList(){
    const ApiUrl = "https://localhost:7003/API/Employee"
    var html = ""
    fetch(ApiUrl).then(async function(response){
        const data = await response.json();    
        data.forEach(function(object){

            if(object.isManager == false && object.isActive == true){
                html+="<tr>"
                html+="<td>"
                html+="<div class='d-flex align-items-center'>"
                html+="<p class='fw-bold mb-1'>"+object.emp_ID+"</p>"
                html+="</div></td>"
                html+="<td><p class='fw-bold mb-1'>"+object.firstName+"</p>"
                html+="<td><p class='fw-bold mb-1'>"+object.lastName+"</p>"
            }
    })
        document.getElementById("NewPeerModalBody").innerHTML = html
    })

}

async function handleNewManagerAssignmentList(){
    const ApiUrl = "https://localhost:7003/API/Employee"
    var html = ""
    fetch(ApiUrl).then(async function(response){
        const data = await response.json();    
        data.forEach(function(object){

            if(object.isManager == false && object.isActive == true){
                html+="<tr>"
                html+="<td>"
                html+="<div class='d-flex align-items-center'>"
                html+="<p class='fw-bold mb-1'>"+object.emp_ID+"</p>"
                html+="</div></td>"
                html+="<td><p class='fw-bold mb-1'>"+object.firstName+"</p>"
                html+="<td><p class='fw-bold mb-1'>"+object.lastName+"</p>"
            }
    })
        document.getElementById("NewManagerModalBody").innerHTML = html
    })

}

function createSelf(){
    const AssignURL = "https://localhost:7003/API/Assignment"
    const sendTo = document.getElementById('inputSelfID').value
    const sendfrom = window.localStorage.getItem('empId').value
    var DueTime = new Date();
    DueTime.setDate(DueTime.getDate()+14);
    var statusTime = new Date();
    statusTime.setDate(statusTime.getDate())
    fetch(AssignURL, {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            "Content-Type" : 'application/json'
        },
        body: JSON.stringify({
            Assign_ID : null,
            IsComplete : 0,
            IsManagerApproved : 0,
            AssignStatus : 'Not Started :(',
            DueDate : DueTime.toString(),
            StatusDate : statusTime.toString(),
            AssignTitle : 'Self Review',
            AssignedBy : sendfrom,
            AssignedTo : sendTo
        })

    })
}
function createPeer(){

}
function createManagerReview(){

}


// public int Assign_ID {get; set;}
// public bool IsComplete {get; set;}
// public bool IsManagerApproved {get; set;}
// public string AssignStatus {get; set;}
// public string DueDate {get; set;}
// public string StatusDate {get; set;}
// public string AssignTitle {get; set;}
// public string AssignedBy {get; set;}
// public string AssignedTo {get; set;}