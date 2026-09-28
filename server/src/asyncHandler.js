// Express 4 doesn't forward rejected promises from async handlers to error
// middleware on its own — an unhandled rejection there crashes the whole
// process. Wrap every async route handler with this so DB/etc. errors turn
// into a normal 500 response instead of taking the server down.
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = { asyncHandler };
