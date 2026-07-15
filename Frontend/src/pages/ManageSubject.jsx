import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { toast } from "react-toastify";

function ManageSubject() {

    const [branches, setBranches] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [branchId, setBranchId] = useState("");
    const [semesterId, setSemesterId] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [editId, setEditId] = useState(null);
const [editSubject, setEditSubject] = useState("");

    useEffect(() => {
        loadBranches();
    }, []);

    const loadBranches = async () => {

        try {

            const res = await API.get("/branches");

            setBranches(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const loadSemesters = async (id) => {

        if (!id) return;

        const res = await API.get(`/branches/${id}/semesters`);

        setSemesters(res.data);

        setSubjects([]);

        setSemesterId("");

    };

    const loadSubjects = async (id) => {

        if (!id) return;

        const res = await API.get(`/subjects/semester/${id}`);

        setSubjects(res.data);

    };

    const addSubject = async () => {

        if (semesterId === "") {

          toast.warning("Select Semester");

            return;

        }

        if (subjectName.trim() === "") {

           toast.warning("Enter Subject Name");

            return;

        }

        try {

            await API.post("/subjects", {

                subjectName,

                semester: {

                    id: Number(semesterId)

                }

            });

           toast.success("Subject Added Successfully");

            setSubjectName("");

            loadSubjects(semesterId);

        } catch (err) {

            console.log(err);

         toast.error("Failed to Add Subject");

        }

    };

    const deleteSubject = async (id) => {

        if (!window.confirm("Delete Subject?")) return;

        try {

            await API.delete(`/subjects/${id}`);

          toast.success("Subject Deleted Successfully");

            loadSubjects(semesterId);

        } catch (err) {

            console.log(err);

        }

    };
    const updateSubject = async () => {

    if (editSubject.trim() === "") {

        toast.warning("Enter Subject Name");

        return;

    }

    try {

        await API.put(`/subjects/${editId}`, {

            subjectName: editSubject

        });

        toast.success("Subject Updated");

        setEditId(null);
        setEditSubject("");

        loadSubjects(semesterId);

    } catch {

        toast.error("Update Failed");

    }

};

    return (

        <div className="admin-container">

            <Sidebar />

            <div className="content">

                <Topbar />

                <div className="card">

                    <h2>Manage Subject</h2>

                    <select

                        value={branchId}

                        onChange={(e) => {

                            setBranchId(e.target.value);

                            loadSemesters(e.target.value);

                        }}

                    >

                        <option value="">Select Branch</option>

                        {

                            branches.map(branch => (

                                <option

                                    key={branch.id}

                                    value={branch.id}

                                >

                                    {branch.branchName}

                                </option>

                            ))

                        }

                    </select>

                    <br /><br />

                    <select

                        value={semesterId}

                        onChange={(e) => {

                            setSemesterId(e.target.value);

                            loadSubjects(e.target.value);

                        }}

                    >

                        <option value="">Select Semester</option>

                        {

                            semesters.map(semester => (

                                <option

                                    key={semester.id}

                                    value={semester.id}

                                >

                                    Semester {semester.semesterNumber}

                                </option>

                            ))

                        }

                    </select>

                    <br /><br />

                    <input

                        placeholder="Subject Name"

                        value={subjectName}

                        onChange={(e) =>

                            setSubjectName(e.target.value)

                        }

                    />

                    <br /><br />

                    <button
                    className="primary-btn"
                    onClick={addSubject}>

                        Add Subject

                    </button>

                </div>

                <br />

                {

                    subjects.map(subject => (

                        <div

                            className="card"

                            key={subject.id}

                        >

                            {
editId === subject.id ?

<>

<input
value={editSubject}
onChange={(e)=>setEditSubject(e.target.value)}
/>

<br/><br/>

<button
className="primary-btn"
onClick={updateSubject}>
Save
</button>

<button
onClick={()=>{
setEditId(null);
setEditSubject("");
}}
style={{marginLeft:"10px"}}
>
Cancel
</button>

</>

:

<>

<h3>
{subject.subjectName}
</h3>

<button
className="primary-btn"
onClick={()=>{
setEditId(subject.id);
setEditSubject(subject.subjectName);
}}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteSubject(subject.id)}
style={{marginLeft:"10px"}}
>
Delete
</button>

</>

}

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default ManageSubject;