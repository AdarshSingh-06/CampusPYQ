import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { toast } from "react-toastify";

function ManagePyq() {

    const BACKEND_URL = "https://campuspyq.onrender.com";

    const [branches, setBranches] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [pyqs, setPyqs] = useState([]);

    const [branchId, setBranchId] = useState("");
    const [semesterId, setSemesterId] = useState("");
    const [subjectId, setSubjectId] = useState("");

    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [file, setFile] = useState(null);

    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editYear, setEditYear] = useState("");

    useEffect(() => {
        loadBranches();
    }, []);

    const loadBranches = async () => {
        const res = await API.get("/branches");
        setBranches(res.data);
    };

    const loadSemesters = async (id) => {
        const res = await API.get(`/branches/${id}/semesters`);
        setSemesters(res.data);
        setSubjects([]);
        setPyqs([]);
    };

    const loadSubjects = async (id) => {
        const res = await API.get(`/subjects/semester/${id}`);
        setSubjects(res.data);
        setPyqs([]);
    };

    const loadPyqs = async (id) => {
        const res = await API.get(`/pyqs/subject/${id}`);
        setPyqs(res.data);
    };

    const uploadPyq = async () => {

        if (subjectId === "") {
            toast.warning("Select Subject");
            return;
        }

        if (title.trim() === "") {
            toast.warning("Enter Paper Title");
            return;
        }

        if (year === "") {
            toast.warning("Enter Year");
            return;
        }

        if (!file) {
            toast.warning("Please Select PDF");
            return;
        }

        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("year", year);
            formData.append("subjectId", subjectId);
            formData.append("file", file);

            await API.post("/pyqs/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            toast.success("PYQ Uploaded Successfully");

            setTitle("");
            setYear("");
            setFile(null);

            loadPyqs(subjectId);

        } catch (err) {
            console.log(err);
            toast.error("Upload Failed");
        }

    };

    const deletePyq = async (id) => {

        if (!window.confirm("Delete this PYQ?"))
            return;

        try {

            await API.delete(`/pyqs/${id}`);

            toast.success("PYQ Deleted Successfully");

            loadPyqs(subjectId);

        } catch (err) {

            console.log(err);

        }

    };

    const updatePyq = async () => {

        if (editTitle.trim() === "") {
            toast.warning("Enter Title");
            return;
        }

        if (editYear === "") {
            toast.warning("Enter Year");
            return;
        }

        try {

            await API.put(`/pyqs/${editId}`, {
                title: editTitle,
                year: editYear
            });

            toast.success("PYQ Updated");

            setEditId(null);
            setEditTitle("");
            setEditYear("");

            loadPyqs(subjectId);

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

                    <h2>Manage PYQ</h2>

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

                    <select
                        value={subjectId}
                        onChange={(e) => {
                            setSubjectId(e.target.value);
                            loadPyqs(e.target.value);
                        }}
                    >

                        <option value="">Select Subject</option>

                        {
                            subjects.map(subject => (

                                <option
                                    key={subject.id}
                                    value={subject.id}
                                >
                                    {subject.subjectName}
                                </option>

                            ))
                        }

                    </select>

                    <br /><br />

                    <input
                        placeholder="Paper Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <br /><br />

                    <input
                        type="number"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />

                    <br /><br />

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                    />

                    <br /><br />

                    <button
                        className="primary-btn"
                        onClick={uploadPyq}
                    >
                        Upload PYQ
                    </button>

                </div>

                <br />

                {
                    pyqs.map((pyq) => (

                        <div className="card" key={pyq.id}>

                            {

                                editId === pyq.id ?

                                    <>
                                                                  

                                        <input
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            placeholder="Paper Title"
                                        />

                                        <br /><br />

                                        <input
                                            type="number"
                                            value={editYear}
                                            onChange={(e) => setEditYear(e.target.value)}
                                            placeholder="Year"
                                        />

                                        <br /><br />

                                        <button
                                            className="primary-btn"
                                            onClick={updatePyq}
                                        >
                                            Save
                                        </button>

                                        &nbsp;

                                        <button
                                            className="delete-btn"
                                            onClick={() => {
                                                setEditId(null);
                                                setEditTitle("");
                                                setEditYear("");
                                            }}
                                        >
                                            Cancel
                                        </button>

                                    </>

                                    :

                                    <>

                                        <h3>{pyq.title}</h3>

                                        <p>Year : {pyq.year}</p>

                                        <br />

                                        <a
                                            href={`${BACKEND_URL}/api/pyqs/view/${pyq.id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <button className="primary-btn">
                                                View
                                            </button>
                                        </a>

                                        &nbsp;

                                        <a
                                            href={`${BACKEND_URL}/api/pyqs/download/${pyq.id}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <button className="primary-btn">
                                                Download
                                            </button>
                                        </a>

                                        &nbsp;

                                        <button
                                            className="primary-btn"
                                            onClick={() => {
                                                setEditId(pyq.id);
                                                setEditTitle(pyq.title);
                                                setEditYear(pyq.year);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        &nbsp;

                                        <button
                                            className="delete-btn"
                                            onClick={() => deletePyq(pyq.id)}
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

export default ManagePyq;