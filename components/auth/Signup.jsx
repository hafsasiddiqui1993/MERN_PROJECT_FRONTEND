import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet";
import { useState } from "react";
import myurl from "../../public/routes"

function Signup() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const [member, setmember] = useState({
    m_fullname: "",
    m_add: "",
    m_ph: "",
    m_email: "",
    m_pass: "",
  });

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormErrors = () => {
    const { m_fullname, m_add, m_ph, m_email, m_pass } = member;

    const newErrors = {};
    if (!m_fullname || m_fullname === "") newErrors.m_fullname = "Enter your Name!";

    if (!m_add || m_add === "") newErrors.m_add = "Enter your Address!";

    if (!m_ph || m_ph === "" || m_ph.length === 11)
      newErrors.m_ph =
        "Enter your Phone, Phone Number Should be valid, 11 digits";

    if (
      !m_email ||
      m_email === "" ||
      m_email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)
    )
      newErrors.m_email = "Enter your valid Email";
    if (!m_pass || m_pass === "" || m_pass.match(/^[a-zA-Z]{8,22}$/))
      newErrors.m_pass = "Password length must best Max 8 Chracters or digits";

    return newErrors;
  };

  const HandleInputChange = async (e) => {
    console.log(e.target.value);

    let value = e.target.value;

    setmember({ ...member, [e.target.name]: value });
  };

  const MemberData = async (e) => {
    e.preventDefault();
    const ClientErrors = findFormErrors();

   if (Object.keys(ClientErrors).length > 0) {
    setErrors(ClientErrors);
    return
   }

    const { m_fullname, m_add, m_ph, m_email, m_pass } = member;

    try {
      const res = await fetch(myurl+"api/member/register", {
  
      method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          m_fullname,
          m_add,
          m_ph,
          m_email,
          m_pass,
        }),
      });

      const data = await res.json();
      console.log(data);

      // debugger
      if (data.errors) {
        //We got errors!
        
        data.errors.map((error) => alert(error.msg));
        
      } else {
        alert("user registered");
      }
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <>
    <Helmet>
  <title>Exercise Tracker</title>
  <meta name="description" content='Bootstrap React JS, Signup'>
  </meta>
</Helmet>
      <Form className="actvty-frmsignup" style={{ height: '41em !important' }} onChange={(e) => HandleInputChange(e)}>
        <Form.Group className="lblactvty">
          <Form.Label>Enter Full Name</Form.Label>
          <Form.Control
            className="lblsignup"
            required
            id="m_fullname"
            name="m_fullname"
            type="text"
            placeholder="Enter Full Name"
            onChange={(e) => setField("name", e.target.value)}
            isInvalid={!!errors.m_fullname}
          />

          <Form.Control.Feedback type="invalid">
            {errors.m_fullname}     

          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="lblactvty">
          <Form.Label>Enter Address</Form.Label>
          <Form.Control
            className="lblsignup"
            required
            id="m_add"
            name="m_add"
            type="text"
            placeholder="Enter Address"
            onChange={(e) => setField("add", e.target.value)}
            isInvalid={!!errors.m_add}
          />

          <Form.Control.Feedback type="invalid">
            {errors.m_add}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="lblactvty">
          <Form.Label>Enter Phone</Form.Label>
          <Form.Control
            className="lblsignup"
            required
            id="m_ph"
            name="m_ph"
            type="text"
            placeholder="Enter Phone"
            onChange={(e) => setField("ph", e.target.value)}
            isInvalid={!!errors.m_ph}
          />

          <Form.Control.Feedback type="invalid">
            {errors.m_ph}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="lblactvty">
          <Form.Label>Enter Email</Form.Label>
          <Form.Control
            className="lblsignup"
            required
            id="m_email"
            name="m_email"
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setField("email", e.target.value)}
            isInvalid={!!errors.m_email}
          />

          <Form.Control.Feedback type="invalid">
            {errors.m_email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="lblactvty">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            className="lblsignup"
            id="m_pass"
            name="m_pass"
            type="password"
            required
            placeholder="Enter Password"
            onChange={(e) => setField("pass", e.target.value)}
            isInvalid={!!errors.m_pass}
          />
          <Form.Control.Feedback type="invalid">
            {errors.m_pass}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          className="actvty-btn"
          onClick={MemberData}
          value="Signup"
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Signup;
