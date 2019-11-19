function tracker(req, res, next) {
  console.log("tracker");
  next();
}

module.exports = tracker;
