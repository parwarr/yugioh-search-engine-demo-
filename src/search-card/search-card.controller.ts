import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { SearchCardService } from './search-card.service';
import { YuGiOhCard } from '@prisma/client';
import { ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/s3/s3.service';
import { CreateCardDto } from './dto/create-card.dto';


@Controller('search-card')
@ApiTags('Yu-Gi-Oh!')
export class SearchCardController {
  constructor(
    private readonly searchCardService: SearchCardService,
  ) {}


  // TODO: Only allow admins to upload files and create cards
  @Post()
  @ApiOperation({
    summary: 'Create a new card',
    description: 'The post endpoint is used to create a new card',
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async createCard(
    @Body() CardData: CreateCardDto,
    @UploadedFile() file: Express.Multer.File): Promise<CreateCardDto> {
      console.log(CardData);
      return this.searchCardService.createCard(CardData, file);
  }

  @Get()
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
  async findCardByName(
    @Param('name') name: YuGiOhCard['name'],
  ) {
    return this.searchCardService.findCardByName(name);
  }
}
