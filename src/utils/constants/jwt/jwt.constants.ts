require('dotenv').config();

export const jwtConstants = {
  jwtAccessKey: process.env.JWT_ACCESS_KEY,
  jwtRefreshKey: process.env.JWT_REFRESH_KEY,
};
