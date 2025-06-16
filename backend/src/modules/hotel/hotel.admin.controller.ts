import { RequestHandler } from "express";
import cloudinary from "cloudinary";
import ExpressError from "../../utils/ExpressError";
import Hotel from "./hotel";
import { HotelType } from "../../../types/typesBackend";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { uploadImages } from "../../utils/upload-images";
import "dotenv/config";

const geocodingClient = mbxGeocoding({
    accessToken: process.env.MAPBOX_SECRET_TOKEN as string,
});

export const postNewHotel: RequestHandler = async (req, res, next) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];

        const newHotel = new Hotel(req.body);

        /*
                wasted resources
                const uploadPromises = imageFiles.map(async (image) => {
                  const b64 = Buffer.from(image.buffer).toString("base64");
                  let dataURI = "data:" + image.mimetype + ";base64," + b64;
                  // console.log(dataURI);
                  const res = await cloudinary.v2.uploader.upload(dataURI);
                  return res.url;
                });
                const imageUrls = await Promise.all(uploadPromises);
                */
        const imageUploadResults = await uploadImages(imageFiles, newHotel.name);
        // add urls image to hotel
        newHotel.imageUrls = imageUploadResults.map((result) => result.secure_url);
        newHotel.imagePublicIds = imageUploadResults.map((result) => result.publicId);

        // get coordinates from mapbox
        const response = await geocodingClient
            .forwardGeocode({
                query: `${newHotel.city}, ${newHotel.country}`,
                limit: 1,
            })
            .send();
        newHotel.location = response.body.features[0].geometry;

        newHotel.lastUpdated = new Date();
        /*
                 take id from req.userId (not req.body) b.c the
                 userId has validated by token before add it to req
                */
        if (!req.userId) {
            throw new ExpressError("User ID is missing", 400);
        }

        newHotel.userId = req.userId;

        const hotel = new Hotel(newHotel);
        await hotel.save();

        res.status(201).send(hotel);
    } catch (e) {
        console.log(e);
        next(new ExpressError(`Error creating hotel: ${e}`, 400));
    }
};

export const getHotels: RequestHandler = async (req, res, next) => {
    try {
        const hotels = await Hotel.find().sort({ lastUpdated: -1 });
        res.json(hotels);
    } catch (error) {
        console.log(error);
        next(new ExpressError(`Error creating hotel: ${error}`, 500));
    }
};

export const getOneHotel: RequestHandler = async (req, res) => {
    const hotelId = req.params.hotelId.toString();
    try {
        const hotel = await Hotel.findOne({
            _id: hotelId,
        });
        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hotels" + error });
    }
};

export const editHotel: RequestHandler = async (req, res, next) => {
    try {
        const updatedHotel: HotelType = req.body;
        console.log(`\nUpdateHotel: ${JSON.stringify(req.body, null, 2)}\n`);
        updatedHotel.lastUpdated = new Date();

        const hotelBefore = await Hotel.findOne({
            _id: req.body.hotelId,
        });

        if (!hotelBefore) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        // Find images to delete
        let deletedImages: string[] = [];

        if (updatedHotel.imageUrls) {
            deletedImages = hotelBefore.imageUrls.filter((publicId) => !updatedHotel.imageUrls.includes(publicId));
        } else {
            deletedImages = hotelBefore.imageUrls;
        }

        const deletedImagesPublicIds = getPublicIdsFromUrls(deletedImages);

        // console.log(deletedImagesPublicIds);

        if (deletedImagesPublicIds.length > 0) {
            // Delete images from Cloudinary
            await cloudinary.v2.api.delete_resources(deletedImagesPublicIds, function (error, result) {
                if (error) {
                    console.error("Error deleting images:", error);
                } else {
                    console.log("Images deleted:", result);
                }
            });
        }

        // updated geometry
        if (updatedHotel.city !== hotelBefore.city || updatedHotel.country !== hotelBefore.country) {
            const response = await geocodingClient
                .forwardGeocode({
                    query: `${updatedHotel.city}, ${updatedHotel.country}`,
                    limit: 1,
                })
                .send();
            // console.log(updatedHotel.city);

            if (!response.body.features || response.body.features.length === 0) {
                next(new Error("Geocoding failed: no results"));
            }

            if (!response.body.features[0].geometry || !response.body.features[0].geometry.type) {
                next(new Error("Geocoding failed: missing geometry"));
            }
            // console.log(response);
            updatedHotel.location = response.body.features[0].geometry;
        }

        const hotel = await Hotel.findOneAndUpdate(
            {
                _id: req.params.hotelId.toString(),
            },
            updatedHotel,
            { new: true },
        );

        if (!hotel) {
            return res.status(200).json({ message: "Hotel not found" });
        }
        // console.log(hotel.location);

        //add new file from user
        const files = req.files as Express.Multer.File[];

        const imageUploadResults = await uploadImages(files, updatedHotel.name);

        const updatedImageUrls = imageUploadResults.map((result) => result.secure_url) || [];

        hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || [])];

        await hotel.save();
        res.status(201).json(hotel);
    } catch (error) {
        next(new ExpressError(`Error updating hotel: ${error}`, 500));
    }
};

export const deleteHotel: RequestHandler = async (req, res) => {
    try {
        const hotel = await Hotel.findOneAndDelete({
            _id: req.params.hotelId,
        });

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        // Delete images from Cloudinary
        await cloudinary.v2.api.delete_resources(hotel.imagePublicIds, function (error, result) {
            if (error) {
                console.error("Error deleting images:", error);
            } else {
                console.log("Images deleted:", result);
            }
        });

        res.status(200).json({ message: "Hotel deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting hotel" + error });
    }
};

/*
    https://res.cloudinary.com/ddotdty4a/image/upload/v1715107230/hotels/ads/dp3hnoimgy0mhdm7kfty.jpg
   -> hotels/ads/dp3hnoimgy0mhdm7kfty
 */
const getPublicIdsFromUrls = (urls: string[]) => {
    return urls.map((url) => {
        const parts = url.split("/");
        const lastThreeParts = parts.slice(-3);
        lastThreeParts[2] = lastThreeParts[2].split(".")[0]; // remove the file extension from the last part
        return lastThreeParts.join("/");
    });
};
