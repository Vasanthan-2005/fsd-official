import React, { useState } from "react";

function App() {
  const [FormData, setformdata] = useState({
    f_name: "",
    l_name: "",
    emp_id: "",
    email: "",
    phone: "",
    dept: "",
    doj: "",
    role: "",
  });

  const [errors, seterrors] = useState({});

  const [success, setsuccess] = useState(false);

  const validate = (name, value) => {
    let error;
    if (name === "f_name") {
      if (!value) {
        error = "Required";
      }
    }
    if (name === "l_name") {
      if (!value) {
        error = "Required";
      }
    }
    if (name === "emp_id") {
      if (!value) {
        error = "Required";
      }
    }
    if (name === "email") {
      if (!value) {
        error = "Required";
      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
        error = "Invalid Email Address";
      }
    }
    if (name === "phone") {
      if (!value) {
        error = "Required";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Invalid phone number";
      }
    }
    if (name === "dept") {
      if (!value) {
        error = "Required";
      }
    }
    if (name === "doj") {
      if (!value) {
        error = "Required";
      }
    }
    if (name === "role") {
      if (!value) {
        error = "Required";
      }
    }
    return error;
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata({ ...FormData, [name]: value });

    seterrors({
      ...errors,
      [name]: undefined,
    });
  };

  const handleblur = (e) => {
    const { name, value } = e.target;
    const error = validate(name, value);
    seterrors({ ...errors, [name]: error });
  };

  const handleregister = async (e) => {
    e.preventDefault();
    const newErrors = {};
    for (const [name, value] of Object.entries(FormData)) {
      const error = validate(name, value);
      if (error) {
        newErrors[name] = error;
      }
    }
    seterrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/adduser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),
        });
        const data = await response.json();
        if (response.ok) {
          alert("User added");
          setsuccess(true);
          setformdata({
            f_name: "",
            l_name: "",
            emp_id: "",
            email: "",
            phone: "",
            dept: "",
            doj: "",
            role: "",
          });
        } else {
          alert("USER Already exist");
          setsuccess(false);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Error in final check");
    }
  };

  return (
    <div className="d-flex bg-dark vh-100 align-items-center justify-content-center">
      <div className="bg-white p-4 w-75 border-100 rounded">
        <form onSubmit={handleregister}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="f_name">NAME</label>
              <input
                name="f_name"
                type="text"
                placeholder="Enter the Firstname"
                className={`form-control rounded-0 ${
                  errors.f_name ? "is-invalid" : ""
                }`}
                onChange={handlechange}
                onBlur={handleblur}
                value={FormData.f_name}
              />
              {errors.f_name && (
                <div className="invalid-feedback">{errors.f_name}</div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="l_name">LASTNAME</label>
              <input
                name="l_name"
                type="text"
                placeholder="Enter the lastname"
                className={`form-control rounded ${
                  errors.l_name ? "is-invalid" : ""
                }`}
                onChange={handlechange}
                onBlur={handleblur}
                value={FormData.l_name}
              />
              {errors.l_name && (
                <div className="invalid-feedback">{errors.l_name}</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="emp_id">Employee ID</label>
              <input
                name="emp_id"
                type="text"
                placeholder="Enter the Employee Id"
                className={`form-control rounded ${
                  errors.emp_id ? "is-invalid" : ""
                }`}
                onChange={handlechange}
                onBlur={handleblur}
                value={FormData.emp_id}
              />
              {errors.emp_id && (
                <div className="invalid-feedback">{errors.emp_id}</div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="text"
                placeholder="Enter the Email"
                className={`form-control rounded ${
                  errors.email ? "is-invalid" : ""
                }`}
                onChange={handlechange}
                onBlur={handleblur}
                value={FormData.email}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="phone">Phone</label>
              <input
                name="phone"
                type="tel"
                placeholder="Enter the phone number"
                className={`form-control rounded ${
                  errors.phone ? "is-invalid" : ""
                }`}
                onChange={handlechange}
                onBlur={handleblur}
                value={FormData.phone}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="dept">Department</label>
              <select
                name="dept"
                className={`form-select ${errors.dept ? "is-invalid" : ""}`}
                value={FormData.dept}
                onChange={handlechange}
                onBlur={handleblur}
              >
                <option value="">select Dept</option>
                <option value="HR">HR</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
              </select>
              {errors.dept && (
                <div className="invalid-feedback">{errors.dept}</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="doj">Date Of Joining</label>
              <input
                name="doj"
                type="date"
                className={`form-control ${errors.doj ? "is-invalid" : ""}`}
                onChange={handlechange}
                onBlur={handleblur}
                value={FormData.doj}
                max={new Date().toISOString().split("T")[0]}
              />
              {errors.doj && (
                <div className="invalid-feedback">{errors.doj}</div>
              )}
            </div>
            <div className="col-md-6">
              <label htmlFor="role">Role</label>
              <input
                name="role"
                type="text"
                placeholder="Enter the Role"
                className={`form-control rounded ${
                  errors.role ? "is-invalid" : ""
                }`}
                onChange={handlechange}
                onBlur={handleblur}
                value={FormData.role}
              />
              {errors.role && (
                <div className="invalid-feedback">{errors.role}</div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-success border w-100 rounded"
          >
            <strong>Register</strong>
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
