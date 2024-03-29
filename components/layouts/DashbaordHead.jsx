import React from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Card, Navbar, Accordion, Figure } from "react-bootstrap";
import OffCanvas from "./OffCanvas";
import EditMemberModal from "./EditMemberModal";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import myurl from "../../public/routes"
function DashboardHead() {
  const [memberReg, setmemberReg] = useState([]);
  //  const { id } = useParams();

  React.useEffect(() => {
    getData();
  }, []);

  async function getData() {
    console.log(1);
    const res = await fetch(myurl+"api/member/registers", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Tokenization: localStorage.getItem("Token"),
      },
    });
    // console.log(res)
    const data = await res.json();
    // console.log(data)
    setmemberReg(data);
  }
  async function updateItem(id) {
    console.log(id);
    const updateItems = await fetch(
      myurl+"api/member/member/editprofile/" + id,
      {
        method: "PUT",
        headers: {
          Tokenization: localStorage.getItem("Token"),
        },
      }
    );

    const res = await fetch(myurl+"api/member/registers", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Tokenization: localStorage.getItem("Token"),
      },
    });
    const data = await updateItems.json();

    console.log(res);
    setmemberReg(data);
  }

  return (
    <>
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
          <OffCanvas />
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <>
              <div className="dashhead">
                <Link className="dashnav" to="/EditMemberModal/id">
                  Edit Profile
                </Link>
                <Link
                  className="dashnav1"
                  onClick={() => {
                    window.localStorage.clear("Token");
                    window.location.replace("/");
                  }}
                >
                  Logout
                </Link>
              </div>
            </>

            <Outlet />
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="dashcon">
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row>
          <Col xs={16} md={4}>
            {/* <Card className="crddash1"> */}
            <Card.Img
              className="imgdv"
              variant="top"
              src="https://images.medicinenet.com/images/article/main_image/what-should-my-heart-rate-be.jpg"
            />

            {/* </Card> */}
          </Col>
          <Col className="colcrd01" xs={12} md={8}>
            <Card className="crddash1" style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src="https://scied.ucar.edu/sites/default/files/media/images/weather_0.jpg"
              />
              <Card.Body className="crdbdy01">
                <Card.Text className="crdbd1">
                  Welcome, to your, <br></br> Dashboard!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <Accordion defaultActiveKey={["0"]} alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Exercise Activities</Accordion.Header>
                <Accordion.Body>
                  Your daily counter! Track the activities which you like to
                  adopt, follow the activity more than one, track each day,
                  hour. Make the possible ways to track n see your progress!
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col xs={6}>
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src="https://i.pcmag.com/imagery/roundups/0634CGyLGOHgKlIbVidl2zZ-38..v1665161097.jpg"
              />
            </Figure>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashboardHead;
