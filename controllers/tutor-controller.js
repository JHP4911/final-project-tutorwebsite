//File Name: tutor-controller.js - This file contains the functions for the tutor routes

//Imports
TutorView = require('../models/tutor-model');

// ############## HTML ROUTE FUNCTIONS #####################
//Function to display tutor-profile-form
exports.newtutor = function (req, res){
  res.render('tutor-profile-form', {title:"New Tutor Profile", username: req.flash('username'), tutor:{}});
};

//Function to display tutor-profile-form
exports.updatetutorprofile = function (req, res){
  TutorView.findOne({ username: req.params.username })
  .exec(function (err, tutor) {
    if (err) {
      res.render('error', {message: err});
    } else if (!tutor) {
      res.render('error', {message: "No tutor found!"});
    } else {

      res.render('tutor-profile-form', {title:"Update Tutor Profile", username: req.params.username, tutor: tutor});
    }
  });
};

//Function to update tutor to database
exports.postupdatetutor = function (req, res) {
  TutorView.findOne({ username: req.params.username })
  .exec(function (err, tutor) {
    if (err) {
      res.render('error', {message: err});
    } else if (!tutor) {
      res.render('error', {message: "No tutor found!"});
    } else {
      tutor.first = req.body.first;
      tutor.last = req.body.last;
      tutor.username = req.body.username;
      tutor.location = req.body.location;
      tutor.grade = req.body.grade;
      tutor.subject = req.body.subject;
      tutor.availability = req.body.availability;

      tutor.save(function (err, tutor) {
        if (err) {
          res.render('error', {message: err});
        } else {
          req.flash('message', 'Profile updated! Find students below.');
          req.flash('username', tutor.username);
          res.redirect('/student/view');
        }
      });
    }
  });
};

//Function to display page with list of all tutors
exports.alltutors = function (req, res){
  TutorView.get(function (err, tutor) {
    if (err) {
      res.render('error', {message: "Uh oh! No tutors were retrieved."});
    } else {
      res.render('main-tutor-view', {title:"Find Tutors", message: req.flash('message'), username: req.flash('username'), tutors:tutor});
    }
  });
};

//Function to handle index
exports.tutorindex = function (req, res) {
  TutorView.get(function (err, tutor) {
    if (err) {
      res.render('error', {message: "Oops! No tutor was found."});
    } else {
      res.render('tutor-detail', {tutors: tutor});
    }
  });
};

//Function to get tutor by ID and display on tutor-detail page
exports.viewtutor = function (req, res) {
  TutorView.findOne({ username: req.params.username })
  .exec(function (err, tutor) {
    if (err) {
      res.render('error', {message: err});
    } else if (!tutor) {
      res.render('error', {message: "No tutor found!"});
    } else {
      res.render('tutor-detail', {username: req.flash('username'), tutor: tutor});
    }
  });
};

//Function to submit ratings
exports.submitrating = function (req, res) {
  TutorView.findOne({ username: req.params.username })
  .exec(function (err, tutor) {
    if (err) {
      res.render('error', {message: err});
    } else if (!tutor) {
      res.render('error', {message: "No tutor found!"});
    } else {
      tutor.rating = req.body.rating;

      tutor.save(function (err) {
        if (err) {
          res.render('error', {message: "Sorry, tutor not found!"});
        } else {
          res.render('tutor-detail', {username: tutor.username, tutor: tutor})
        }
      });
    }
  });
};

//Function to get tutor by username and display on view profile
exports.viewtutorprofile = function (req, res) {
  TutorView.findOne({ username: req.params.username })
  .exec(function (err, tutor) {
    if (err) {
      res.render('error', {message: err});
    } else if (!tutor) {
      res.render('error', {message: "No tutor found!"});
    } else {
      res.render('tutor-profile', {username: req.flash('username'), tutor: tutor});
    }
  });
};

//Function to delete tutor profile
exports.removetutorprofile = function (req, res) {
    TutorView.remove({username: req.params.username},
      function (profile) {
          console.log("Delete profile clicked!")
    });
    Register.remove({username: req.params.username},
      function (registration) {
          req.flash('message', "Profile deleted!");
          res.redirect("/../../login")
    });
};

//Function to add new tutor to database
exports.addtutor = function (req, res) {
    var tutorView = new TutorView();
    tutorView.first = req.body.first
    tutorView.last = req.body.last
    tutorView.username = req.body.username
    tutorView.location = req.body.location;
    tutorView.grade = req.body.grade;
    tutorView.subject = req.body.subject;
    tutorView.availability = req.body.availability;

    tutorView.save(function (err, tutorView) {
      if (err) {
        res.render('error', {message: err});
      } else {
        req.flash('message', 'Profile created! Find students below.');
        req.flash('username', tutorView.username);
        res.redirect('/student/view');
      }
    });
};

//Function to filter by subjects
exports.filtertutorsubject = function (req, res) {
  TutorView.find({ subject: req.params.tutor_subject })
  .exec(function (err, tutor) {
    if (err) {
      res.render('error', {message: err});
    } else if (!tutor) {
      res.render('error', {message: "No tutors found for this subject found!"});
    } else {
      res.render('main-tutor-view', {title:"Find Tutors", message: req.flash('message'), tutors:tutor})
    }
  });
};

// ############## API ROUTE FUNCTIONS #####################
//Function to handle index
exports.index = function (req, res) {
    TutorView.get(function (err, tutorView) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send(tutorView);
      }
    });
};

//Function to get tutor view by ID
exports.view = function (req, res) {
    TutorView.findById(req.params.tutor_id, function (err, tutorView) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send(tutorView);
      }
    });
};

//Function to add tutor
exports.new = function (req, res) {
    var tutorView = new TutorView();
    tutorView.name = req.body.name;
    tutorView.location = req.body.location;
    tutorView.grade = req.body.grade;
    tutorView.subject = req.body.subject;
    tutorView.availability = req.body.availability;

    tutorView.save(function (err, tutorView) {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send(tutorView);
      }
    });
};

//Function to update tutor view by ID
exports.update = function (req, res) {
  TutorView.findById(req.params.tutor_id, function (err, tutorView) {
    if (err) {
      res.send(err);
    } else {
      tutorView.name = req.body.name;
      tutorView.location = req.body.location;
      tutorView.grade = req.body.grade;
      tutorView.subject = req.body.subject;
      tutorView.availability = req.body.availability;

      tutorView.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.status(204).send();
        }
      });
    }
  });
};

//Function to delete tutor view by ID
exports.delete = function (req, res) {
    TutorView.remove({_id: req.params.tutor_id},
      function (tutorView) {
        res.status(204).send();
    });
};
