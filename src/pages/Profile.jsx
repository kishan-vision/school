import { Col, Image, Row} from "antd"
import { Fragment, useContext } from "react"
import { StateContext } from "../components/context/stateContext";
import profileImage from '../assets/images/man.jpg'

const Profile = () => {
  const { loginData } = useContext(StateContext);
  console.log(loginData, "login");
  return (
    <Fragment>
      <div className="profile-main">
        <h2 className="margin-0 margin-bottom" style={{ padding: "10px 25px 35px" }}>About Me</h2>
        <Row>
          <Col lg={5} md={8} xs={24} className="col profile-image">
            <Image
              src={profileImage}
            />
          </Col>
          <Col lg={8} md={16} xs={24}>
            <h2 className="margin-0 text-ceneter-h2">{`${loginData?.firstName} ${loginData?.lastName}`}</h2>
            <p className="profile-text">Aliquam erat volutpat. Curabiene natis massa sedde lacu stiquen sodale word moun taiery.Aliquam erat volutpaturabiene natis massa sedde sodale word moun taiery.</p>

              <Row style={{ display: "flex",paddingTop:"25px" }}>
                <Col md={8} xs={8}>
                  <p className="profile-text-card">Username:</p>
                </Col>
                <Col md={12} xs={16}>
                  <p className=" profile-text-card font-size-15 align"><strong>{loginData?.userName}</strong></p>
                </Col>
              </Row>
              <Row style={{ display: "flex"}}>
                <Col md={8} xs={8}>
                <p className="profile-text-card">Email:</p>
                </Col>
                <Col md={12} xs={16}>
                <p className="profile-text-card font-size-15 align"><strong>{loginData?.email}</strong></p>
                </Col>
              </Row>
              <Row style={{ display: "flex"}}>
                <Col md={8} xs={8}>
                <p className="profile-text-card">Phone:</p> 
                </Col>
                <Col md={12} xs={16}>
                <p className="profile-text-card font-size-15 align"><strong>{loginData?.phone}</strong></p>
                </Col>
              </Row>
              <Row style={{ display: "flex" }}>
                <Col md={8} xs={8}>
                <p className="profile-text-card">Gender:</p>
                </Col>
                <Col md={12} xs={16}>
                <p className="profile-text-card font-size-15 align"><strong>{loginData?.gender}</strong></p>
                </Col>
              </Row>
              <Row style={{ display: "flex" }}>
                <Col md={8} xs={8}>
                <p className="profile-text-card">City:</p>
                </Col>
                <Col md={12} xs={16}>
                <p className="profile-text-card font-size-15 align"><strong>{loginData?.city}</strong></p>
                </Col>
              </Row>
              <Row style={{ display: "flex" }}>
                <Col md={8} xs={8}>
                <p className="profile-text-card">LandMark:</p>
                </Col>
                <Col md={12} xs={16}>
                <p className="profile-text-card font-size-15 align"><strong>{loginData?.landMark}</strong></p>
                </Col>
              </Row>
              <Row style={{ display: "flex"}}>
                <Col md={8} xs={8}>
                <p className="profile-text-card">Address:</p>
                </Col>
                <Col md={12} xs={16}>
                <p className="profile-text-card font-size-15 align"><strong>{loginData?.address}</strong></p>
                </Col>
              </Row>
          </Col>
        </Row>
      </div>
    </Fragment>
  )
}

export default Profile