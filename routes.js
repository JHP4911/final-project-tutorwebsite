//File Name: appointment-routes.js - this file contains API endpoints

//Imports
let express = require('express'),
    app = express();
let router = require('express').Router();
var appointmentController = require('./controllers/appointment-controller');
var studentviewController = require('./controllers/student-controller');
var tutorviewController = require('./controllers/tutor-controller');
var registerController = require('./controllers/register-controller');

//Default API response
router.get('/', function (req, res) {
    res.render('index');
});

//view appointments routes
router.route('/student/view/viewstudentappointment/:student_id')
    .get(appointmentController.viewstudentappointment)
router.route('/tutor/view/viewtutorappointment/:tutor_id')
    .get(appointmentController.viewtutorappointment)

//apppointment routes
router.route('/appointment/new/student/:student_id')
    .get(appointmentController.newstudentappointment)
    .post(appointmentController.addstudentappointment)

router.route('/appointment/new/tutor/:tutor_id')
    .get(appointmentController.newtutorappointment)
    .post(appointmentController.addtutorappointment)

router.route('/appointments/view/student/:student_id')
    .get(appointmentController.viewstudentappointment)

router.route('/appointments/view/tutor/:tutor_id')
    .get(appointmentController.viewtutorappointment)

//tutor routes
router.route('/tutor/new/')
    .get(tutorviewController.newtutor)
    .post(tutorviewController.addtutor)

router.route('/tutor/view')
    .get(tutorviewController.alltutors)

router.route('/tutor/view/:tutor_id')
    .get(tutorviewController.viewtutor)

//student routes
router.route('/student/new/')
    .get(studentviewController.newstudent)
    .post(studentviewController.addstudent)

router.route('/student/view')
    .get(studentviewController.allstudents)

router.route('/student/view/:student_id')
    .get(studentviewController.viewstudent)

router.route('/student/view/studentdetails/:student_id')
    .get(studentviewController.viewstudent)

//login routes
router.route('/login')
    .get(registerController.viewlogin)
    .post(registerController.login)

//register routes
router.route('/register')
    .get(registerController.viewregister)
    .post(registerController.adduser)

//appointment API routes
router.route('/api/appointment')
    .get(appointmentController.index)
    .post(appointmentController.new);

router.route('/api/appointment/:appointment_id')
    .get(appointmentController.view)
    .put(appointmentController.update)
    .delete(appointmentController.delete);

router.route('/api/tutor/view/viewtutorappointment/:tutor_id')
    .get(appointmentController.view)

router.route('/api/student/view/viewstudentappointment/:student_id')
    .get(appointmentController.view)

//student API routes
router.route('/api/student')
	.get(studentviewController.index)
	.post(studentviewController.new);

router.route('/api/student/:student_id')
	.get(studentviewController.view)
  .put(studentviewController.update)
  .delete(studentviewController.delete);

router.route('/api/student/view/studentdetails')
	.get(studentviewController.view)

//tutor view API routes
router.route('/api/tutor')
	.get(tutorviewController.index)
	.post(tutorviewController.new);

router.route('/api/tutor/:tutor_id')
	.get(tutorviewController.view)
  .put(tutorviewController.update)
  .delete(tutorviewController.delete);

router.route('/api/tutor/view/tutordetails')
        .get(tutorviewController.view)

//Export module
module.exports = router;
