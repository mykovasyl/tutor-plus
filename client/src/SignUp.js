import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

function SignUp() {
  const [error, setError] = useState([]);
  const [signupForm, setSignupForm] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    type: "",
    name: "",
    subjects: "",
    grade: "",
    headline: "",
    email: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupForm),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then(navigate("/login"));
      } else {
        resp.json().then((err) => setError(err.errors));
      }
    });
  }

  function handleInputChange(e) {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  }

  function handleOptionChange(e) {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <Container
        style={{
          marginTop: "24px",
          padding: "20px",
          border: ".5px solid grey",
          borderRadius: "8px",
          width: "75%",
        }}
      >
        <h2>Join our growing family of tutors and students!</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                name="username"
                type="username"
                value={signupForm.username}
                onChange={handleInputChange}
              />
            </Col>
            <Col>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="name@example.com"
                value={signupForm.email}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={signupForm.password}
                onChange={handleInputChange}
              />
              <Form.Text muted>
                Your password must be 8-20 characters long, contain letters and
                numbers, and must not contain spaces, special characters, or
                emoji.
              </Form.Text>
            </Col>
            <Col>
              <Form.Label>Confirm password:</Form.Label>
              <Form.Control
                name="password_confirmation"
                type="password"
                value={signupForm.password_confirmation}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <p>
            Are you signing up as a tutor or student?
            <br />
            <Form.Check
              inline
              label="Student"
              name="type"
              value="Student"
              type="radio"
              checked={signupForm.type === "Student"}
              onChange={handleOptionChange}
            />
            <Form.Check
              inline
              label="Tutor"
              name="type"
              value="Tutor"
              type="radio"
              checked={signupForm.type === "Tutor"}
              onChange={handleOptionChange}
            />
          </p>
          {/* tutor or student signup options */}
          {signupForm.type === "Tutor" ? (
            <>
              <Row>
                <Col>
                  <Form.Label>Full name:</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    value={signupForm.name}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col>
                  <Form.Label>Subjects:</Form.Label>
                  <Form.Control
                    name="subjects"
                    type="text"
                    value={signupForm.subjects}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col>
                  <Form.Label>Headline:</Form.Label>
                  <Form.Control
                    name="headline"
                    type="text"
                    value={signupForm.headline}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
            </>
          ) : signupForm.type === "Student" ? (
            <>
              <Row>
                <Col>
                  <Form.Label>Full name:</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    value={signupForm.name}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col>
                  <Form.Label>Grade:</Form.Label>
                  <Form.Control
                    name="grade"
                    type="text"
                    value={signupForm.grade}
                    onChange={handleInputChange}
                  />
                </Col>
              </Row>
            </>
          ) : null}
          <br />
          <Button type="submit" variant="success">
            Sign up!
          </Button>
          {error.map((err) => {
            return <h4>{err}</h4>;
          })}
        </Form>
      </Container>
    </div>
  );
}

export default SignUp;
