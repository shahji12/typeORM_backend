import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

const GOOGLE_CLIENT_ID = 'your_client_id';
const GOOGLE_CLIENT_SECRET = 'your_client_secret';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://yourdomain:3000/auth/google/callback',
      passReqToCallback: true,
    },
    (
      // request,
      // accessToken,
      // refreshToken,
      profile : any,
      done : any
    ) => {
      
        return done(null, profile);
    }
  )
);
