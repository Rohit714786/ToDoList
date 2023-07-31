const Task = require('../models/task_info');

module.exports.home = async function (req, resp) {
  try {
    const tasks = await Task.find({});
    return resp.render('index', {
      title: 'ToDo APP',
      history_task: tasks, // Use the correct variable name here
    });
  } catch (err) {
    console.log("Error fetching tasks", err);
    return resp.redirect('/');
  }
};

module.exports.add = async function (req, resp) {
  const task = {
    desc: req.body.desc,
    cate: req.body.cate,
    dob: req.body.dob,
  };
  try {
    await Task.create(task);
    return resp.redirect('/');
  } catch (err) {
    console.log("Error inserting task", err);
    return resp.redirect('/');
  }
};

module.exports.delete = async function (req, resp) {
  try {
    // Get an array of selected task IDs from the request query parameters
    const selectedTaskIds = Object.keys(req.query);

    // Check if any tasks were selected
    if (selectedTaskIds.length > 0) {
      // Use the $in operator to delete multiple tasks at once by their IDs
      await Task.deleteMany({ _id: { $in: selectedTaskIds } });
    }

    return resp.redirect('/');
  } catch (err) {
    console.log("Error deleting tasks", err);
    return resp.redirect('/');
  }
};




