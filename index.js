let studentCount=0;
const studentCountElement=document.getElementById("studentCount");

function updateStudentCount(){
    studentCountElement.textContent=studentCount;
}
function handleFormSubmit(event){
    event.preventDefault();
    studentCount++;
    const studentDetails={
        name: event.target.studentName.value,
        mobile: event.target.mobile.value,
        address: event.target.address.value

    };
    async  function addStudent(studentDetails){
        try{
            const res=await axios.post("https://crudcrud.com/api/3683eaaa641b4831b32a01723bd8e2a8/students",studentDetails);
            displayStudentOnScreen(res.data);
        } catch(err){
            console.log(err);
        }
    }  
    addStudent(studentDetails);
    document.getElementById("studentName").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("address").value = "";
  
    // Update student count
   
    updateStudentCount();
}

window.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await axios.get("https://crudcrud.com/api/60588a54b5264b86a2d8489a18e0dbea/studentDetails")
        studentCount=res.data.length;
        for (let i = 0; i < res.data.length; i++) {
            displayStudentOnScreen(res.data[i]);
        }
    } catch (err) {
        console.log(err);
    }
    updateStudentCount();
   
});

function displayStudentOnScreen(studentDetails){
    const studentItem=document.createElement("li");
    studentItem.appendChild(
        document.createTextNode(
            `${studentDetails.name} - ${studentDetails.mobile} - ${studentDetails.address}`
        )
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    studentItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    studentItem.appendChild(editBtn);

    const studentList = document.querySelector("ul");
    studentList.appendChild(studentItem);

    deleteBtn.addEventListener("click",function(event){
        if(studentCount>0){
            studentCount--;
        }
        updateStudentCount();
        studentList.removeChild(event.target.parentElement);
        deleteStudent(studentDetails._id);
    });

    editBtn.addEventListener("click", async function(event) {
        // Remove the student from the DOM
        studentList.removeChild(event.target.parentElement);
        
        
        const studentId = studentDetails._id; 
        
        
        document.getElementById("studentName").value = studentDetails.name
        document.getElementById("mobile").value = studentDetails.mobile;
        document.getElementById("address").value = studentDetails.address;
    
        // Delete the student from the server
        try {
            await deleteStudent(studentId);
            
            console.log(`Student with ID: ${studentId} deleted successfully`);
            studentCount--;
            updateStudentCount();
        } catch (err) {
            console.error(`Failed to delete student with ID: ${studentId}`, err);
        }
        updateStudentCount();
    });
}

async function deleteStudent(studentId) {
    try {
        const res = await axios.delete(`https://crudcrud.com/api/60588a54b5264b86a2d8489a18e0dbea/studentDetails/${studentId}`);
        console.log(res);
    } catch (err) {
        console.error(err);
    }
}