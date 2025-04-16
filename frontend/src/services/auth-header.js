export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    // For Spring Boot backend with JWT
    return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}