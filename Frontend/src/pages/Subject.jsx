import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import API from "../services/api";

function Subject() {
  const { semesterId } = useParams();
  const navigate = useNavigate();

  const cacheKey = `subjects_${semesterId}`;

  const [subjects, setSubjects] = useState(() => {
    const saved = localStorage.getItem(cacheKey);

    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(() => {
    return !localStorage.getItem(cacheKey);
  });

  let currentSemester = null;
  let currentBranch = null;

  const branches = JSON.parse(
    localStorage.getItem("branches") || "[]"
  );

  for (const branch of branches) {

    const semesters = JSON.parse(
      localStorage.getItem(
        `semesters_${branch.id}`
      ) || "[]"
    );

    const found = semesters.find(
      (semester) =>
        String(semester.id) ===
        String(semesterId)
    );

    if (found) {

      currentSemester = found;
      currentBranch = branch;

      break;
    }
  }

  useEffect(() => {

    if (localStorage.getItem(cacheKey)) {
      return;
    }

    API.get(`/subjects/semester/${semesterId}`)
      .then((res) => {

        setSubjects(res.data);

        localStorage.setItem(
          cacheKey,
          JSON.stringify(res.data)
        );

      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [semesterId, cacheKey]);

  const filtered = subjects.filter((subject) =>
    subject.subjectName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const openSubject = (subject) => {

    sessionStorage.setItem(
      `breadcrumb_${subject.id}`,
      JSON.stringify({
        branchId: currentBranch?.id,
        branchName: currentBranch?.branchName,
        semesterId: currentSemester?.id,
        semesterNumber:
          currentSemester?.semesterNumber,
        subjectName: subject.subjectName
      })
    );

    navigate(
      `/subjects/${subject.id}/pyqs`
    );
  };

  return (
    <div className="page">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="breadcrumb">

        <span
          className="breadcrumb-link"
          onClick={() => navigate("/branches")}
        >
          🎓 {currentBranch?.branchName || "Branch"}
        </span>

        <span>›</span>

        <span
          className="breadcrumb-link"
          onClick={() =>
            navigate(
              `/branches/${currentBranch?.id}/semesters`
            )
          }
        >
          📖 Semester{" "}
          {currentSemester?.semesterNumber || ""}
        </span>

        <span>›</span>

        <strong>
          📚 Subjects
        </strong>

      </div>

      <h1>📚 Subjects</h1>

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search Subject..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {loading ? (

        <div
          style={{
            textAlign: "center",
            marginTop: "40px"
          }}
        >
          <h3>
            ⏳ Loading Subjects...
          </h3>
        </div>

      ) : filtered.length === 0 ? (

        <p>No Subject Found</p>

      ) : (

        filtered.map((subject) => (

          <div
            className="card fade"
            key={subject.id}
            onClick={() =>
              openSubject(subject)
            }
          >

            <h2>
              {subject.subjectName}
            </h2>

            <span></span>

            <p>
              Click to View Papers →
            </p>

          </div>

        ))

      )}

    </div>
  );
}

export default Subject;