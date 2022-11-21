
function handleOnLoad() {
    const ApiUrl = "https://localhost:7003/API/Employee"
    fetch(ApiUrl).then(function (response) {
        console.log(response)
        return response.json();
    })
   
    
}
function handleNewLoad() {
    handleActiveTaskTable();
    handleCompletedTaskTable();

}
function handleNewManagerLoad() {
    handleManagerActiveTaskTable()
    handleAssignedTaskTable();
    handleManagerCompletedTaskTable();
    
    $(document).ready( function () {
        $('.make-jquery-table').DataTable();
    } );
}

async function handleLoginClick() {
    const GetUrl = "https://localhost:7003/API/Employee"
    const empId = document.getElementById("employeeId").value;
    const password = document.getElementById("typePasswordX-2").value;


    const employee = await fetch(GetUrl).then((response) => response.json());
    const filter = employee.filter((e) => e.emp_ID == empId);
    let emp = filter[0];
    try {
        emp.PasswordHash = password
        fetch(GetUrl, {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(emp)

        }).then((response) => response.json()).then((json) => {
            console.log(json)
            if (json && emp.isManager && emp.isActive) {
                window.location.assign("manager.html")
                window.localStorage.setItem('empId', empId)
            }
            else if (json && emp.isActive) {
                window.location.assign("employee.html")
                window.localStorage.setItem('empId', empId)

            }
            else {
                window.alert("Employee ID and Password combination do not match an active Employee on record.")
            }
        })
    }
    catch {
        alert("Employee ID not found. Please try again")
    }
}

async function handleActiveTaskTable(empId = window.localStorage.getItem('empId')) {
    const AssignURL = "https://localhost:7003/API/Assignment"
    var html = ""
    await fetch(AssignURL + "/" + empId).then(async function (response) {
        const data = await response.json();
        const sortedData = data.sort((a, b) => b.dueDate - a.dueDate)
        sortedData.forEach(function (object) {
            html += "<tr>"
            html += "<td>"
            html += "<div class='d-flex align-items-center'>"
            html += "<p class='fw-bold mb-1'>" + object.assignTitle + "</p>"
            html += "</div></td>"
            if (object.assignStatus == "Completed ☑") {
                html += "<td style='background-color:green;color:white'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            else if (object.assignStatus == "Overdue !!" || object.assignStatus == "Reopened !!") {
                html += "<td style='background-color:red;color:white'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            else if (object.assignStatus == "Awaiting Manager Approval ..." || object.assignStatus == "In Progress ...") {
                html += "<td style='background-color:yellow;color:black'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"

            }
            else {
                html += "<td><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            html += "<td><p class='fw-bold mb-1'>" + object.dueDate + "</p>"
            html += "<td><p class='fw-bold mb-1'>" + object.statusDate + "</p>"
            html += "<td><p class='fw-bold mb-1'>" + object.assignedBy + "</p>"
            html += "<td><button class='btn btn-link' id=" + object.assign_ID + " data-bs-toggle='modal' data-bs-target='#AssignmentModal' onclick='handleActiveAssignmentModal(this.id, " + object.assess_ID + ")'>View</button></td>"
        })
    })

    document.getElementById("Active Tasks Table").innerHTML = html


}
async function handleManagerActiveTaskTable(empId = window.localStorage.getItem('empId')) {
    const AssignURL = "https://localhost:7003/API/Assignment"
    var html = ""
    await fetch(AssignURL + "/" + empId).then(async function (response) {
        const data = await response.json();
        const sortedData = data.sort((a, b) => b.dueDate - a.dueDate)
        sortedData.forEach(function (object) {
            html += "<tr>"
            html += "<td>"
            html += "<div class='d-flex align-items-center'>"
            html += "<p class='fw-bold mb-1'>" + object.assignTitle + "</p>"
            html += "</div></td>"
            if (object.assignStatus == "Completed ☑") {
                html += "<td style='background-color:green;color:white'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            else if (object.assignStatus == "Overdue !!" || object.assignStatus == "Reopened !!") {
                html += "<td style='background-color:red;color:white'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            else if (object.assignStatus == "Awaiting Manager Approval ..." || object.assignStatus == "In Progress ...") {
                html += "<td style='background-color:yellow;color:black'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"

            }
            else {
                html += "<td><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            html += "<td><p class='fw-bold mb-1'>" + object.dueDate + "</p>"
            html += "<td><p class='fw-bold mb-1'>" + object.statusDate + "</p>"
            html += "<td><p class='fw-bold mb-1'>" + object.assignedTo + "</p>"
            html += "<td><button class='btn btn-link' id=" + object.assign_ID + " data-bs-toggle='modal' data-bs-target='#ManagerActiveAssignmentModal' onclick='handleManagerActiveAssignmentModal(this.id)'>View</button></td>"
        })
    })

    document.getElementById("Active Tasks Table").innerHTML = html
   
    

}

async function handleAssignedTaskTable(empId = window.localStorage.getItem('empId')) {
    const AssignURL = "https://localhost:7003/API/ManagerAssignment"
    var html = ""
    await fetch(AssignURL + "/" + empId).then(async function (response) {
        const data = await response.json();
        const sortedData = data.sort((a, b) => b.dueDate - a.dueDate)
        sortedData.forEach(function (object) {
            html += "<tr>"
            html += "<td>"
            html += "<div class='d-flex align-items-center'>"
            html += "<p class='fw-bold mb-1'>" + object.assignTitle + "</p>"
            html += "</div></td>"
            if (object.assignStatus == "Completed ☑") {
                html += "<td style='background-color:green;color:white'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            else if (object.assignStatus == "Overdue !!" || object.assignStatus == "Reopened !!") {
                html += "<td style='background-color:red;color:white'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            else if (object.assignStatus == "Awaiting Manager Approval ..." || object.assignStatus == "In Progress ...") {
                html += "<td style='background-color:yellow;color:black'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"

            }
            else {
                html += "<td><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            html += "<td><p class='fw-bold mb-1'>" + object.dueDate + "</p>"
            html += "<td><p class='fw-bold mb-1'>" + object.statusDate + "</p>"
            html += "<td><p class='fw-bold mb-1'>" + object.assignedTo + "</p>"
            html += "<td><button class='btn btn-link' id=" + object.assign_ID + " data-bs-toggle='modal' data-bs-target='#AssignmentModal' onclick='handleActiveAssignmentModal(this.id)'>View</button></td>"
        })
    })

    document.getElementById("Assigned Tasks Table").innerHTML = html
   

}

async function filterAssignedTaskTable(empId = window.localStorage.getItem('empId')){
    console.log("made it to filter function")
    const AssignURL = "https://localhost:7003/API/ManagerAssignment"
    var html = ""
    await fetch(AssignURL + "/" + empId).then(async function (response) {
        const data = await response.json();
        const sortedData = data.sort((a, b) => b.dueDate - a.dueDate)
        var empName = document.getElementById('employeeFilter').value.toLowerCase()
        sortedData.forEach(function (object) {
            if(object.assignedTo.toLowerCase().includes(empName)){
            html += "<tr>"
            html += "<td>"
            html += "<div class='d-flex align-items-center'>"
            html += "<p class='fw-bold mb-1'>" + object.assignTitle + "</p>"
            html += "</div></td>"
            if (object.assignStatus == "Completed ☑") {
                html += "<td style='background-color:green;color:white'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            else if (object.assignStatus == "Overdue !!" || object.assignStatus == "Reopened !!") {
                html += "<td style='background-color:red;color:white'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            else if (object.assignStatus == "Awaiting Manager Approval ..." || object.assignStatus == "In Progress ...") {
                html += "<td style='background-color:yellow;color:black'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"

            }
            else {
                html += "<td><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            html += "<td><p class='fw-bold mb-1'>" + object.dueDate + "</p>"
            html += "<td><p class='fw-bold mb-1'>" + object.statusDate + "</p>"
            html += "<td><p class='fw-bold mb-1'>" + object.assignedTo + "</p>"
            html += "<td><button class='btn btn-link' id=" + object.assign_ID + " data-bs-toggle='modal' data-bs-target='#AssignmentModal' onclick='handleActiveAssignmentModal(this.id)'>View</button></td>"

            }
        })
    })

    document.getElementById("Assigned Tasks Table").innerHTML = html
}

async function handleCompletedTaskTable(empId = window.localStorage.getItem('empId')) {
    const AssignURL = "https://localhost:7003/API/CompletedAssignment"
    var html = ""
    await fetch(AssignURL + "/" + empId).then(async function (response) {
        const data = await response.json();
        const sortedData = data.sort((a, b) => b.dueDate - a.dueDate)
        sortedData.forEach(function (object) {
            html += "<tr>"
            html += "<td>"
            html += "<div class='d-flex align-items-center'>"
            html += "<p class='fw-bold mb-1'>" + object.assignTitle + "</p>"
            html += "</div></td>"
            if (object.assignStatus == "Completed ☑") {
                html += "<td style='background-color:green;color:white'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            else if (object.assignStatus == "Overdue !!") {
                html += "<td style='background-color:red;color:white'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            else if (object.assignStatus == "Awaiting Manager Approval ..." || object.assignStatus == "In Progress ...") {
                html += "<td style='background-color:yellow;color:black'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"

            }
            else {
                html += "<td><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            html += "<td><p class='fw-bold mb-1'>" + object.dueDate + "</p>"
            html += "<td><p class='fw-bold mb-1'>" + object.statusDate + "</p>"
            html += "<td><p class='fw-bold mb-1'>" + object.assignedBy + "</p>"
            html += "<td><button class='btn btn-link' id=" + object.assign_ID + " data-bs-toggle='modal' data-bs-target='#CompletedAssignmentModal' onclick='handleCompletedAssignmentModal(this.id)'>View</button></td>"
        })
    })

    document.getElementById("Completed Tasks Table").innerHTML = html


}
async function handleManagerCompletedTaskTable(empId = window.localStorage.getItem('empId')) {
    const AssignURL = "https://localhost:7003/API/CompletedAssignment"
    var html = ""
    await fetch(AssignURL + "/" + empId).then(async function (response) {
        const data = await response.json();
        const sortedData = data.sort((a, b) => b.dueDate - a.dueDate)
        sortedData.forEach(function (object) {
            html += "<tr>"
            html += "<td>"
            html += "<div class='d-flex align-items-center'>"
            html += "<p class='fw-bold mb-1'>" + object.assignTitle + "</p>"
            html += "</div></td>"

            if (object.assignStatus == "Completed ☑") {
                html += "<td style='background-color:green;color:white'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            else if (object.assignStatus == "Overdue !!") {
                html += "<td style='background-color:red;color:white'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            else if (object.assignStatus == "Awaiting Manager Approval ..." || object.assignStatus == "In Progress ...") {
                html += "<td style='background-color:yellow;color:black'><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"

            }
            else {
                html += "<td><p class='fw-bold mb-1'>" + object.assignStatus + "</p>"
            }
            html += "<td><p class='fw-bold mb-1'>" + object.dueDate + "</p>"
            html += "<td><p class='fw-bold mb-1'>" + object.statusDate + "</p>"
            html += "<td><p class='fw-bold mb-1'>" + object.assignedTo + "</p>"
            html += "<td><button class='btn btn-link' id=" + object.assign_ID + " data-bs-toggle='modal' data-bs-target='#CompletedAssignmentModal' onclick='handleCompletedAssignmentModal(this.id); loadManagerTab()'>View</button></td>"
        })
    })

    document.getElementById("Completed Tasks Table").innerHTML = html
    document.getElementById("Completed Tasks Table 2").innerHTML = html


}

function loadManagerTab() {
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

function loadEmployeeTab() {
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

async function handleActiveAssignmentModal(assignmentID, assessmentID) {
    const QuestionURL = "https://localhost:7003/API/Question"
    window.localStorage.setItem('activeAssignID', assignmentID)
    window.localStorage.setItem('activeAssessmentID', assessmentID)
    var html = ""
    var count = 1
    await fetch(QuestionURL + "/" + assignmentID).then(async function (response) {
        const data = await response.json();
        data.forEach(async function (object){
            
            html += "<div class='mb-3 row' style='text-align: left'><label class='col-form-label'>" + count + ". " + object.questText + "</label>"
            if (object.questType == 'Rating') {
                

                    html += "<input type='number' id='" + object.quest_ID + "'class='form-control validate' min='0' max='5' value=>"
                
            }
            else if (object.questType == 'Binary') {
                

                html += "<input type='text' id='" + object.quest_ID + "'class='form-control validate' value='' placeholder='Please enter Yes/No'>"             
            }
            else {
 
                    html += "<input type='text' id='" + object.quest_ID + "'class='form-control validate' value=''>"           

            }

            html += "</div>"
            count += 1

        })
    })

    document.getElementById("AssignmentActiveModalBody").innerHTML = html
    getRatingResponses('employee')
    getTextResponses('employee')

}

async function handleManagerActiveAssignmentModal(assignmentID) {
    const QuestionURL = "https://localhost:7003/API/Question"
    var html = ""
    var count = 1
    window.localStorage.setItem('activeAssignID', assignmentID)
    await fetch(QuestionURL + "/" + assignmentID).then(async function (response) {
        const data = await response.json();
        data.forEach(async function (object){
            
            html += "<div class='mb-3 row' style='text-align: left'><label class='col-form-label'>" + count + ". " + object.questText + "</label>"
            if (object.questType == 'Rating') {
                

                    html += "<input type='number' id='" + object.quest_ID + "'class='form-control validate' min='0' max='5' value=>"
                
            }
            else {
 
                    html += "<input type='text' id='" + object.quest_ID + "'class='form-control validate' value=''>"           

            }

            html += "</div>"
            count += 1

        })
    })
    document.getElementById("ManagerAssignmentActiveModalBody").innerHTML = html
    getRatingResponses('manager')
    getTextResponses('manager')


}
async function handleCompletedAssignmentModal(assignmentID) {
    const QuestionURL = "https://localhost:7003/API/Question"
    var html = ""
    var count = 1
    window.localStorage.setItem('activeAssignID', assignmentID)
    await fetch(QuestionURL + "/" + assignmentID).then(async function (response) {
        const data = await response.json();
        data.forEach(async function (object){
            
            html += "<div class='mb-3 row' style='text-align: left'><label class='col-form-label'>" + count + ". " + object.questText + "</label>"
            if (object.questType == 'Rating') {
                

                    html += "<input type='number' disabled id='" + object.quest_ID + "'class='form-control validate' min='0' max='5' value=>"
                
            }
            else {
 
                    html += "<input type='text' disabled id='" + object.quest_ID + "'class='form-control validate' value=''>"           

            }

            html += "</div>"
            count += 1

        })
    })

    document.getElementById("CompletedAssignmentModalBody").innerHTML = html
    getRatingResponses('complete')
    getTextResponses('complete')


}

async function handleNewSelfAssignmentList() {
    const ApiUrl = "https://localhost:7003/API/Employee"
    var html = ""
    fetch(ApiUrl).then(async function (response) {
        const data = await response.json();
        data.forEach(function (object) {

            if (object.isManager == false && object.isActive == true) {
                html += "<tr>"
                html += "<td>"
                html += "<div class='d-flex align-items-center'>"
                html += "<p class='fw-bold mb-1'>" + object.emp_ID + "</p>"
                html += "</div></td>"
                html += "<td><p class='fw-bold mb-1'>" + object.firstName + "</p>"
                html += "<td><p class='fw-bold mb-1'>" + object.lastName + "</p>"
            }
        })
        document.getElementById("NewSelfModalBody").innerHTML = html
    })

}
async function handleNewPeerAssignmentList() {
    const ApiUrl = "https://localhost:7003/API/Employee"
    var html = ""
    fetch(ApiUrl).then(async function (response) {
        const data = await response.json();
        data.forEach(function (object) {

            if (object.isManager == false && object.isActive == true) {
                html += "<tr>"
                html += "<td>"
                html += "<div class='d-flex align-items-center'>"
                html += "<p class='fw-bold mb-1'>" + object.emp_ID + "</p>"
                html += "</div></td>"
                html += "<td><p class='fw-bold mb-1'>" + object.firstName + "</p>"
                html += "<td><p class='fw-bold mb-1'>" + object.lastName + "</p>"
            }
        })
        document.getElementById("NewPeerModalBody").innerHTML = html
    })

}

async function handleNewManagerAssignmentList() {
    const ApiUrl = "https://localhost:7003/API/Employee"
    var html = ""
    fetch(ApiUrl).then(async function (response) {
        const data = await response.json();
        data.forEach(function (object) {

            if (object.isManager == false && object.isActive == true) {
                html += "<tr>"
                html += "<td>"
                html += "<div class='d-flex align-items-center'>"
                html += "<p class='fw-bold mb-1'>" + object.emp_ID + "</p>"
                html += "</div></td>"
                html += "<td><p class='fw-bold mb-1'>" + object.firstName + "</p>"
                html += "<td><p class='fw-bold mb-1'>" + object.lastName + "</p>"
            }
        })
        document.getElementById("NewManagerModalBody").innerHTML = html
    })

}

function createSelf() {
    const AssignURL = "https://localhost:7003/API/Assignment"
    const sendTo = document.getElementById('inputSelfID').value
    const sendfrom = window.localStorage.getItem('empId')
    console.log(sendTo)
    console.log(sendfrom)
    var DueTime = new Date();
    DueTime.setDate(DueTime.getDate() + 14);
    var statusTime = new Date();
    statusTime.setDate(statusTime.getDate())
    console.log(DueTime.toString())
    console.log(statusTime)
    fetch(AssignURL, {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            Assign_ID: 1,
            IsComplete: false,
            IsManagerApproved: false,
            AssignStatus: 'Not Started :(',
            DueDate: DueTime.toString(),
            StatusDate: statusTime.toString(),
            AssignTitle: 'Self Review',
            AssignedBy: sendfrom,
            AssignedTo: sendTo
        })


    }).then(function(){handleNewManagerLoad()})
}
function createPeer() {
    const AssignURL = "https://localhost:7003/API/Assignment"
    const sendTo = document.getElementById('inputPeerID').value
    const sendfrom = window.localStorage.getItem('empId')
    console.log(sendTo)
    console.log(sendfrom)
    var DueTime = new Date();
    DueTime.setDate(DueTime.getDate() + 14);
    var statusTime = new Date();
    statusTime.setDate(statusTime.getDate())
    console.log(DueTime.toString())
    console.log(statusTime)
    fetch(AssignURL, {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            Assign_ID: 1,
            IsComplete: false,
            IsManagerApproved: false,
            AssignStatus: 'Not Started :(',
            DueDate: DueTime.toString(),
            StatusDate: statusTime.toString(),
            AssignTitle: 'Peer Review',
            AssignedBy: sendfrom,
            AssignedTo: sendTo
        })


    }).then(function(){handleNewManagerLoad()})
}
function createEmployeeSurvey() {
    const AssignURL = "https://localhost:7003/API/Assignment"
    const sendTo = document.getElementById('inputMangerID').value
    const sendfrom = window.localStorage.getItem('empId')
    console.log(sendTo)
    console.log(sendfrom)
    var DueTime = new Date();
    DueTime.setDate(DueTime.getDate() + 14);
    var statusTime = new Date();
    statusTime.setDate(statusTime.getDate())
    console.log(DueTime.toString())
    console.log(statusTime)
    fetch(AssignURL, {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            Assign_ID: 1,
            IsComplete: false,
            IsManagerApproved: false,
            AssignStatus: 'Not Started :(',
            DueDate: DueTime.toString(),
            StatusDate: statusTime.toString(),
            AssignTitle: 'Employee Survey',
            AssignedBy: sendfrom,
            AssignedTo: sendTo
        })


    }).then(function(){handleNewManagerLoad()})
}

function markCompleted(id = window.localStorage.getItem('activeAssignID')) {
    const deleteUrl = "https://localhost:7003/API/CompletedAssignment/" + id

    fetch(deleteUrl, {

        method: 'DELETE'

    }).then(function () {
        handleManagerActiveTaskTable()
        handleManagerCompletedTaskTable()
    })

}
function markReopen(id = window.localStorage.getItem('activeAssignID')) {
    const reopenUrl = "https://localhost:7003/API/Assignment/" + id

    fetch(reopenUrl, {

        method: 'DELETE'

    }).then(function () {
        handleManagerActiveTaskTable()
        handleManagerCompletedTaskTable()
    })

}


function getRatingResponses(emptype){

    var activeAssignment = window.localStorage.getItem('activeAssignID')
    const ResponseURL = "https://localhost:7003/API/QuestionResponse/"
    if(emptype == 'employee'){
        var completedForm = document.getElementById('AssignmentActiveModalBody')
    }
    else if(emptype == 'manager'){
        var completedForm = document.getElementById('ManagerAssignmentActiveModalBody')        
    }
    else if(emptype == 'complete'){
        var completedForm = document.getElementById('CompletedAssignmentModalBody')        
    }
    Array.from(completedForm.elements).forEach(element =>{
        fetch(ResponseURL).then(async function (response) {
            const data = await response.json();
            data.forEach(function (object) {
                if(object.quest_ID == element.id && object.assign_ID == activeAssignment && element.type == 'number'){
                    console.log('made it to rating response')
                    element.setAttribute('value', object.rating)
                }
            })
        })
    })
}
function getTextResponses(emptype){

    var activeAssignment = window.localStorage.getItem('activeAssignID')
    const ResponseURL = "https://localhost:7003/API/QuestionResponse/"
    if(emptype == 'employee'){
        var completedForm = document.getElementById('AssignmentActiveModalBody')
    }
    else if(emptype == 'manager'){
        var completedForm = document.getElementById('ManagerAssignmentActiveModalBody')        
    }
    else if(emptype == 'complete'){
        var completedForm = document.getElementById('CompletedAssignmentModalBody')        
    }
    Array.from(completedForm.elements).forEach(element =>{
        fetch(ResponseURL).then(async function (response) {
            const data = await response.json();
            data.forEach(function (object) {
                if(object.quest_ID == element.id && object.assign_ID == activeAssignment && element.type == 'text'){
                    console.log('made it to text response')
                    element.setAttribute('value', object.answerText)
                }
            })
        })
    })
}

function submitReview() {
    const ResponseURL = "https://localhost:7003/API/QuestionResponse"
    var completedForm = document.getElementById('AssignmentActiveModalBody')
    Array.from(completedForm.elements).forEach(element => {
        console.log(element.id)
        if (isNaN(element.value)) {
            fetch(ResponseURL, {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    Response_ID: 1,
                    AnswerText: element.value,
                    Rating: 0,
                    Assign_ID: window.localStorage.getItem('activeAssignID'),
                    Quest_ID: element.id

                })

            })
        }
        else{
            fetch(ResponseURL, {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type" : 'application/json'
                },
                body: JSON.stringify({
                    Response_ID : 1,
                    AnswerText : "Invalid",
                    Rating : element.value,
                    Assign_ID : window.localStorage.getItem('activeAssignID'),
                    Quest_ID : element.id
        
                })
        
            })
        }


    })

    fetch(ResponseURL, {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            Response_ID: 0,
            AnswerText: "dummy",
            Rating: 0,
            Assign_ID: window.localStorage.getItem('activeAssignID'),
            Quest_ID: 0

        })

    }).then(function () {
        handleActiveTaskTable()
        handleCompletedTaskTable()
    })

}
function updateReview() {
    const ResponseURL = "https://localhost:7003/API/QuestionResponse"
    var completedForm = document.getElementById('AssignmentActiveModalBody')
    Array.from(completedForm.elements).forEach(element => {
        console.log(element.id)
        if (isNaN(element.value)) {
            fetch(ResponseURL, {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    Response_ID: 1,
                    AnswerText: element.value,
                    Rating: 0,
                    Assign_ID: window.localStorage.getItem('activeAssignID'),
                    Quest_ID: element.id

                })

            })
        }
        else{
            fetch(ResponseURL, {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    "Content-Type" : 'application/json'
                },
                body: JSON.stringify({
                    Response_ID : 1,
                    AnswerText : "Invalid",
                    Rating : element.value,
                    Assign_ID : window.localStorage.getItem('activeAssignID'),
                    Quest_ID : element.id
        
                })
        
            })
        }


    })

    fetch(ResponseURL, {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            Response_ID: 2,
            AnswerText: "dummy",
            Rating: 0,
            Assign_ID: window.localStorage.getItem('activeAssignID'),
            Quest_ID: 0

        })

    }).then(function () {
        handleActiveTaskTable()
        handleCompletedTaskTable()
    })

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