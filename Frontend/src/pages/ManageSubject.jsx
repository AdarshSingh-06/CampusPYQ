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

                    <button onClick={addSubject}>

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

                            <h3>

                                {subject.subjectName}

                            </h3>

                            <button

                                onClick={() =>

                                    deleteSubject(subject.id)

                                }

                            >

                                Delete

                            </button>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default ManageSubject;