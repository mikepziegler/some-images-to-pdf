export class BaseError extends Error {
    constructor(name, description) {
        super(description);


        Object.setPrototypeOf(this, new.target.prototype)

        this.name = name;
    }

    captureStackTrace() {
        Error.captureStackTrace(this);
    }
}

export class NoImagesFoundError extends BaseError {
    constructor() {
        super("NoImagesFoundError", "No images found in path when executing cli tool");
    }
}

export class ImageMovingFailedError extends BaseError {
    constructor() {
        super("ImageMovingError", "A image could not be moved");
    }
}

export class ImageDeletingFailedError extends BaseError {
    constructor() {
        super("ImageDeletingError", "A image could not be deleted");
    }
}
