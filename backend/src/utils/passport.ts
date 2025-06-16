import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import User from "../modules/user/user";
import { Document } from "mongoose";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
            callbackURL: `http://localhost:${process.env.API_PORT || "8080"}/api/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile: Profile, done: VerifyCallback) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    const existingUser = await User.findOne({ email: profile.emails?.[0].value });
                    if (existingUser) {
                        // Email already registered with another method
                        // Here we send failure (false) and include a message via 'info'
                        return done(null, false, {
                            message: "Email already exists. Please sign in with your notification and password.",
                        });
                    }
                    user = new User({
                        googleId: profile.id,
                        email: profile.emails?.[0].value,
                        firstName: profile.name?.givenName,
                        lastName: profile.name?.familyName,
                        roles: ["user"],
                    });
                    await user.save();
                }
                return done(null, user);
            } catch (error) {
                console.error("Google Strategy Error:", error);
                return done(error as Error, undefined);
            }
        },
    ),
);

passport.serializeUser((user: typeof User.prototype & Document, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

export default passport;
