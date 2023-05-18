// Run this script to launch the server.
// The server should run on localhost port 8000.
// This is where you should start writing server-side code for this application.
const mongoose = require("mongoose");
const Questions = require("./models/questions");
const Tags = require("./models/tags");
const Answers = require("./models/answers");
const Users = require("./models/users");
const Comments = require("./models/comments");
const express = require("express");
const async = require("async");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const app = express();
const saltRounds = 10;
const port = 8000;

let db = mongoose.connection;
var cors = require("cors");
var userpage = new Map();
const session = require("express-session");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());
app.use(
  session({
    secret: "supersecret difficult to guess string",
    cookie: {
      expires: 60 * 60 * 24 * 1000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
mongoose
  .connect("mongodb://127.0.0.1:27017/fake_so", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connect success");
  });
async function loadQuestions(req, res) {
  const Question = await Questions.find({}).populate("tags");
  req.session.page = req.body.page;
  res.send(Question.reverse());
}

app.post("/loadQuestions", loadQuestions);
app.post("/addQuestion", async (req, res) => {
  var question = req.body;
  var tagarray = [];
  var tagFound;
  var newtag;
  for (let tag of question.tags) {
    tagFound = await Tags.findOne({ name: tag });
    if (tagFound == null) {
      newtag = await Tags.create({
        name: tag,
        creator_id: question.askedBy._id,
      });
    } else {
      newtag = tagFound;
    }
    tagarray.unshift(newtag);
  }
  try {
    if (question.edit) {
      try {
        var newquestion = await Questions.findByIdAndUpdate(
          {
            _id: question.item._id,
          },
          {
            $set: {
              text: question.text,
              title: question.title,
              summary: question.summary,
              tags: tagarray,
            },
          },
          { returnDocument: "after" }
        );
      } catch (err) {
        if (err) throw err;
      }
    } else {
      var newquestion = await Questions.create({
        text: question.text,
        title: question.title,
        summary: question.summary,
        tags: tagarray,
        answers: undefined,
        asked_by: question.askedBy.username,
        creator_id: question.askedBy._id,
        askedAt: new Date(),
        views: 0,
        votemap: undefined,
      });
    }
    const Question = await Questions.find({}).populate("tags");
    res.send(Question.reverse());
  } catch (error) {
    console.log(error.message);
  }
});
app.post("/updateView", async (req, res) => {
  req.session.page = "AnswerPage";
  const item = req.body;
  const updateItem = await Questions.findOneAndUpdate(
    { _id: item._id },
    { $inc: { views: 1 } },
    { returnDocument: "after" }
  )
    .populate("answers")
    .populate("tags")
    .populate("comments");
  for (let ans of updateItem.answers) {
    await ans.populate("comments");
  }
  req.session.ansdata = updateItem;
  res.send(updateItem);
});
app.post("/addAnswer", async (req, res) => {
  var question = req.body.question;
  var answer = req.body.answer;
  var id = req.body.id;
  var newanswer = await Answers.create({
    text: answer.text,
    ans_by: answer.ansBy,
    ans_date_time: new Date(),
    comments: undefined,
    creator_id: id,
  });
  await Questions.findOneAndUpdate(
    { _id: question._id },

    { $push: { answers: { $each: [newanswer], $position: 0 } } },
    { returnDocument: "after" }
  );
  res.sendStatus(200);
});
app.post("/signup", async (req, res) => {
  var userinfo = req.body;
  existingemail = await Users.find({ email: userinfo.email });
  if (existingemail.length != 0) {
    res.send("false");
  } else {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(userinfo.password, salt, async function (err, hash) {
        var newuser = await Users.create({
          username: userinfo.username,
          email: userinfo.email,
          password: hash,
          create_time: new Date(),
          reputattion: 0,
          questions: undefined,
          tags: undefined,
          answers: undefined,
        });
        res.cookie(userinfo.email, { httpOnly: true });
        req.session.userinfo = newuser;
        res.send(newuser);
      });
    });
  }
});
app.post("/login", async (req, res) => {
  const userinfo = req.body;
  var user = await Users.find({ email: userinfo.email });
  if (user.length === 0) {
    res.json("false");
  } else {
    hash = user[0].password;
    bcrypt.compare(userinfo.password, hash, async function (err, result) {
      if (err) {
        throw err;
      }
      if (result) {
        res.cookie(userinfo.email, { httpOnly: true });
        req.session.userinfo = user[0];
        if (req.session.userpage === undefined) {
          req.session.userpage = userpage;
        }
       
        //  for( let cookie in req.cookies){
        //   console.log(cookie)
        //  }
        res.send(user[0]);
      } else {
        res.json("false");
      }
    });
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.get("/islogged", async (req, res) => {
  res.send(req.session);
});
process.on("SIGINT", async () => {
  await db
    .close()
    .then(() => {
      console.log("Server closed. Database instance disconnected");
      process.exit(0);
    })
    .catch((err) => console.log(err));
});
app.post("/loadUserQuestion", async (req, res) => {
  req.session.page = "UserQuestion";
  res.send(await Questions.find({ creator_id: req.body._id }).populate("tags"));
});
app.post("/loadUserAnswer", async (req, res) => {
  req.session.page = "UserAnswer";

  res.send(
    await Answers.find({ creator_id: req.body._id }).populate("comments")
  );
});
app.post("/Qupvote", async (req, res) => {
  var item = req.body;
  var creator_id = item.creator_id;
  var counter = item.counter;
  var userid = item.userid;
  var rep;
  var q;

  if (item.qsearch) {
    var q = await Questions.findById({ _id: item.qid });
    var map = q.votemap;
    var value = map.get(userid);

    if (value == counter) {
      res.json(q.votes);
      return;
    }
    if (value == undefined) {
      value = 0;
    }
    if (counter == 1) {
      rep = value == 0 ? 5 : 10;
    } else {
      rep = value == 0 ? -10 : -5;
    }
    map.set(userid, value + counter);

    await Questions.findByIdAndUpdate(
      { _id: item.qid },
      { votemap: map },
      { returnDocument: "after" }
    );
    q = await Questions.findByIdAndUpdate(
      { _id: item.qid },
      { $inc: { votes: counter } },
      { returnDocument: "after" }
    );
  } else {
    var q = await Answers.findById({ _id: item.qid });
    var map = q.votemap;
    var value = map.get(userid);
    if (value == counter) {
      res.json(q.votes);
      return;
    }
    if (value == undefined) {
      value = 0;
    }
    if (counter == 1) {
      rep = value == 0 ? 5 : 10;
    } else {
      rep = value == 0 ? -10 : -5;
    }

    map.set(userid, value + counter);
    await Answers.findByIdAndUpdate(
      { _id: item.qid },
      { votemap: map },
      { returnDocument: "after" }
    );
    q = await Answers.findByIdAndUpdate(
      { _id: item.qid },
      { $inc: { votes: counter } },
      { returnDocument: "after" }
    );
    //  var b= await Answers.findByIdAndUpdate(
    //     { _id: item.qid },
    //    {$set:{
    //     votemap: map,
    //     $inc: { votes: counter }
    //    }},

    //     { returnDocument: "after" }
    //   );
  }
  var s = await Users.findByIdAndUpdate(
    { _id: creator_id },
    { $inc: { reputation: rep } },
    { returnDocument: "after" }
  );

  res.json(q.votes);
});
app.post("/addComment", async (req, res) => {
  var item = req.body;
  var userinfo = item.userinfo;
  var newcomment = await Comments.create({
    text: item.comment,
    asked_by: userinfo.username,
    create_time: new Date(),
  });
  if (item.qadd) {
    res.send(
      await Questions.findByIdAndUpdate(
        { _id: item.id },
        { $push: { comments: { $each: [newcomment], $position: 0 } } },
        { returnDocument: "after" }
      ).populate("comments")
    );
  } else {
    res.send(
      await Answers.findByIdAndUpdate(
        { _id: item.id },
        { $push: { comments: { $each: [newcomment], $position: 0 } } },
        { returnDocument: "after" }
      ).populate("comments")
    );
  }
});
app.post("/deleteQuestion", async (req, res) => {
  try {
    await Questions.findById(
      { _id: req.body.item._id },
      async function (err, question) {
        questiondelete(question);
        await question.deleteOne();
        res.sendStatus(200);
      }
    );
  } catch (error) {}
});
async function questiondelete(question) {
  // if (question.tags != undefined) {
  //   await Tags.deleteMany({
  //     _id: {
  //       $in: question.tags,
  //     },
  //   });
  // }
  if (question.answers != null) {
    await Answers.deleteMany({
      _id: {
        $in: question.answers,
      },
    });
  }
  if (question.comments != null) {
    await Comments.deleteMany({
      _id: {
        $in: question.comments,
      },
    });
  }
}
app.post("/editAnswer", async (req, res) => {
  var aid = req.body.aid;
  try {
    await Answers.findByIdAndUpdate(
      { _id: aid },
      {
        $set: {
          text: req.body.answer.text,
        },
      },
      { returnDocument: "after" }
    );
  } catch (error) {
    if (error) throw error;
  }
  res.sendStatus(200);
});
app.post("/deleteAnswer", async (req, res) => {
  try {
    var answer = await Answers.findById({
      _id: req.body._id,
    });
    answerdelete(answer);
    await answer.deleteOne();
    res.sendStatus(200);
    // });
  } catch (error) {
    if (error) throw error;
  }
});
async function answerdelete(answer) {
  if (answer.comments != null) {
    await Comments.deleteMany({
      _id: {
        $in: answer.comments,
      },
    });
  }
}
app.post("/tagEdit", async (req, res) => {
  var creator_id = req.body.userinfo._id;
  var newtag = req.body.new;
  var oldtag = req.body.old;
  if (newtag == undefined) {
    await Tags.deleteMany({
      $and: [{ creator_id: creator_id }, { name: oldtag }],
    });
  } else {
    await Tags.updateMany(
      { $and: [{ creator_id: creator_id }, { name: oldtag }] },
      {
        $set: {
          name: newtag,
        },
      },
      { returnDocument: "after" }
    );
  }
  res.sendStatus(200);
});
app.post("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.sendStatus(200);
  });
});
app.get("/guestLogin", async (req, res) => {
  res.cookie("guest", { httpOnly: true });
  // req.session.page = "questionPage";
  res.sendStatus(200);
});
app.get("/reloadAnswerPage", async (req, res) => {
  req.session.page = "AnswerPage";
  res.send(req.session.ansdata);
});
app.post("/loadNewUserInfo", async (req, res) => {
  res.send(await Users.findById({ _id: req.body._id }));
});
app.post("/reloadForm", async (req, res) => {
  req.session.page = "Form";

  res.sendStatus(200);
});
