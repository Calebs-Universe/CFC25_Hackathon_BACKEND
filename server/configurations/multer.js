import multer from "multer";

const storage = multer.diskStorage({

    filename:    function (request, file, callback) { callback(null, file.originalname); },
    destination: function (request, file, callback) { callback(null, "../uploads/"); }
});

// const Upload = multer({ storage: storage });

const Upload = multer({ dest: '../uploads/' });

export default Upload;