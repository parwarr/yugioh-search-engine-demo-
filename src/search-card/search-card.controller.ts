import {
  BadRequestException,
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SearchCardService } from './search-card.service';
import { YuGiOhCard } from '@prisma/client';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCardDto } from './dto/create-card.dto';

@Controller()
@ApiTags('cards')
export class SearchCardController {
  constructor(private readonly searchCardService: SearchCardService) {}

  // TODO: Only allow admins to upload files and create cards
  @Post()
  @ApiOperation({
    summary: 'Create Card',
    description: 'The create function is used to create a new card',
  })
  @ApiBody({
    type: CreateCardDto,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async createScreen(
    @Body() data: CreateCardDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png)$/ })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<CreateCardDto> {
    return this.searchCardService.createCard(data, file);
  }


  @Get()
  @ApiOperation({
    summary: 'Get all cards',
    description: 'The get endpoint is used to get all cards',
  })
  async findAllCards() {
    return this.searchCardService.findAllCards();
  }

  @Get('/:name')
  @ApiOperation({
    summary: 'Get one card by name',
    description: 'The get endpoint is used to get one card by its name',
  })
  @ApiParam({
    name: 'name',
    description: 'The name of the card',
    type: String,
  })
  async findCardByName(@Param('name') name: YuGiOhCard['name']): Promise<YuGiOhCard & { cardImagePresignedUrl: string }> {
    return this.searchCardService.findCardByName(name);
  }
}
