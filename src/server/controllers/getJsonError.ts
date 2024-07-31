type GetJsonError = (message: string) => {
  errors: {
    default: string;
  };
};

const getJsonError: GetJsonError = (message) => ({
  errors: {
    default: message,
  },
});

export { getJsonError };
