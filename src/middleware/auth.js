const { config } = require("dotenv");
const { verify, decode } = require("jsonwebtoken");
config();

async function auth(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).send({
      message: "Autenticação Falhou",
      cause: "Token não informado",
    });
  }

  const [bearer, token] = authorization.split(" ");

  if (!bearer || !token) {
    return response.status(401).send({
      message: "Autenticação Falhou",
      cause: "Token mal formatado",
    });
  }

  if (bearer !== "Bearer") {
    return response.status(401).send({
      message: "Autenticação Falhou",
      cause: "Token mal formatado",
    });
  }

  const payload = decode(token);

  if (payload?.email === undefined || payload.password === undefined) {
    return response.status(401).send({
      message: "Autenticação Falhou",
      cause: "Token mal formatado",
    });
  }

  request["payload"] = verify(token, process.env.SECRET_JWT);

  next();
}

module.exports = { auth };
