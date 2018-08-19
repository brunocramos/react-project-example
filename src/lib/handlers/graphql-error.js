export default (error) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error(error); //eslint-disable-line
  }

  if (error.graphQLErrors) {
    const newError = error.graphQLErrors.map(err => err.message);
    if (!newError.length) return ['Houve um erro. Por favor, verifique sua conexão tente novamente.'];
    return newError;
  }

  if (Array.isArray(error) && error.length) {
    return error.map(err => err.message);
  }

  return null;
};
