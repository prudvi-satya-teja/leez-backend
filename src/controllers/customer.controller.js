const otpGenerator = require("otp-generator");
const { sendMail } = require("../utils/mail");

const OTP = require("../models/otp.model");
const Customer = require("../models/customers.model");

// customer signup
const signup = async (req, res) => {
    try {
        console.log("hello");
        const { email, phoneNo } = req.body;
        const user = await Customer.findOne({ email: email } || { phoneNo: phoneNo });
        if (user) {
            return res
                .status(400)
                .json({ success: true, message: "User already exists with email or password" });
        }

        const otp = otpGenerator.generate(4, {
            specialChars: false,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
        });
        console.log("api");
        const userOtpObject = new OTP({ email: email, otp: otp });
        userOtpObject.save();
        const status = sendMail(
            email,
            "Otp is valid for 10 minutes",
            `Your otp for signup in leez is ${otp}`
        );
        if (!status) return res.status(500).json({ success: true, message: "Mail error" });
        return res.status(200).json({ success: true, message: "Otp sent successfully" });
    } catch (err) {
        console.log("Error is: ", err);
        return res.status(500).json({ success: false, message: "Server error !" });
    }
};

// create account after validation
const createAccount = async (req, res) => {
    try {
        const { email, phoneNo, name, password } = req.body;

        const user = await Customer.findOne({ email: email } || { phoneNo: phoneNo });
        if (user) {
            return res
                .status(400)
                .json({ success: true, message: "User already exists with email or password" });
        }

        const customerObject = new Customer({
            email: email,
            phoneNo: phoneNo,
            name: name,
            password: password,
        });
        await customerObject.save();
        return res.status(200).json({ success: true, message: "Account creation successful" });
    } catch (err) {
        console.log("Error is: ", err);
        return res.status(500).json({ success: false, message: "Server error !" });
    }
};

// verify otp
const verifyOtp = async (req, res) => {
    try {
        console.log("verify otp");
        const { email, otp, phoneNo, name, password } = req.body;
        console.log(req.body);

        const otpObject = await OTP.findOne({ email: email, otp: otp });
        if (!otpObject) {
            return res.status(400).json({ success: false, message: "Not a valid OTP" });
        }
        const response = await fetch("http://localhost:5001/api/customer/create-account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                name: name,
                phoneNo: phoneNo,
                password: password,
            }),
        });

        const data = await response.json();
        console.log("POST Response:", data);

        return res.status(200).json({
            success: true,
            message: "OTP verification successful and post created",
            postResponse: data,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error!" });
    }
};

// customer login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const user = await Customer.findOne({ email: email } || { phoneNo: email });
        if (user.length == 0) {
            return res.status(400).json({ success: false, message: "No user exists" });
        }
        if (user.password == password) {
            return res.status(200).json({ success: true, message: "User login successful" });
        } else {
            return res.status(400).json({ success: false, message: "Wrong password" });
        }
    } catch (err) {
        console.log("Error is : ", err);
        return res.status(500).json({ success: false, message: "Server error !" });
    }
};

module.exports = {
    signup,
    login,
    createAccount,
    verifyOtp,
};
