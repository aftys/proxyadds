import express, { Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import businessTypesRouter from './src/routes/businessTypes.router';
import businessActivitiesRouter from './src/routes/businessActivities.router';
import locationRouter from './src/routes/locations.router';
import campaignRouter from './src/routes/campaigns.router';
import campaignBusinessActivityRouter from './src/routes/campaignBusinessActivities.router';
import campaignBusinessTypeRouter from './src/routes/campaignBusinessTypes.router';
import parameterRouter from './src/routes/parameters.router';
import trackingRouter from './src/routes/trackings.router';
import campaignPlacementRouter from './src/routes/campaignPlacements.router';
import campaignLocationRouter from './src/routes/campaignLocations.router';
import advertiserRouter from './src/routes/advertisers.router';
import businessRouter from './src/routes/businesses.router';
import placementRouter from './src/routes/placements.router';
import schedulesRouter from './src/routes/schedules.router';
import usersRouter from './src/routes/users.router';
import fileRouter from './src/routes/file.router'

const app: Express = express();

app.use(express.json());

app.use(cors())

app.use('/business-types', businessTypesRouter);
app.use('/business-activities', businessActivitiesRouter);
app.use('/locations', locationRouter);
app.use('/campaigns', campaignRouter);
app.use('/campaign-business-activities', campaignBusinessActivityRouter);
app.use('/campaign-business-types', campaignBusinessTypeRouter);
app.use('/parameters', parameterRouter);
app.use('/trackings', trackingRouter);
app.use('/campaign-placements', campaignPlacementRouter);
app.use('/campaign-locations', campaignLocationRouter);
app.use('/advertisers', advertiserRouter);
app.use('/businesses', businessRouter);
app.use('/placements', placementRouter);
app.use('/schedules', schedulesRouter);
app.use('/users', usersRouter);
app.use('/files', fileRouter);

const PORT: number = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const MONGODB_URI: string = 'mongodb+srv://oussama:Oussama2001@cluster0.aqunadl.mongodb.net/ProxyAds';
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
