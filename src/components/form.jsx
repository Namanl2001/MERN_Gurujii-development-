import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Modal, Button, Form, Row, Col } from 'bootstrap-4-react';

const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class form extends Component {
  state = {
    title: '',
    userName: this.props.currentUser,
    subject: '',
    tutor: '',
    coachingName: '',
    qualification: '',
    about: '',
    c1: null,
    c2: null,
    c3: null,
    c4: null,
    address: '',
    city: '',
    pin: null,
    phone: null,
    errormessage1: 'Pincode is required!',
    errormessage2: 'Phone number is required!',
    errors: {
      title: 'Title is required!',
      userName: '',
      subject: 'Subject is required!',
      tutor: 'Tutor is required!',
      coachingName: 'Coaching name is required!',
      qualification: 'Qualification is required!',
      about: 'About is required!',
      c1: 'Class1 is required!',
      address: 'Address is required!',
      city: 'City is required!',
      pin: 'Pincode is required!',
      phone: 'Phone number is required!',
    },
  };

  handleChange = e => {
    let nam = e.target.id;
    let val = e.target.value;
    let errors = this.state.errors;
    const pinRegex = RegExp(/[1-9][0-9]{5}/);
    const phoneRegex = RegExp(/^[0-9\b]+$/);
    let err = '';
    if (nam === 'pin') {
      if (!pinRegex.test(val) || (val.length !== 6 && val !== '')) {
        err = <span style={{ color: 'red' }}>Please enter valid pincode!</span>;
        document.getElementById('pin').style.border = '1px solid red';
      } else {
        document.getElementById('pin').style.borderColor = '';
      }
      this.setState({ errormessage1: err });
    }

    if (nam === 'phone') {
      if (!phoneRegex.test(val) || (val.length !== 10 && val !== '')) {
        err = (
          <span style={{ color: 'red' }}>Please enter valid phone number!</span>
        );
        document.getElementById('phone').style.border = '1px solid red';
      } else {
        document.getElementById('phone').style.borderColor = '';
      }
      this.setState({ errormessage2: err });
    }

    switch (nam) {
      case 'title':
        errors.title = val == '' ? 'Title is required!' : '';
        break;
      case 'userName':
        errors.userName = val.length < 1 ? 'Username is required!' : '';
        break;
      case 'subject':
        errors.subject = val == '' ? 'Subject is required!' : '';
        break;
      case 'tutor':
        errors.tutor = val == '' ? 'Tutor is required!' : '';
        break;
      case 'coachingName':
        errors.coachingName =
          val.length < 1 ? 'Coaching name is required!' : '';
        break;
      case 'qualification':
        errors.qualification =
          val.length < 1 ? 'Qualification is required!' : '';
        break;
      case 'about':
        errors.about = val.length < 1 ? 'About is required!' : '';
        break;
      case 'c1':
        errors.c1 = val.length < 1 ? 'Class1 is required!' : '';
        break;
      case 'address':
        errors.address = val.length < 1 ? 'Address is required!' : '';
        break;
      case 'city':
        errors.city = val.length < 1 ? 'City is required!' : '';
        break;
      case 'pin':
        errors.pin = val.length < 1 ? 'Pin is required!' : '';
        break;
      case 'phone':
        errors.phone = val.length < 1 ? 'Phone number is required!' : '';
        break;
      default:
        break;
    }
    this.setState({ errors, [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (validateForm(this.state.errors)) {
      axios
        .post('/users/add', {
          email: this.props.emailid,
          title: this.state.title,
          userName: this.state.userName,
          subject: this.state.subject,
          tutor: this.state.tutor,
          coachingName: this.state.coachingName,
          qualification: this.state.qualification,
          about: this.state.about,
          c1: this.state.c1,
          c2: this.state.c2,
          c3: this.state.c3,
          c4: this.state.c4,
          address: this.state.address,
          city: this.state.city,
          pin: this.state.pin,
          phone: this.state.phone,
        })
        .then(response => {
          if (response.status === 200) {
            axios.get(`/users/sendMail/${this.props.emailid}/1`);
            if (
              alert(
                `Congratulations!! ${this.state.userName.toUpperCase()} Your profile added successfully to our database `
              )
            ) {
              window.location.reload();
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert('Please fill out all fields to proceed');
    }
  };

  render() {
    return (
      <div>
        <Modal.Body>
          <Form>
            <div className='formRoot'>
              <div className='form-child-left'>
                <Row>
                  <Form.LabelCol col='sm-3' htmlFor='staticEmail'>
                    Email
                  </Form.LabelCol>
                  <Col col='sm-8'>
                    <Form.PlainText value={this.props.emailid}></Form.PlainText>
                  </Col>
                </Row>
                <Row>
                  <Form.LabelCol col='sm-3' htmlFor='title'>
                    Title
                  </Form.LabelCol>
                  <Col col='sm-8'>
                    <Form.CustomSelect
                      sm
                      mb='3'
                      id='title'
                      onChange={this.handleChange}
                      value={this.state.title}
                    >
                      <option defaultValue hidden>
                        Open this to select title
                      </option>
                      <option value='Mr.'>Mr.</option>
                      <option value='Mrs.'>Mrs.</option>
                      <option value='Ms.'>Ms.</option>
                    </Form.CustomSelect>
                    <span style={{ color: 'red' }}>
                      {this.state.errors.title}
                    </span>
                  </Col>
                </Row>

                <Row>
                  <Form.LabelCol col='sm-3' htmlFor='userName'>
                    Name
                  </Form.LabelCol>
                  <Col col='sm-8'>
                    <Form.Input
                      id='userName'
                      type='text'
                      placeholder='Enter Full Name'
                      onChange={this.handleChange}
                      value={this.state.userName}
                    />
                    <span style={{ color: 'red' }}>
                      {this.state.errors.userName}
                    </span>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Form.LabelCol col='sm-3' htmlFor='subject'>
                    Subject
                  </Form.LabelCol>
                  <Col col='sm-8'>
                    <Form.CustomSelect
                      sm
                      mb='3'
                      id='subject'
                      onChange={this.handleChange}
                      value={this.state.subject}
                    >
                      <option defaultValue hidden>
                        Open this to select subject
                      </option>
                      <option value='physics'>Physics</option>
                      <option value='chemistry'>Chemistry</option>
                      <option value='mathematics'>Mathematics</option>
                    </Form.CustomSelect>
                    <span style={{ color: 'red' }}>
                      {this.state.errors.subject}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Form.LabelCol col='sm-3' htmlFor='tutor'>
                    Tutor
                  </Form.LabelCol>
                  <Col col='sm-8'>
                    <Form.CustomSelect
                      sm
                      mb='3'
                      id='tutor'
                      onChange={this.handleChange}
                      value={this.state.tutor}
                    >
                      <option defaultValue hidden>
                        Open this to select tutor type
                      </option>
                      <option value='Home Tutor'>Home Tutor</option>
                      <option value='External Tutor'>External Tutor</option>
                    </Form.CustomSelect>
                    <span style={{ color: 'red' }}>
                      {this.state.errors.tutor}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Form.LabelCol col='sm-3' htmlFor='coachingName'>
                    Coaching
                  </Form.LabelCol>
                  <Col col='sm-8'>
                    <Form.Input
                      id='coachingName'
                      type='text'
                      placeholder='Enter coaching name'
                      onChange={this.handleChange}
                      value={this.state.coachingName}
                    />
                    <span style={{ color: 'red' }}>
                      {this.state.errors.coachingName}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Form.LabelCol col='sm-3' htmlFor='qualification'>
                    Qualification
                  </Form.LabelCol>
                  <Col col='sm-8'>
                    <Form.Input
                      id='qualification'
                      type='text'
                      placeholder='Enter your Qualification'
                      onChange={this.handleChange}
                      value={this.state.qualification}
                    />
                    <span style={{ color: 'red' }}>
                      {this.state.errors.qualification}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Form.LabelCol col='sm-3' htmlFor='about'>
                    About
                  </Form.LabelCol>
                  <Col col='sm-8'>
                    <Form.Input
                      id='about'
                      type='text'
                      placeholder='Write about your teaching methodolgy'
                      onChange={this.handleChange}
                      value={this.state.about}
                    />
                    <span style={{ color: 'red' }}>
                      {this.state.errors.about}
                    </span>
                  </Col>
                </Row>
              </div>
              <div className='form-child-right'>
                <Row>
                  <Form.LabelCol col='sm-3' htmlFor='c1'>
                    Class 1
                  </Form.LabelCol>
                  <Col col='sm-3'>
                    <Form.Input
                      id='c1'
                      type='number'
                      placeholder="e.g. : '9' "
                      onChange={this.handleChange}
                      value={this.state.c1}
                    />
                    <span style={{ color: 'red' }}>{this.state.errors.c1}</span>
                  </Col>
                  <Form.LabelCol col='sm-3' htmlFor='c2'>
                    Class 2
                  </Form.LabelCol>
                  <Col col='sm-3'>
                    <Form.Input
                      id='c2'
                      type='number'
                      placeholder="e.g. : '10' "
                      onChange={this.handleChange}
                      value={this.state.c2}
                    />
                  </Col>
                </Row>

                <Row>
                  <Form.LabelCol col='sm-3' htmlFor='c3'>
                    Class 3
                  </Form.LabelCol>
                  <Col col='sm-3'>
                    <Form.Input
                      id='c3'
                      type='number'
                      placeholder="e.g. : '11' "
                      onChange={this.handleChange}
                      value={this.state.c3}
                    />
                  </Col>
                  <Form.LabelCol col='sm-3' htmlFor='c2'>
                    Class 4
                  </Form.LabelCol>
                  <Col col='sm-3'>
                    <Form.Input
                      id='c4'
                      type='number'
                      placeholder="e.g. : '12' "
                      onChange={this.handleChange}
                      value={this.state.c4}
                    />
                  </Col>
                </Row>

                <Row>
                  <Form.LabelCol col='sm-2' htmlFor='address'>
                    Address
                  </Form.LabelCol>
                  <Col col='sm-10'>
                    <Form.Input
                      id='address'
                      type='text'
                      placeholder='Enter coaching address'
                      onChange={this.handleChange}
                      value={this.state.address}
                    />
                    <span style={{ color: 'red' }}>
                      {this.state.errors.address}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Form.LabelCol col='sm-2' htmlFor='city'>
                    City
                  </Form.LabelCol>
                  <Col col='sm-10'>
                    <Form.Input
                      id='city'
                      type='text'
                      placeholder='Enter City'
                      onChange={this.handleChange}
                      value={this.state.city}
                    />
                    <span style={{ color: 'red' }}>
                      {this.state.errors.city}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Form.LabelCol col='sm-2' htmlFor='pin'>
                    Pin
                  </Form.LabelCol>
                  <Col col='sm-10'>
                    <Form.Input
                      id='pin'
                      type='number'
                      placeholder='6-digit postal-code'
                      onChange={this.handleChange}
                      value={this.state.pin}
                    />
                    <span style={{ color: 'red' }}>
                      {this.state.errormessage1}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Form.LabelCol col='sm-2' htmlFor='phone'>
                    Phone
                  </Form.LabelCol>
                  <Col col='sm-10'>
                    <Form.Input
                      id='phone'
                      type='number'
                      placeholder='10-digit number'
                      onChange={this.handleChange}
                      value={this.state.phone}
                    />
                    <span style={{ color: 'red' }}>
                      {this.state.errormessage2}
                    </span>
                  </Col>
                </Row>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button secondary data-dismiss='modal'>
            Close
          </Button>
          <Button primary onClick={this.handleSubmit} data-dismiss='modal'>
            Submit
          </Button>
        </Modal.Footer>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    emailid: state.email,
    logged: state.loggedin,
    currentUser: state.currentUser,
  };
};

const mapDispatchtoProps = dispatch => {
  return {
    email: email => dispatch({ type: 'Email', email: email }),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(form);
