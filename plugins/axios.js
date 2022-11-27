export default ({ $axios, redirect }) => {
  $axios.onError((error) => {
    if (
      error.response.status === 404
       || error.response.status === 401
       || error.response.status === 403
    ) {
      redirect('/login');
    }
  });
};
