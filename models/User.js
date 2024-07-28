const db = require("../db");
const bcrypt = require("bcryptjs");
const { User, Role } = require("./index");

async function createUser(firstname, lastname, email, password, roleName) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const role = await Role.findOne({ where: { role_name: roleName } });
    if (!role) {
      throw new Error(`Role ${roleName} not found`);
    }

    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role_id: role.id,
    });
    return user;
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error("email already exists");
    }
    throw new Error(error.message);
  }
}

async function findUserByEmail(email) {
  const user = await User.findOne({
    where: { email },
    include: [Role],
  });
  return user;
}

async function findAll(limit,page) {
  offset =(page-1)*limit;
  const user = await User.findAll({
    attributes:["email","firstname","lastname","id"],
    include: [Role],
    limit,
    offset
  });
  return user;
}

module.exports = {
  createUser,
  findUserByEmail,
  findAll
};

//  Direct querying with sql statements similar to jdbc commented as ORM is used

// async function createUser(firstname,lastname,email,password,role){
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password,salt);
//     const query = 'INSERT INTO users (firstname,lastname,email, password, role) VALUES ( ?, ?, ?, ?, ?)';
//     return new Promise((resolve,reject)=>{
//         db.query(query,[firstname,lastname,email,hashedPassword,role],(err,results)=>{
//             if(err){
//                 return reject(err);
//             }
//             resolve(results.insertId);
//         });
//     });
// }

// async function findUserByEmail(email){
//     const query = 'select * from users where email=?';
//     return new Promise((resolve,reject)=>{
//         db.query(query,[email],(err,results)=>{
//             if(err){
//                 return reject(err);
//             }
//             resolve(results[0]);
//         })
//     })
// }
