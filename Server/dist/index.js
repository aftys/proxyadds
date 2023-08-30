"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const businessTypes_router_1 = __importDefault(require("./src/routes/businessTypes.router"));
const businessActivities_router_1 = __importDefault(require("./src/routes/businessActivities.router"));
const locations_router_1 = __importDefault(require("./src/routes/locations.router"));
const campaigns_router_1 = __importDefault(require("./src/routes/campaigns.router"));
const campaignBusinessActivities_router_1 = __importDefault(require("./src/routes/campaignBusinessActivities.router"));
const campaignBusinessTypes_router_1 = __importDefault(require("./src/routes/campaignBusinessTypes.router"));
const parameters_router_1 = __importDefault(require("./src/routes/parameters.router"));
const trackings_router_1 = __importDefault(require("./src/routes/trackings.router"));
const campaignPlacements_router_1 = __importDefault(require("./src/routes/campaignPlacements.router"));
const campaignLocations_router_1 = __importDefault(require("./src/routes/campaignLocations.router"));
const advertisers_router_1 = __importDefault(require("./src/routes/advertisers.router"));
const businesses_router_1 = __importDefault(require("./src/routes/businesses.router"));
const placements_router_1 = __importDefault(require("./src/routes/placements.router"));
const schedules_router_1 = __importDefault(require("./src/routes/schedules.router"));
const users_router_1 = __importDefault(require("./src/routes/users.router"));
const file_router_1 = __importDefault(require("./src/routes/file.router"));
const signIN_router_1 = __importDefault(require("./src/routes/signIN.router"));
const campaignAds_router_1 = __importDefault(require("./src/routes/campaignAds.router"));
require("dotenv").config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/uploads', express_1.default.static('uploads'));
app.use((0, cors_1.default)());
app.use('/login', signIN_router_1.default);
app.use('/business-types', businessTypes_router_1.default);
app.use('/business-activities', businessActivities_router_1.default);
app.use('/locations', locations_router_1.default);
app.use('/campaigns', campaigns_router_1.default);
app.use('/campaign-business-activities', campaignBusinessActivities_router_1.default);
app.use('/campaign-business-types', campaignBusinessTypes_router_1.default);
app.use('/parameters', parameters_router_1.default);
app.use('/trackings', trackings_router_1.default);
app.use('/campaign-placements', campaignPlacements_router_1.default);
app.use('/campaign-locations', campaignLocations_router_1.default);
app.use('/advertisers', advertisers_router_1.default);
app.use('/businesses', businesses_router_1.default);
app.use('/placements', placements_router_1.default);
app.use('/schedules', schedules_router_1.default);
app.use('/users', users_router_1.default);
app.use('/files', file_router_1.default);
app.use('/test', campaignAds_router_1.default);
const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
