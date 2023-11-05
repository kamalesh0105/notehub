import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const content = (
    <section className="WelcomeS">
      <h3>Welcome</h3>

      <p className="text-danger">{today}</p>
      <Link to={"/dash/user"} style={{ textDecoration: "none" }}>
        <p className="text-warning "> #View User Settings</p>
      </Link>
      <Link
        className="text-warning"
        to={"/dash/notes"}
        style={{ textDecoration: "none" }}
      >
        <p>#View User Notes</p>
      </Link>
    </section>
  );

  return content;
};

export default Welcome;
