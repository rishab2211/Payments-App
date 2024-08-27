const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../mongooseDB");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

// Signup schema validation
const signupSchema = zod.object({
    username: zod.string().min(4),
    password: zod.string().min(8),
    firstName: zod.string().min(2),
    lastName: zod.string().min(2)
});

router.post("/signup", async (req, res) => {
    // Validate request body using Zod schema
    const { success, data } = signupSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        });
    }

    // Check if the user already exists
    const userAlreadyExist = await User.findOne({
        username: data.username
    });

    if (userAlreadyExist) {
        return res.status(409).json({
            message: "Username is already taken"
        });
    }

    // Create new user in the database
    const dbuser = await User.create(data);

    const userId = dbuser._id;

    Account.create({
        userId,
        balance : 1+Math.random()*10000
    })

    // Generate JWT token
    const token = jwt.sign(
        { userId: userId },
        JWT_SECRET
    );

    res.json({
        message: "User created successfully",
        token: token
    });
});

// Signin schema validation
const signinBody = zod.object({
    username: zod.string(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const { success, data } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Incorrect inputs"
        });
    }

    // Check if the user exists in the database
    const doesUserExist = await User.findOne({
        username: data.username,
        password: data.password
    });

    if (doesUserExist) {
        // Generate JWT token
        const token = jwt.sign(
            { userId: doesUserExist._id },
            JWT_SECRET
        );

        return res.json({
            token: token
        });
    }

    res.status(401).json({
        message: "Invalid username or password"
    });
});



const updateSchema = zod.object({
    username: zod.string(),
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

router.put("/update", async (req, res) => {
    const { success, data } = updateSchema.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Input is too short."
        });
    }

    const userToUpdate = await User.findOne({
        username: data.username
    });

    if (!userToUpdate) {
        return res.status(404).json({ message: "User not found." });
    }

    if (data.firstName) userToUpdate.firstName = data.firstName;
    if (data.lastName) userToUpdate.lastName = data.lastName;
    if (data.password) userToUpdate.password = data.password;

    await userToUpdate.save();

    res.status(200).json({ message: "User updated successfully." });
});



router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { username: { $regex: filter, $options: 'i' } },
            { firstName: { $regex: filter, $options: 'i' } },
            { lastName: { $regex: filter, $options: 'i' } }
        ]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports = router;
