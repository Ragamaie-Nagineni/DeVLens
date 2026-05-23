import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AuthForm({ fields, buttonText }) {

  const [formdata, setformdata] = useState({});
  const navigate = useNavigate();

  function handleChange(e) {
    setformdata({
      ...formdata, [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const endpt = buttonText === "Login" ? "http://localhost:3000/api/auth/login" : "http://localhost:3000/api/auth/register";
      const response = await fetch(endpt,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formdata)
        }
      )
      const data = await response.json();
      if (!response.ok) { alert(data.message); return; }
      if (data.token) { localStorage.setItem("token", data.token); }
      alert(buttonText + " successful");
      navigate("/sidebar");
    } catch (err) {

      console.error(err);

      alert("Something went wrong");
    }

  }

  return (
    <form className="form" onSubmit={handleSubmit}>

      {fields.map((field, index) => (
        <input
          key={index}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          onChange={handleChange}
          required
        />
      ))}

      <button type="submit">
        {buttonText}
      </button>

    </form>
  );
}

export default AuthForm;