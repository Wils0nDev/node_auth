import jwt from "jsonwebtoken";
import { envs } from "../envs";
import { JWTSeed } from "../jwt_seed";

export class JsonWebTokenAdapter {
  //D.I : Inyjectamos la firma secreta
  constructor(public readonly seed: JWTSeed) {}

  //generamos el token
  generateToken = async (payload: any, duration: string = "2h") => {
    return new Promise((resolve) => {
      jwt.sign(
        payload,
        this.seed.getJWTSeed(),
        { expiresIn: duration },
        (err, token) => {
          console.log(err);
          if (err) return resolve(null);

          resolve(token);
        }
      );
    });
  };

  //Validamos que el token que llegue es el correcto
   validateToken = (token: string) => {
    return new Promise((resolve) => {
      jwt.verify(token,this.seed.getJWTSeed(),(err, decoded) => {
          if (err) return resolve(null);
          resolve(decoded);
        }
      );
    });
  }
}