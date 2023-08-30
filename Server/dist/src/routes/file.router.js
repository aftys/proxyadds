"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const file_controller_1 = require("../controllers/file.controller");
const filehelper_1 = __importDefault(require("../assets/filehelper"));
const router = express_1.default.Router();
// const upload = multer({ dest: '/tmp/' });
// Route for handling file upload
router.post('/', filehelper_1.default.single('file'), file_controller_1.uploadFile);
// Route for fetching all uploaded files
router.get('/', file_controller_1.getAllFiles);
// Route for downloading a specific file by ID
router.get('/:id', file_controller_1.downloadFile);
exports.default = router;
