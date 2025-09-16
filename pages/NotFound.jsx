import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <section>
      <h2>404</h2>
      <p>Page not found.</p>
      <Link to="/">Go home</Link>
    </section>
  );
}
