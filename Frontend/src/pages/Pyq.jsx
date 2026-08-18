import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import API from "../services/api";

function Pyq() {

  const { subjectId } = useParams();
  const navigate = useNavigate();

  const BACKEND_URL =
    "https://campuspyq-1.onrender.com";

  const cacheKey = `pyqs_${subjectId}`;

  const [pyqs, setPyqs] = useState(() => {

    const saved =
      localStorage.getItem(cacheKey);

    return saved
      ? JSON.parse(saved)
      : [];
  });

  const [search, setSearch] = useState("");

  const [year, setYear] = useState("All");

  const [loading, setLoading] = useState(() => {

    return !localStorage.getItem(cacheKey);

  });

  const breadcrumbData = JSON.parse(
    sessionStorage.getItem(
      `breadcrumb_${subjectId}`
    ) || "{}"
  );

  useEffect(() => {

    if (localStorage.getItem(cacheKey)) {
      return;
    }

    setLoading(true);

    API.get(`/pyqs/subject/${subjectId}`)
      .then((res) => {

        setPyqs(res.data);

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

  }, [subjectId, cacheKey]);

  const years = [
    ...new Set(
      pyqs.map((p) => p.year)
    )
  ];

  const filtered = pyqs.filter((pyq) => {

    const matchTitle =
      pyq.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchYear =
      year === "All" ||
      pyq.year === Number(year);

    return matchTitle && matchYear;

  });

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
          onClick={() =>
            navigate("/branches")
          }
        >
          🎓{" "}
          {breadcrumbData.branchName ||
            "Branch"}
        </span>

        <span>›</span>

        <span
          className="breadcrumb-link"
          onClick={() =>
            navigate(
              `/branches/${breadcrumbData.branchId}/semesters`
            )
          }
        >
          📖 Semester{" "}
          {breadcrumbData.semesterNumber ||
            ""}
        </span>

        <span>›</span>

        <span
          className="breadcrumb-link"
          onClick={() =>
            navigate(
              `/semesters/${breadcrumbData.semesterId}/subjects`
            )
          }
        >
          📚{" "}
          {breadcrumbData.subjectName ||
            "Subject"}
        </span>

        <span>›</span>

        <strong>
          📄 PYQ
        </strong>

      </div>

      <h1>
        📄 Previous Year Papers
      </h1>

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search Paper..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      <div
        style={{
          textAlign: "center",
          marginBottom: "25px"
        }}
      >

        <select
          value={year}
          onChange={(e) =>
            setYear(e.target.value)
          }
          style={{
            padding: "12px",
            borderRadius: "8px",
            fontSize: "16px"
          }}
        >

          <option value="All">
            All
          </option>

          {years.map((y) => (

            <option
              key={y}
              value={y}
            >
              {y}
            </option>

          ))}

        </select>

      </div>

      {loading ? (

        <div
          style={{
            textAlign: "center",
            marginTop: "40px"
          }}
        >

          <h3>
            ⏳ Loading Question Papers...
          </h3>

        </div>

      ) : filtered.length === 0 ? (

        <div className="empty-state">

          <div className="empty-icon">
            📂
          </div>

          <h2>
            No Question Papers Available
          </h2>

          <p>
            Upload Coming Soon...
          </p>

        </div>

      ) : (

        filtered.map((pyq) => (

          <div
            className="card fade"
            key={pyq.id}
          >

            <h2>
              {pyq.title}
            </h2>

            <p>
              <b>Year :</b>{" "}
              {pyq.year}
            </p>

            <div className="pyq-buttons">

              <a
                href={`${BACKEND_URL}/api/pyqs/view/${pyq.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >

                <button className="view-btn">
                  👁 View PDF
                </button>

              </a>

              <a
                href={`${BACKEND_URL}/api/pyqs/download/${pyq.id}`}
              >

                <button className="download-btn">
                  ⬇ Download PDF
                </button>

              </a>

            </div>

          </div>

        ))

      )}

    </div>

  );
}

export default Pyq;