import { useEffect, useState, useRef } from "react";
import axios from "axios";
function App() {
  const [user_data, set_user_data] = useState([]);
  let user_name = useRef();
  let user_email = useRef();
  const [role, set_role] = useState("student");
  let count = 1;
  async function get_data() {
    const a = await axios.get("https://userapp6.onrender.com/users");
    console.log(a);
    set_user_data(a.data);
  }
  useEffect(() => {
    get_data();
  }, []);
  return (
    <>
      <div className="conatiner">
        <h1
          style={{
            textAlign: "center",
            backgroundColor: "black",
            color: "white",
          }}
        >
          MY USER APP
        </h1>
        <h2
          style={{
            textAlign: "center",
            backgroundColor: "black",
            color: "white",
          }}
        >
          List Of Users
        </h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr.No.</th>
              <th scope="col">User Email</th>
              <th scope="col">User Name</th>
              <th scope="col">User Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">#</th>
              <td>
                <input
                  type="text"
                  placeholder="Enter user email"
                  ref={user_email}
                ></input>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Enter user name"
                  ref={user_name}
                ></input>
              </td>
              <td>
                <select
                  onChange={(e) => {
                    set_role(e.target.value);
                  }}
                >
                  <option>Student</option>
                  <option>Teacher</option>
                  <option>Admin</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    (async function () {
                      let obj = {
                        email: user_email.current.value,
                        name: user_name.current.value,
                        role: role,
                      };
                      const a = await axios.post(
                        "https://userapp6.onrender.com/adduser",
                        obj
                      );
                      alert("user added successfully");
                      user_email.current.value = "";
                      user_name.current.value = "";
                    })();
                  }}
                >
                  Add User
                </button>
              </td>
            </tr>
            {user_data.map((it) => (
              <tr>
                <th scope="row">{count++}</th>
                <td>{it.email}</td>
                <td>{it.name}</td>
                <td>{it.role}</td>
                <td>
                  <button className="btn btn-success">Edit</button>{" "}
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default App;
