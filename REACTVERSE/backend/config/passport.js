import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// In your passport config file
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // User exists - check if they logged in with Google before
          if (!user.googleId) {
            // First time logging in with Google (had password-only account)
            user.googleId = profile.id;
            user.avatar = profile.photos[0]?.value || user.avatar;
            user.accountStatus = user.password
              ? "google+password"
              : "google_only";
            await user.save();
          }
          return done(null, user);
        }

        // New user - create with Google only
        const newUser = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos[0]?.value,
          password: null,
          accountStatus: "google_only",
        });

        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
