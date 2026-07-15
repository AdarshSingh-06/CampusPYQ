import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { toast } from "react-toastify";

function ManageSemester() {

  const [branches, setBranches] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [branchId, setBranchId] = useState("");
  const [semesterNumber, setSemesterNumber] = useState("");
  const [editId, setEditId] = useState(null);
const [editSemester, setEditSemester] = useState("");

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    const res = await API.get("/branches");
    setBranches(res.data);
  };

      const loadSemesters = async (id) => {

  if (!id) {
    setSemesters([]);
    return;
  }

  try {

    const res = await API.get(`/semesters/branch/${id}`);

    setSemesters(res.data);

  } catch (error) {

    console.error(error);

    toast.error("Failed to load semesters");

  }

};

  const addSemester = async () => {

    if (!branchId || !semesterNumber) {
      toast.warning("Fill all fields");
      return;
    }

    await API.post("/semesters", {
      semesterNumber,
      branch: {
        id: branchId
      }
    });

    toast.success("Semester Added");

    setSemesterNumber("");

  loadSemesters(branchId);

  };

  const deleteSemester = async(id)=>{

      if(!window.confirm("Delete Semester?")) return;

      await API.delete(`/semesters/${id}`);

      toast.success("Deleted");

   loadSemesters(branchId);

  }
  const updateSemester = async () => {

    if (!editSemester) {
        toast.warning("Enter Semester");
        return;
    }

    try {

        await API.put(`/semesters/${editId}`, {
            semesterNumber: editSemester
        });

        toast.success("Semester Updated");

        setEditId(null);
        setEditSemester("");

        loadSemesters(branchId);

    } catch {

        toast.error("Update Failed");

    }

};

  return (

<div className="admin-container">

<Sidebar/>

<div className="content">

<Topbar/>

<h1 className="page-title">

Manage Semesters

</h1>

<div className="top-card">

<div className="input-group">

<select
value={branchId}
onChange={(e)=>{

    setBranchId(e.target.value);

    loadSemesters(e.target.value);

}}
>

<option value="">

Select Branch

</option>

{

branches.map(branch=>(

<option
key={branch.id}
value={branch.id}
>

{branch.branchName}

</option>

))

}

</select>

<input

type="number"

placeholder="Semester"

value={semesterNumber}

onChange={(e)=>setSemesterNumber(e.target.value)}

/>

<button
className="primary-btn"
onClick={addSemester}
>

Add Semester

</button>

</div>

</div>

<div className="list-grid">

{

semesters.map(semester=>(

<div
className="list-card"
key={semester.id}
>

{
editId === semester.id ?

<>

<input
type="number"
value={editSemester}
onChange={(e)=>setEditSemester(e.target.value)}
/>

<div style={{display:"flex",gap:"10px",marginTop:"10px"}}>

<button
className="primary-btn"
onClick={updateSemester}
>
Save
</button>

<button
className="delete-btn"
onClick={()=>{
setEditId(null);
setEditSemester("");
}}
>
Cancel
</button>

</div>

</>

:

<>

<h3>
Semester {semester.semesterNumber}
</h3>

<p>
{semester.branch?.branchName}
</p>

<br/>

<div style={{display:"flex",gap:"10px"}}>

<button
className="primary-btn"
onClick={()=>{
setEditId(semester.id);
setEditSemester(semester.semesterNumber);
}}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteSemester(semester.id)}
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

export default ManageSemester;