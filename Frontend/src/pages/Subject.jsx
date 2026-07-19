import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import API from "../services/api";

function Subject() {

  const { semesterId } = useParams();

  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(true);

    API.get(`/subjects/semester/${semesterId}`)
      .then((res) => {
        setSubjects(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [semesterId]);

  const filtered = subjects.filter((subject) =>
    subject.subjectName.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="page">

      <h1>📚 Subjects</h1>

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search Subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {loading ? (

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <h3>⏳ Loading Subjects...</h3>
        </div>

      ) : filtered.length === 0 ? (

        <p>No Subject Found</p>

      ) : (

        filtered.map((subject) => (

          <div
            className="card fade"
            key={subject.id}
            onClick={() => navigate(`/subjects/${subject.id}/pyqs`)}
          >

            <h2>{subject.subjectName}</h2>

            <span></span>

            <p>Click to View Papers →</p>

          </div>

        ))

      )}

    </div>

  );

}

export default Subject;