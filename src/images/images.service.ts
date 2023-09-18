import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './schemas/image.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImagesService {
    constructor(
        @InjectModel(Image.name) private imageModel: Model<Image>,
    ) {}

    // CREATE
    async uploadImage(image: any) {
        const base64Img = image.buffer.toString('base64');
        // console.log(base64Img);
        const newImage = new this.imageModel({
            _id: uuidv4(),
            image: base64Img,
            visible: true,
        });
        await newImage.save();
        return newImage;
    }

    // READ
    async getImage(uuid: string){
        const image = await this.imageModel.findOne({ _id: uuid });
        // console.log(image);
        return image;
    }

    // UPDATE

    // DELETE
}
