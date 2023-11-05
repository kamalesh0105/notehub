import { Link } from "react-router-dom";
import "./css/Public.css";

const Public = () => {
  const content = (
    <section className="Public">
      <header>
        <h2 className="text-warning bg-dark ">___NoteHub___</h2>
      </header>
      <main className="Public_main text-warning d-flex flex-column">
        <p>
          Located in Beautiful Downtown Foo City, Dan D. Repairs provides a
          trained staff ready to meet your tech repair needs.
        </p>
        <address className="public__addr">
          Dan D. Repairs
          <br />
          555 Foo Drive
          <br />
          Foo City, CA 12345
          <br />
          <a href="tel:+15555555555">(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Dan Davidson</p>
      </main>
      <div class="fixed-bottom">
        <footer className="mt-auto">
          <Link to={"/Login"}>
            <p>EmployeeLogin</p>
          </Link>
        </footer>
      </div>    
    </section>
  );
  return content;
};

export default Public;
