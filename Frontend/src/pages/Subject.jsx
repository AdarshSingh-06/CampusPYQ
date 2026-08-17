import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import API from "../services/api";

function Subject() {
  const { semesterId } = useParams();
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState(() => {
    const saved = sessionStorage.getItem(
      `subjects_${semesterId}`
    );

    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(
    subjects.length === 0
  );

  /*
    Semester aur Branch information
    sessionStorage se nikalna
  */

  let currentSemester = null;
  let currentBranch = null;

  const branches = JSON.parse(
    sessionStorage.getItem("branches") || "[]"
  );

  for (const branch of branches) {
    const semesters = JSON.parse(
      sessionStorage.getItem(
        `semesters_${branch.id}`
      ) || "[]"
    );

    const found = semesters.find(
      (semester) =>
        String(semester.id) === String(semesterId)
    );

    if (found) {
      currentSemester = found;
      currentBranch = branch;
      break;
    }
  }

  /*
    Subjects API
  */

  useEffect(() => {
    if (subjects.length > 0) {
      return;
    }

    API.get(`/subjects/semester/${semesterId}`)
      .then((res) => {
        setSubjects(res.data);

        sessionStorage.setItem(
          `subjects_${semesterId}`,
          JSON.stringify(res.data)
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [semesterId, subjects.length]);

  /*
    Search
  */

  const filtered = subjects.filter((subject) =>
    subject.subjectName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /*
    Open PYQ page
  */

  const openSubject = (subject) => {
    /*
      PYQ page ke breadcrumb ke liye
      branch + semester + subject information save karna
    */

    sessionStorage.setItem(
      `breadcrumb_${subject.id}`,
      JSON.stringify({
        branchId: currentBranch?.id,
        branchName: currentBranch?.branchName,
        semesterId: currentSemester?.id,
        semesterNumber: currentSemester?.semesterNumber,
        subjectName: subject.subjectName
      })
    );

    navigate(`/subjects/${subject.id}/pyqs`);
  };

  return (
    <div className="page">

      {/* BACK BUTTON */}

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* BREADCRUMB */}

      <div className="breadcrumb">

        {/* BRANCH */}

        <span
          className="breadcrumb-link"
          onClick={() => navigate("/branches")}
        >
          🎓 {currentBranch?.branchName || "Branch"}
        </span>

        <span>›</span>

        {/* SEMESTER */}

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

        {/* CURRENT PAGE */}

        <strong>📚 Subjects</strong>

      </div>

      {/* PAGE TITLE */}

      <h1>📚 Subjects</h1>

      {/* SEARCH */}

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

      {/* LOADING */}

      {loading ? (

        <div
          style={{
            textAlign: "center",
            marginTop: "40px"
          }}
        >
          <h3>⏳ Loading Subjects...</h3>
        </div>

      ) : filtered.length === 0 ? (

        /* NO SUBJECT */

        <div className="empty-state">

          <div className="empty-icon">
            📚
          </div>

          <h2>
            No Subject Found
          </h2>

          <p>
            Try searching another subject.
          </p>

        </div>

      ) : (

        /* SUBJECT CARDS */

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