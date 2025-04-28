export const errorMessages = {
  '400': {
    error: 'Bad Request',
    message: 'Invalid request parameters or payload.',
  },
  '401': {
    error: 'Unauthorized',
    message: 'Authentication credentials were not provided or are invalid.',
  },
  '403': {
    error: 'Forbidden',
    message: 'You do not have permission to access this resource.',
  },
  '404': {
    error: 'Not Found',
    message: 'The requested resource was not found.',
  },
  '405': {
    error: 'Method Not Allowed',
    message: 'The requested method is not allowed for this resource.',
  },
  '409': {
    error: 'Conflict',
    message:
      'A conflict occurred, such as duplicate data or resource version mismatch.',
  },
  '422': {
    error: 'Unprocessable Entity',
    message: 'The request was well-formed but contains semantic errors.',
  },
  '500': {
    error: 'Internal Server Error',
    message: 'An unexpected error occurred on the server.',
  },
  '502': {
    error: 'Bad Gateway',
    message: 'The server received an invalid response from an upstream server.',
  },
  '503': {
    error: 'Service Unavailable',
    message:
      'The server is currently unable to handle the request due to temporary overload or maintenance.',
  },
}
