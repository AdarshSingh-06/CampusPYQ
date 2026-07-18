import { Link } from "react-router-dom";
import { useRef } from "react";
import {
  FaBookOpen,
  FaUniversity,
  FaDownload,
  FaArrowRight
} from "react-icons/fa";

function Home() {
           const cardRef = useRef(null);

const handleMove = (e) => {

  const card = cardRef.current;

  if (!card) return;

  const rect = card.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateY = (x / rect.width - 0.5) * 18;
  const rotateX = (0.5 - y / rect.height) * 18;

  card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.05)
  `;
};

const resetCard = () => {

  cardRef.current.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
};

  return (
    <>
      {/* Hero Section */}
       
       <div style={{height:"80px"}}></div>

      <section className="hero">
        <div className="aurora-bg">
    <span className="blob blob1"></span>
    <span className="blob blob2"></span>
    <span className="blob blob3"></span>
    <span className="grid-bg"></span>
</div>

        <div className="hero-left">

          <span className="badge">
            Barkatullah University
          </span>

          <h1>
            One Place For All
            <br />
            Previous Year
            <span> Question Papers</span>
          </h1>

          <p>
            Download Previous Year Question Papers Branch-wise,
            Semester-wise and Subject-wise in just one click.
          </p>

          <Link to="/branches" className="hero-btn">
    Browse Papers
    <FaArrowRight />
</Link>

        </div>

        <div className="hero-right">
          <div className="blob blob1"></div>
<div className="blob blob2"></div>
<div className="blob blob3"></div>

         <div
    ref={cardRef}
    className="hero-card"
    onMouseMove={handleMove}
    onMouseLeave={resetCard}
>

            <FaUniversity size={50} />

            <h3>Barkatullah University</h3>

            <p>Largest Free PYQ Collection</p>
            <div className="floating-icons">

<span>📚</span>

<span>📄</span>

<span>🎓</span>

<span>💻</span>

<span>🚀</span>

</div>

          </div>

        </div>
        <div className="sparkles">

  <span className="star s1"></span>
  <span className="star s2"></span>
  <span className="star s3"></span>
  <span className="star s4"></span>
  <span className="star s5"></span>
  <span className="star s6"></span>
  <span className="star s7"></span>
  <span className="star s8"></span>

</div>

      </section>

      {/* Statistics */}

      <section className="stats">

        <div className="stat-card">

          <h2>500+</h2>

          <p>Question Papers</p>

        </div>

        <div className="stat-card">

          <h2>10+</h2>

          <p>Branches</p>

        </div>

        <div className="stat-card">

          <h2>8</h2>

          <p>Semesters</p>

        </div>

        <div className="stat-card">

          <h2>1000+</h2>

          <p>Students</p>

        </div>

      </section>

      {/* Features */}

      <section className="features">

        <div className="feature-card">

          <FaDownload size={40} />

          <h3>Instant Download</h3>

          <p>Download any paper in one click.</p>

        </div>

        <div className="feature-card">

          <FaBookOpen size={40} />

          <h3>Organized Collection</h3>

          <p>Branch → Semester → Subject wise papers.</p>

        </div>

        <div className="feature-card">

          <FaUniversity size={40} />

          <h3>100% Free</h3>

          <p>No subscription. No hidden charges.</p>

        </div>

      </section>
    </>
  );
}

export default Home;