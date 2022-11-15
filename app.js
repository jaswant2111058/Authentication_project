const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
require("./connection/conn");
const login = require("./model/login");
const nodemail = require("nodemailer");
const signup = require("./model/signup");
const cookiejk = require("cookie-parser");
const auth = require("./middleware/auth");

const jwt = require("jsonwebtoken");
const key = "jassi";
const etime = 1000*15*60;
// const schema = require("./model/schema");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// signup

app.post("/signup", async (req, res) => {

    try {
        const user = new signup(req.body);
        const adnew = await user.save();
        res.status(201).send(adnew);
    } catch (e) {
        res.status(400).send(e);
    }
})

//login


app.post("/login", async (req, res) => {



    try {
        // const login = new login(req.body);
        // const lpassword = new login(req.body.password);
        const lemail = req.body.email
        const lpassword = req.body.password

        const semail = await signup.findOne({ email: lemail })

        //const spassword = await signup.find({password:lpassword})

        const pcheck = await bcrypt.compare(lpassword, semail.password)

        if (!pcheck) {

            res.status(400).json({ error: "password not match" })
        }
        else {
                const token = jwt.sign({email:semail.email,id:semail._id},key)
                 res.cookie("token", token, {
                expires: new Date(Date.now() + etime),
                  httpOnly: true})
                  console.log(token);
            res.status(201).json({
                status: 201,
                semail,
                message: "User successsfully logged in."
            })
        }
    }

    catch (e) {
        res.status(400).send(e);
    }
})



//password reset


app.post("/password/reset", async (req, res) => {

    try {
        const remail = req.body.email
        const newpswd = req.body.password
        const hspswd = bcrypt.hashSync(newpswd, 12)
        const jemail = await signup.findOne({ email: remail })
        jemail.password = hspswd;
        res.status(201).json({

            jemail,
            msg: "user logged in."
        });
    } catch (e) {
        res.status(400).send(e);
    }
})

//password reset token


app.post("/password/reset/:token", async (req, res) => {
    const email = req.body.email || req.useremail;

    try {
      let user = await signup.findOne({ email: email });
      if (!user) {
            return res.status(400).json({
          message: "user not found",
         });
      } else {
     //   //token creation
        const recovery_token = jwt.sign(
          { email: user.email, id: user._id },
          key
        );
        let transporter = nodemail.createTransport({
          service: "gmail",
          auth: {
            user: "jkstar0123@gmail.com",
            password: "98********@Jk",
          },
        });
        var detail = {
          from: "jkstar0123@gmail.com",
          to: email,
          subject: "password reset kardo yrr",
          html:
            '<p>Click <a href="ip_address:8000/password/reset/' +
            recovery_token +
            '">here</a> to reset your password</p>',
        };
        transporter.sendMail(detail, function (error, info) {
          if (error) {

            return res.status(500).json({
              error: "bhai kuchh sahi nhi chal raha life m",
            });
          } else {
        
            return res.status(201).json({
              msg: "email chala gya bhai",
            });
          }
        });
      }
    } catch (err) {
      
      res.status(500).json({
        error: "kuchh to gadbad hai daya",
      });
    }
  });

// user nickname get


app.get("/user/nickname", async (req, res) => {

    
        try {
          const user = await signup.findOne({ _id: req.userid });
          if (user) {

            res.status(201).json({
              msg: `nickname: ${user.nickname}`,
            });
          } else {
             res.status(400).json({
               msg: "koi nhi mila",
             });
          }
        } catch (e) {
            res.status(400).send(e);
        }
    });



// user nickname post


app.post("/user/nickname", async (req, res) => {

    
        const newnickname = req.body.newnickname;
        
      const nick  =  await User.updateOne({ email: req.useremail }, { nickname: newnickname })
        
    
        res.status(201).json({
          msg: `nickname changed to ${newnickname}`,
            nick
        });
      
      
})

// admin delete email


app.get("/admin/delete/:email", async (req, res) => {
    try {
       const admin = await signup.findOne({ _id: req.userid });
        const user = await signup.findOne({ email: req.params.email });
        if (user) {
        
          if (admin.role === "admin") {
            
             const delte = await signup.deleteOne({ email: req.params.email })
            
             res.status(201).json({ message: "User Deleted",
                                        delete:delte });
          } else {
         res.status(400).json({ msg: "Not Authorized " });
          }
        }
      } catch (err) {
     res.status(500).json({ error: "error" });
      }
    });


// admin make admin email


app.get("/admin/make_admin/:email", async (req, res) => {


        const uemail = req.params.email;
        const user = await signup.findOne({ email: uemail });
        const admin = await signup.findOne({ _id: req.userid });
        if (admin.role === "admin") {
          if (user) 
        
            var role = await signup.updateOne({ email: uemail }, { role: "admin" })
               res.status(201).json({ msg: "User is change for admin's role",
                        role:role.role });
          } else {
            
                 res.status(400).json({ error: "User not found" });
          }
        }
        
      );
          


app.get("/registration", async (req, res) => {

    try {
        const user = new student(req.body);
        const adnew = await user.save();
        res.status(201).send(adnew);
    } catch (e) {
        res.status(400).send(e);
    }
})
app.listen(8000, function () {
    console.log("Server is up");
})