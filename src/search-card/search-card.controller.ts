import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { YuGiOhCard } from '@prisma/client';
import { CreateCardDto } from './dto/create-card.dto';
import { SearchCardService } from './search-card.service';

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

  @Get('Cards')
  @ApiOperation({
    summary: 'Get all cards',
    description: 'The get endpoint is used to get all cards',
  })
  async findAllCards(): Promise<YuGiOhCard[]> {
    return this.searchCardService.findAllCards();
  }

  @Get('name')
  @ApiOperation({
    summary: 'Get one card by name',
    description: 'The get endpoint is used to get one card by its name',
  })
  async findCardByName(@Query('name') name: string): Promise<YuGiOhCard> {
    return this.searchCardService.findCardByName(name);
  }
}
