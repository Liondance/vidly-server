///
/// bare bones logger
///

function logger(_, _, next) {
  console.log("logger");
  next();
}

module.exports = logger;
