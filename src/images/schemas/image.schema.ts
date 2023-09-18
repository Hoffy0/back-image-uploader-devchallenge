import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'

@Schema({
    timestamps: true,
    _id: false,
    
})

export class Image {

    @Prop({
        type: String,
        required: true,
        unique: true,
    })
    _id: string;

    @Prop({
        type: String,
        // required: true,
    })
    image: any;

    @Prop({
        type: Boolean,
        // required: true,
        default: true,
    })
    visible: boolean;

}

export const ImageSchema = SchemaFactory.createForClass(Image);