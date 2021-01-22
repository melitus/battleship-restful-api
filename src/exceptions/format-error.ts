/**
 * Create an Error Object
 * @param {Array} or {object} errors - an instance or array of instances of AppError
 * return {object} format - properly-formatted JSONAPI errors object
 */
export function formatError(errors) {
  let errorFormat;

  if (Array.isArray(errors)) {
    const formattedErrors = errors.map(error => {
      const formattedError = {
        status: error.status,
        title: error.title,
        message: error.message,
      };
      return formattedError;
    });
    // wrap the array in an object
    errorFormat = { errors: formattedErrors };
  } else {
    const error = errors;
    const formattedError = {
      status: error.status,
      title: error.title,
      message: error.message,
    };
    // wrap the object in an array and then an object
    errorFormat = { errors: [formattedError] };
  }
  return errorFormat;
}