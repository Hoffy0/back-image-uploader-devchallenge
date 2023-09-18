import { Body, Controller, Get, Post, UploadedFile, UseInterceptors, ConflictException, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {

    constructor(
        private imagesService: ImagesService,
    ) {}

    @Get()
    getImages(): string {
        return 'This will return all images';
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(@UploadedFile() image: any): Promise<any> {
        // return 'This will upload an image';
        // console.log(image);
        try {
            return await this.imagesService.uploadImage(image);
        } catch (err) {
            if(err.code === 11000){
                console.log(err);
                throw new ConflictException('Image already exists');
            }
            throw err;
        }
    }

    @Get('/:uuid')
    async getImage(@Param('uuid') uuid: string, @Res() res: Response){
        // return 'This will return an image';
        // await console.log(uuid);
        try {
            // Obtiene la imagen en base64 desde la base de datos
            const imageBase64 = await this.imagesService.getImage(uuid);;
      
            if (!imageBase64) {
              return res.status(404).json({ error: 'Imagen no encontrada' });
            }
      
            // Configura la respuesta HTTP con el tipo de contenido adecuado y envía la imagen en base64
            res.header('Content-Type', 'image/png'); // Ajusta el tipo de contenido según el formato de la imagen.
            res.send(Buffer.from(imageBase64.image, 'base64'));
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
          }
    }
}
