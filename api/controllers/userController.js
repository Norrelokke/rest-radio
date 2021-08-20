const sqlite3 = require("sqlite3");
const Encrypt = require("../Encrypt");
const path = require("path");

const db = new sqlite3.Database(path.join(__dirname, "../../src/RadioAppDB.db"));

const whoami = (req, res) => {
  res.json(req.session.user || null);
};

const login = (req, res) => {
  let query = `SELECT * FROM users WHERE email = $email`;
  let params = { $email: req.body.email };
  db.get(query, params, function (err, user) {
    if (!user) {
      res.status(401).json({ error: "Bad credentials" });
      return;
    }
    req.body.password = Encrypt.encrypt(req.body.password);
    if (user.password === req.body.password) {
      delete user.password;
      req.session.user = user;
      res.json({ success: "Login successfull", loggedInUser: user });
      return;
    } else {
      res.status(401).json({ error: "Bad credentials" });
      return;
    }
  });
};

const logout = (req, res) => {
  delete req.session.user;
  res.json({ success: "Logout Successfull" });
};

const register = (req, res) => {
  let user = req.body;
  let query = `SELECT * FROM users WHERE email = $email`;
  let params = { $email: user.email };
  db.get(query, params, (err, userExist) => {
    if (userExist) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
  });
  user.password = Encrypt.encrypt(user.password);
  query = `INSERT INTO users (email, password) VALUES ($email, $password)`;
  params = {
    $email: user.email,
    $password: user.password,
  };
  db.run(query, params, function (err) {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({ success: "Registration successful", lastID: this.lastID });
  });
};

const addChannelToFavorite = (req, res) => {
  let favoriteToRegister = req.body;
  let query = `SELECT * FROM favoriteChannels WHERE channelId = $channelId`;
  let params = { $channelId: favoriteToRegister.channelId };
  db.get(query, params, (err, channelExist) => {
    if (channelExist) {
      res.status(400).json({ error: "This channel is already favorited" });
      return;
    }
  });
  query = `INSERT INTO favoriteChannels (userId, channelId, channelName, channelTagline, channelType) VALUES ($userId,$id, $name, $tagline, $channeltype)`;
  params = {
    $userId: favoriteToRegister.userId,
    $id: favoriteToRegister.id,
    $name: favoriteToRegister.name,
    $tagline: favoriteToRegister.tagline,
    $channeltype: favoriteToRegister.channeltype,
  };

  db.run(query, params, function (err) {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({
      success: "Channel registered successfully",
      lastID: this.lastID,
    });
  });
};

const getFavoriteChannels = (req, res) => {
  let query = `SELECT * FROM favoriteChannels`;
  db.all(query, {}, function (err, data) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.json(data);
  });
};

const getFavoritePrograms = (req, res) => {
  let query = `SELECT * FROM favoritePrograms`;
  db.all(query, {}, function (err, data) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.json(data);
  });
};

const deleteFavorite = (req, res) => {
  let query = `DELETE FROM favoriteChannels WHERE channelId = $channelId`;
  let id = req.params.id;
  db.get(query, id, function (err, data) {
    if (err) {
      console.log(err);
      throw err;
    }
  });
};

const deleteFavoriteProgram = (req, res) => {
  let query = `DELETE FROM favoritePrograms WHERE programId = $programId`;
  let id = req.params.id;
  db.get(query, id, function (err, data) {
    if (err) {
      console.log(err);
      throw err;
    }
  });
};

const addProgramToFavorite = (req, res) => {
  let favoriteProgramToRegister = req.body;
  let query = `SELECT * FROM favoritePrograms WHERE programId = $programId`;
  let params = { $programId: favoriteProgramToRegister.programId };
  db.get(query, params, (err, programExist) => {
    if (programExist) {
      res.status(400).json({ error: "This program is already favorited" });
      return;
    }
  });

  query = `INSERT INTO favoritePrograms (userId, programId, programName, programDescription) VALUES ($userId, $id, $name, $description)`;
  params = {
    $userId: favoriteProgramToRegister.userId,
    $id: favoriteProgramToRegister.id,
    $name: favoriteProgramToRegister.name,
    $description: favoriteProgramToRegister.description,
  };

  db.run(query, params, function (err) {
    if (err) {
      res.status(400).json({ error: err });
      return;
    }
    res.json({
      success: "Program registered successfully",
      lastID: this.lastID,
    });
  });
};

module.exports = {
  whoami,
  login,
  logout,
  register,
  addChannelToFavorite,
  deleteFavorite,
  getFavoriteChannels,
  addProgramToFavorite,
  deleteFavoriteProgram,
  getFavoritePrograms,
};
