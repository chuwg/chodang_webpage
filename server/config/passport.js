const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
const User = require('../models/User');

// Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ 'oauth.google': profile.id });
      
      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new User({
        email: profile.emails[0].value,
        username: profile.displayName,
        oauth: {
          google: profile.id
        }
      });

      await newUser.save();
      done(null, newUser);
    } catch (error) {
      done(error, null);
    }
  }
));

// Kakao OAuth
passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID,
    callbackURL: "/auth/kakao/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ 'oauth.kakao': profile.id });
      
      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new User({
        email: profile._json.kakao_account.email,
        username: profile.displayName,
        oauth: {
          kakao: profile.id
        }
      });

      await newUser.save();
      done(null, newUser);
    } catch (error) {
      done(error, null);
    }
  }
));

// Naver OAuth
passport.use(new NaverStrategy({
    clientID: process.env.NAVER_CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
    callbackURL: "/auth/naver/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ 'oauth.naver': profile.id });
      
      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = new User({
        email: profile.emails[0].value,
        username: profile.displayName,
        oauth: {
          naver: profile.id
        }
      });

      await newUser.save();
      done(null, newUser);
    } catch (error) {
      done(error, null);
    }
  }
)); 