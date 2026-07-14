import { useEffect, useState } from "react";
import API from "../services/api";

function Upload() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [file, setFile] = useState(null);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    API.get("/subjects")
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !year || !subjectId || !file) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("year", year);
    formData.append("subjectId", subjectId);
    formData.append("file", file);

    try {
      await API.post("/pyqs/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("PYQ Uploaded Successfully!");

      setTitle("");
      setYear("");
      setSubjectId("");
      setFile(null);

      document.getElementById("fileInput").value = "";
    } catch (error) {
      console.error(error);
     toast.error("Upload Failed");
    }
  };

  return (
    <div className="page">
      <h1>Upload New PYQ</h1>

      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Enter Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />

        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
        >
          <option value="">Select Subject</option>

          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.subjectName}
            </option>
          ))}
        </select>

        <input
          id="fileInput"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit">Upload PYQ</button>
      </form>
    </div>
  );
}

export default Upload;