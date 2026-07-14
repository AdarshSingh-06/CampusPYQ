import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="footer">

      <h2>Campus PYQ</h2>

      <p>

        One Place For All Previous Year Question Papers of
        Barkatullah University.

      </p>

      <div className="footer-links">

        <Link to="/">Home</Link>

        <Link to="/branches">Branches</Link>

        <Link to="/login">Admin</Link>

      </div>

      <div className="footer-bottom">

        © 2026 Campus PYQ • Made with ❤️ by Adarsh Singh

      </div>

    </footer>

  );

}

export default Footer;