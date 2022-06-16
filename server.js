import jwt from "jsonwebtoken";
import fastify from "fastify"
import mongoose from "mongoose";
import cors from "fastify-cors";

const jwtSecret = "test";
const uri = 'mongodb+srv://mason:8BGMyEr0APsyB6Bx@cluster0.3dgfo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// Esablish mongodb connection
mongoose.connect(uri, (err, res) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Mongo Connected');
    }
});

/* Creating a new mongoose schema. */
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: false
    }
});

const User = mongoose.model('users', UserSchema);

const server = fastify({ logger: false });

/* This is a middleware that allows cross-origin requests. */
server.register(cors, {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false,
});

// clora.io
server.get("/", (req, reply) => {
    console.log("/");
    reply.send("hello");
});

/* Checking if the token is valid. If it is valid, it will return the user's data. */
server.get("/download", (req, reply) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                console.log(err);
                reply.send({
                    success: false,
                    message: "Not authorized"
                });
            } else {
                const email = decoded.email;
                /* Checking if the user is in the database. If the user is in the database, it will
                return a token. If the user is not in the database, it will return a 401 error. */
                User.findOne({ email: email }, (err, user) => {
                    if (err) {
                        console.log(err);
                        reply.send({
                            success: false,
                            message: "Not authorized"
                        });
                    } else {
                        if (user) {
                            reply.send({
                                success: true,
                                message: "Success",
                                data: user.data || {}
                            });
                        } else {
                            reply.send({
                                success: false,
                                message: "Not authorized"
                            });
                        }
                    }
                });
            }
        });
    } else {
        reply.send({
            success: false,
            message: "Not authorized"
        });
    }
});

/* Checking if the user is in the database. If the user is in the database, it will remove the user. If
the user is not in the database, it will return a 401 error. */
server.get("/leave", (req, reply) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                reply.code(401).send();
            }
            else {
                const email = decoded.email;
                User.findOne({ email: email }, (err, user) => {
                    if (err) {
                        console.log(err);
                        reply.code(500).send();
                    }
                    else if (user) {
                        user.remove((err, user) => {
                            if (err) {
                                console.log(err);
                                reply.code(500).send();
                            }
                            else if (user) {
                                reply.code(200).send({ success: true });
                            }
                        });
                    }
                });
            }
        });
    }
    else {
        reply.code(401).send();
    }
});

/* Checking if the user is in the database. If the user is in the database, it will return a token and the users data. If
the user is not in the database, it will return a 401 error. */
server.post("/login", (req, reply) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    /* Checking if the user is in the database. If the user is in the database, it will return a token.
    If the user is not in the database, it will return a 401 error. */
    User.findOne({ email: email, password: password }, (err, user) => {
        console.log(err, user);
        if (err) {
            console.log("ERROR", err);
            reply.code(500).send();
        }
        else if (user) {
            const token = jwt.sign({
                email: user.email
            }, jwtSecret, { expiresIn: '1h' });
            console.log({ token: token, data: user.data });
            reply.code(200).send({ token: token, data: user.data });
        }
        else {
            reply.code(401).send();
        }
    });
});

server.get("/bytestream", (req, reply) => {
    // const email = req.body.email;
    const email = "mason@lakefox.net";
    const name = "Enter Name";
    console.log(email);
    /* Checking if the user is in the database. If the user is in the database, it will return a token.
    If the user is not in the database, it will return a 401 error. */
    User.findOne({ email: email }, (err, user) => {
        console.log(err, user);
        if (err) {
            console.log("ERROR", err);
            reply.code(500).send();
        }
        else if (user) {
            let gardens = JSON.parse(user.data).garden;
            for (let a = 0; a < gardens.length; a++) {
                if (gardens[a].name == name) {
                    let garden = gardens[a].data;
                    let all = [gardens[a].width, gardens[a].height];
                    // Add all the rows together
                    for (let b = 0; b < garden.length; b++) {
                        const row = garden[b].row;
                        all = all.concat(...row);
                    }
                    reply.send(all);
                }

            }
        }
        else {
            reply.code(401).send();
        }
    });
});

/* Creating a new user in the database. */
server.post("/join", (req, reply) => {
    const email = req.body.email;
    const password = req.body.password;
    const newUser = new User({
        email: email,
        password: password,
        data: {}
    });

    /* Checking if the user is in the database. If the user is in the database, it will return a 409
    error.
    If the user is not in the database, it will create a new user in the database. */
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log("ERROR", err);
            reply.code(900).send();
        }
        else if (user) {
            reply.code(409).send();
        }
        else {
            newUser.save((err, user) => {
                if (err) {
                    console.log(err);
                    reply.code(500).send();
                }
                else if (user) {
                    console.log("new user");
                    reply.code(200).send({ sucess: true });
                }
            });
        }
    })
});

/* Checking if the token is valid. If it is valid, it will return the user's data. */
server.post("/upload", (req, reply) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                reply.code(401).send();
            }
            else {
                const email = decoded.email;
                const data = req.body;
                User.findOne({ email: email }, (err, user) => {
                    if (err) {
                        console.log(err);
                        reply.code(500).send();
                    }
                    else if (user) {
                        user.data = data;
                        user.save((err, user) => {
                            if (err) {
                                console.log(err);
                                reply.code(500).send();
                            }
                            else if (user) {
                                reply.code(200).send();
                            }
                        });
                    }
                });
            }
        });
    }
    else {
        reply.code(401).send();
    }
});

server.listen(8080, "192.168.0.13", (err) => {
    console.log(err);
});