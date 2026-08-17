import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import API from "../services/api";

function Semester() {
  const { branchId } = useParams();
  const navigate = useNavigate();

  const branches = JSON.parse(
    sessionStorage.getItem("branches") || "[]"
  );

  const currentBranch = branches.find(
    (branch) => String(branch.id) === String(branchId)
  );

  const [semesters, setSemesters] = useState(() => {
    const saved = sessionStorage.getItem(
      `semesters_${branchId}`
    );

    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(
    semesters.length === 0
  );

  useEffect(() => {
    if (semesters.length > 0) {
      return;
    }

    API.get(`/semesters/branch/${branchId}`)
      .then((res) => {
        setSemesters(res.data);

        sessionStorage.setItem(
          `semesters_${branchId}`,
          JSON.stringify(res.data)
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [branchId, semesters.length]);

  const filtered = semesters.filter((s) =>
    String(s.semesterNumber).includes(search)
  );

  return (
    <div className="page">
      <button
  className="back-btn"
  onClick={() => navigate(-1)}
>
  ← Back
</button>

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <span
          onClick={() => navigate("/branches")}
          className="breadcrumb-link"
        >
          🎓 Branches
        </span>

        <span>›</span>

        <strong>
          {currentBranch?.branchName || "Branch"}
        </strong>
      </div>

      <h1>📖 Select Semester</h1>

      <div className="search-box">
        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search Semester..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <h3>⏳ Loading Semesters...</h3>
        </div>
      ) : filtered.length === 0 ? (
        <p>No Semester Found</p>
      ) : (
        filtered.map((semester) => (
          <div
            className="card fade"
            key={semester.id}
           onClick={() => {
  navigate(`/semesters/${semester.id}/subjects`);
}}
          >
            <h2>
              Semester {semester.semesterNumber}
            </h2>

            <span></span>

            <p>Click to View Subjects →</p>
          </div>
        ))
      )}

    </div>
  );
}

export default Semester;