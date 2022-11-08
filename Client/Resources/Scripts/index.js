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
        html+="<td><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.dueDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.statusDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.assignedBy+"</p>"
        html+= "<td><button class='editbtn' id="+object.assign_ID+" data-bs-toggle='modal' data-bs-target='#AssignmentModal' onclick='handleActiveAssignmentModal()'>View</button></td>"
    })
    })

    document.getElementById("Active Tasks Table").innerHTML = html


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
        html+="<td><p class='fw-bold mb-1'>"+object.assignStatus+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.dueDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.statusDate+"</p>"
        html+="<td><p class='fw-bold mb-1'>"+object.assignedBy+"</p>"
        html+= "<td><button class='editbtn' id="+object.assign_ID+" data-bs-toggle='modal' data-bs-target='#AssignmentModal' onclick='handleCompletedAssignmentModal()'>View</button></td>"
    })
    })

    document.getElementById("Completed Tasks Table").innerHTML = html


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
    handleNewLoad()
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
            //   <!-- <div class="mb-3 row">
            //   <label for="staticEmail" class="col-form-label">Please enter the Driver's ID #</label>
            //   </div>
            //   <div class="mb-3 row">
            //     <label for="inputPassword" class="col-sm-2 col-form-label">ID #:</label>
            //     <div class="col-sm-10">
            //       <input type="text" class="form-control" id="inputDriverID">
            //     </div>
            //   </div> -->
