import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { toast } from "react-toastify";

function ManageBranch(){
    useEffect(() => {
    sessionStorage.setItem("lastPage", "/manage-branch");
}, []);

const[branches,setBranches]=useState([]);
const[branchName,setBranchName]=useState("");
const [editId, setEditId] = useState(null);
const [editName, setEditName] = useState("");

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
const updateBranch = async () => {

    if (editName.trim() === "") {
        toast.warning("Enter Branch Name");
        return;
    }

    try {

        await API.put(`/branches/${editId}`, {
            branchName: editName
        });

        toast.success("Branch Updated");

        setEditId(null);
        setEditName("");

        loadBranches();

    } catch {

        toast.error("Update Failed");

    }

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

{
editId === branch.id ?

<>

<input
value={editName}
onChange={(e)=>setEditName(e.target.value)}
/>

<div style={{display:"flex",gap:"10px",marginTop:"10px"}}>

<button
className="primary-btn"
onClick={updateBranch}
>
Save
</button>

<button
className="delete-btn"
onClick={()=>{
setEditId(null);
setEditName("");
}}
>
Cancel
</button>

</div>

</>

:

<>

<h3>
📚 {branch.branchName}
</h3>

<div style={{display:"flex",gap:"10px"}}>

<button
className="primary-btn"
onClick={()=>{
setEditId(branch.id);
setEditName(branch.branchName);
}}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteBranch(branch.id)}
>
Delete
</button>

</div>

</>

}

</div>

))

}

</div>

</div>

</div>

);

}

export default ManageBranch;