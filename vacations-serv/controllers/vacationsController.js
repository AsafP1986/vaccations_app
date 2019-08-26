const connect = require("../services/mysql");

class vacController {
  static async getAllVac(req, res) {
    // let isloggedIn = req.session.user ? true : false;
    // let userName = req.session.user ? req.session.user.username : "no user";
    // console.log("isloggedIn :", isloggedIn);
    // console.log("userName :", userName);

    await connect.query(
      `SELECT * FROM vacationsApp.followers 
    join vacationsApp.users on (users.user_id = followers.user_id)
    right outer join vacationsApp.vacations on (vacations.vacation_id = followers.vacation_id) `,
      function(err, rows, fields) {
        if (err) throw err;
        console.log("rows: ", rows);
        // console.log("req.session from getposts :", req.session);
        res.send(rows);
      }
    );
  }
  static async getSingleVac(req, res) {
    // let isloggedIn = req.session.user ? true : false;
    // let userName = req.session.user ? req.session.user.username : "no user";
    // console.log("isloggedIn :", isloggedIn);
    // console.log("userName :", userName);
    // console.log("req.parmas.id :", req.params.id);
    let id = req.params.id ? req.params.id : "no id";
    console.log("id", id);
    await connect.query(
      `SELECT * FROM vacationsApp.vacations where vacation_id=${id}`,
      function(err, rows, fields) {
        if (err) throw err;
        console.log("rows: ", rows);
        if (rows.length == 0) {
          res.send("no such user");
        }
        res.send(rows[0]);
      }
    );
  }
  static async deleteVac(req, res) {
    console.log("req.parmas.id :", req.params.id);
    await connect.query(
      `DELETE FROM vacations WHERE vacation_id=${req.params.id}`,
      function(err, rows, fields) {
        if (err) throw err;

        console.log("rows: ", !rows.length);
        res.send("vac deleted");
      }
    );
    await connect.query(
      `DELETE FROM followers WHERE vacation_id=${req.params.id}`,
      function(err, rows, fields) {
        if (err) throw err;

        console.log("rows: ", !rows.length);
        res.send("all followers deleted");
      }
    );
  }

  static async AddVac(req, res) {
    let userId = req.session.user ? req.session.user.id : "no user";
    const {
      description,
      destination,
      image,
      from_date,
      to_date,
      price
    } = req.body;
    await connect.query(
      `INSERT INTO vacations (description , destination ,image , from_date , to_date, price) VALUES ("${description}" ,"${destination}","${image}","${from_date}","${to_date}","${price}")`,
      function(err, rows, fields) {
        if (err) throw err;
        console.log("!rows.length: ", !rows.length);
        console.log("rows :", rows);
        res.json(rows);
      }
    );
  }

  static async updateVac(req, res) {
    const vacation_id = req.params.id;
    const {
      description,
      destination,
      image,
      from_date,
      to_date,
      price
    } = req.body;

    await connect.query(
      `UPDATE vacations SET description="${description}" , destination="${destination}" ,image="${image}" , from_date="${from_date}" , to_date="${to_date}", price="${price}") WHERE vacation_id=${vacation_id}`,
      function(err, rows, fields) {
        if (err) throw err;
        console.log("rows :", rows);
        res.json(rows);
      }
    );
  }
  static async follow(req, res) {
    const vacation_id = req.params.id;

    await connect.query(
      `UPDATE vacations SET followers=followers+1  WHERE vacation_id=${vacation_id}`,
      function(err, rows, fields) {
        if (err) throw err;
        console.log("rows :", rows);
        res.json(rows);
      }
    );
  }
  static async unfollow(req, res) {
    const vacation_id = req.params.id;

    await connect.query(
      `UPDATE vacations SET followers=followers-1  WHERE vacation_id=${vacation_id}`,
      function(err, rows, fields) {
        if (err) throw err;
        console.log("rows :", rows);
        res.json(rows);
      }
    );
  }
}

module.exports = vacController;

// static async getEditPostPage(req, res) {
//     let isloggedIn = req.session.user ? true : false;
//     let userName = req.session.user ? req.session.user.username : "no user";
//     console.log("isloggedIn :", isloggedIn);
//     console.log("userName :", userName);
//     console.log("req.parmas.id :", req.params.id);
//     await connect.query(
//       `SELECT * FROM posts WHERE id=${req.params.id}`,
//       function(err, rows, fields) {
//         if (err) throw err;
//         console.log("rows: ", rows[0]);

//         res.render("posts/edit", {
//           title: "edit Post",
//           post: rows[0],
//           status: isloggedIn,
//           user: userName
//         });
//       }
//     );
//   }
// static getAddPostPage(req, res) {
//   let isloggedIn = req.session.user ? true : false;
//   let userName = req.session.user ? req.session.user.username : "no user";
//   console.log("isloggedIn :", isloggedIn);
//   console.log("userName :", userName);
//   res.render("posts/add", {
//     title: "add post",
//     status: isloggedIn,
//     user: userName
//   });
// }
