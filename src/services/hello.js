exports.main = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(`Hello! I will read from table ${process.env.TABLE_NAME}`),
  };
};