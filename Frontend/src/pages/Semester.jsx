import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import API from "../services/api";

function Semester() {

  const { branchId } = useParams();
  const navigate = useNavigate();

  const [semesters, setSemesters] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    API.get(`/branches/${branchId}/semesters`)
      .then((res) => setSemesters(res.data))
      .catch(console.log);

  }, [branchId]);

  const filtered = semesters.filter((s) =>
    String(s.semesterNumber).includes(search)
  );

  return (

    <div className="page">

      <h1>📖 Select Semester</h1>

      <div className="search-box">

        <FaSearch className="search-icon"/>

        <input
          type="text"
          placeholder="Search Semester..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>

      {
        filtered.length===0 ?

        <p>No Semester Found</p>

        :

        filtered.map((semester)=>(

          <div
            className="card fade"
            key={semester.id}
            onClick={()=>navigate(`/semesters/${semester.id}/subjects`)}
          >

            <h2>Semester {semester.semesterNumber}</h2>
            <span></span>

            <p>Click to View Subjects →</p>

          </div>

        ))
      }

    </div>

  );

}

export default Semester;