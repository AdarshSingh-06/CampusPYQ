import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { toast } from "react-toastify";

function ManageBranch(){

const[branches,setBranches]=useState([]);
const[branchName,setBranchName]=useState("");

const loadBranches=async()=>{

try{

const res=await API.get("/branches");

setBranches(res.data);

}catch{

toast.error("Unable to Load");

}

};

useEffect(()=>{

loadBranches();

},[]);

const addBranch=async()=>{

if(branchName.trim()===""){

toast.warning("Enter Branch");

return;

}

try{

await API.post("/branches",{

branchName

});

toast.success("Branch Added");

setBranchName("");

loadBranches();

}catch{

toast.error("Failed");

}

};

const deleteBranch=async(id)=>{

if(!window.confirm("Delete Branch ?")) return;

await API.delete(`/branches/${id}`);

toast.success("Deleted");

loadBranches();

};

return(

<div className="admin-container">

<Sidebar/>

<div className="content">

<Topbar/>

<h1 className="page-title">

Manage Branches

</h1>

<div className="top-card">

<div className="input-group">

<input

placeholder="Enter Branch Name"

value={branchName}

onChange={(e)=>setBranchName(e.target.value)}

/>

<button

className="primary-btn"

onClick={addBranch}

>

Add Branch

</button>

</div>

</div>

<div className="list-grid">

{

branches.map(branch=>(

<div

className="list-card"

key={branch.id}

>

<h3>

📚 {branch.branchName}

</h3>

<button

className="delete-btn"

onClick={()=>deleteBranch(branch.id)}

>

Delete

</button>

</div>

))

}

</div>

</div>

</div>

);

}

export default ManageBranch;