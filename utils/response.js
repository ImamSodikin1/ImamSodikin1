// utils/response.js

export const sendErrorResponse = (
  res,
  message,
  error = null,
  statusCode = 400
) => {
  res.status(statusCode).json({
    status: false,
    message,
    ...(error && { error }),
  });
};

export const sendSuccessResponse = (
  res,
  message,
  data = null,
  statusCode = 200,
  status = true
) => {
  res.status(statusCode).json({
    status,
    message,
    ...(data && { data }),
  });
};
