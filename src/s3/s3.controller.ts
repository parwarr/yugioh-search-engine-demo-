import {
  Controller,
  FileTypeValidator,
  Get,
  Logger,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { S3Service } from './s3.service';

@ApiTags('s3')
@Controller('s3')
export class S3Controller {
  private readonly logger = new Logger(S3Controller.name);
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
    @Res() res: any,
  ) {
    try {
      await this.s3Service.uploadFile(file);

      return res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to upload image' });
    }
  }

  @Get(':bucket/:fileKey')
  @ApiParam({
    name: 'bucket',
    type: String,
  })
  @ApiParam({
    name: 'fileKey',
    type: String,
  })
  async getPresignedUrl(
    @Param('bucket') bucket: string,
    @Param('fileKey') fileKey: string,
  ): Promise<string> {
    this.logger.log(`Getting image details for image with key: ${fileKey}`);
    return this.s3Service.getPresignedUrl({ bucket, fileKey });
  }
}
