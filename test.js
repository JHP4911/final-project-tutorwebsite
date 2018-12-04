//File Name: test.js - This file contains the acceptance tests for all endpoints

//Imports
let mongoose = require('mongoose'),
    ScheduleAppointment = require('./models/appointment-model'),
    chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('./server'),
    should = chai.should();

chai.use(chaiHttp);

//############ Tests For Scheduling Appointments ###########//
//Clear DB before running tests
describe('Appointments', () => {
    beforeEach((done) => {
        ScheduleAppointment.remove({}, (err) => {
           done();
        });
    });

    //Test /GET route
    describe('/GET appointments', () => {
        it('it should GET all appointments', (done) => {
          chai.request(server)
              .get('/api/appointment')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
              });
        });
    });

    //Test /GET appointment by ID route route
  describe('/GET/:appointment_id', () => {
      it('it should GET appointments by the specified id', (done) => {
          let appointment = new ScheduleAppointment({
            tutor: "Amy Willard",
            student: "John Green",
            appointmentDate: "2019-01-05T06:00:00Z",
            appointmentTime: "9:00 am",
            message: "Please help me with my bio homework!"
          });
          appointment.save((err, book) => {
              chai.request(server)
            .get('/api/appointment/' + appointment.id)
            .send(appointment)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('tutor');
                  res.body.should.have.property('student');
                  res.body.should.have.property('appointmentDate');
                  res.body.should.have.property('appointmentTime');
                  res.body.should.have.property('message');
                  res.body.should.have.property('_id').eql(appointment.id);
              done();
            });
          });
      });
  });

  //Test /POST route
  describe('/POST appointment', () => {
      it('it should POST an appointment', (done) => {
          let appointment = {
            tutor: "Amy Willard",
            student: "John Green",
            appointmentDate: "2019-01-05T06:00:00Z",
            appointmentTime: "9:00 am",
            message: "Please help me with my bio homework!"
          }
        chai.request(server)
            .post('/api/appointment')
            .send(appointment)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('tutor');
                  res.body.should.have.property('student');
                  res.body.should.have.property('appointmentDate');
                  res.body.should.have.property('appointmentTime');
                  res.body.should.have.property('message');
              done();
            });
      });
  });
  
});
