import cloudinary, { UploadApiResponse } from "cloudinary";

/**
 * This function is used to upload images to a cloud storage service (Cloudinary).
 * It uses the uploader.upload_stream method from the Cloudinary SDK to upload the images.
 *
 *
 * @param {Express.Multer.File[]} imageFiles - An array of image files to be uploaded. These files are provided by the multer middleware.
 * @param {string} [hotelName] - The name of the hotel. This is optional and if provided, it will be used as the folder name in the cloud storage where the images will be stored.
 *
 * @returns {Promise<{secure_url: string, publicId: string}[]>} - A promise that resolves to an array of objects. Each object contains the secure URL of the uploaded image (`secure_url`) and the public ID of the image (`publicId`) in the cloud storage.
 *
 * @throws {Error} - Throws an error if the upload fails.
 */
export const uploadImages = async (
    imageFiles: Express.Multer.File[],
    hotelName?: string,
): Promise<{ secure_url: string; publicId: string }[]> => {
    const uploadPromises = imageFiles.map(async (image) => {
        const uploadResult = await new Promise<UploadApiResponse | undefined>((resolve, reject) => {
            cloudinary.v2.uploader
                .upload_stream({ resource_type: "image", folder: `/hotels/${hotelName}` }, (error, uploadResult) => {
                    if (error) {
                        reject(error);
                    }
                    return resolve(uploadResult);
                })
                .end(image.buffer);
        });
        if (uploadResult) {
            return {
                secure_url: uploadResult.secure_url,
                publicId: uploadResult.public_id,
            };
        } else {
            throw new Error("Upload failed!");
        }
    });

    const imageUploadResults = await Promise.all(uploadPromises);
    return imageUploadResults;
};
