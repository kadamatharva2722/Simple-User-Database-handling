const User = require('../models/user');
const express = require('express');

async function handleGetAllUsers(req,res) {
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
}
async function handleGetAllUsersHtml(req,res) {
    const allDBUsers = await User.find({});
    const html = `
        <ul>
            ${allDBUsers.map((user) => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html);
}
async function handleFindParticularUser(req,res) {
    const findemail = req.params.email;
    const user = await User.findOne({ email: findemail });
    if (!user) return res.send("User Not Found");
    return res.json(user);
}
async function handleFindParticularUserHtml(req,res) {
    const findemail = req.params.email;
    const user = await User.findOne({ email: findemail });
    if (!user)
        res.status(404).send("User not found. Enter valid Input");
    const html = `
    <ul>
        <li>First Name: ${user.first_name}</li>
        <li>Last Name: ${user.last_name}</li>
        <li>Email: ${user.email}</li>
        <li>Gender: ${user.gender}</li>
    </ul>
    `;
    return res.send(html);
}
async function handleInsertUser(req,res) {
    const body = req.body;
    if (!body.first_name || !body.email)
        return res.status(404).send("Invalid Entry");

    const checkemail = req.body.email;

    const ifExist = await User.findOne({ email: checkemail });

    if (ifExist)
        return res.status(404).send("User Exist in Database. Try again");

    await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
    });

    return res.status(201).send("Successfully created");
}
async function handleUpdateUser(req,res) {
    const findemail = req.params.email;
    delete req.body.email;

    const updatedUser = await User.findOneAndUpdate({ email: findemail }, { $set: req.body }, { new: true });

    if (!updatedUser)
        return res.status(404).send("user not found");

    return res.send("Updated user ", updatedUser);
}
async function handleDeleteUser(req,res) {
    const findemail = req.params.email;

    const deleteUser = await User.findOneAndDelete({ email: findemail });

    if (!deleteUser)
        return res.status(404).send("User not found in Database. Try again");

    return res.send("User with " + findemail + " is deleted successfully");
}
module.exports = {
    handleGetAllUsers,
    handleGetAllUsersHtml,
    handleFindParticularUser,
    handleFindParticularUserHtml,
    handleInsertUser,
    handleUpdateUser,
    handleDeleteUser
}
