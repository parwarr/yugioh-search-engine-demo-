import { Controller, Get, Param, Res } from '@nestjs/common';
import { SearchCardService } from './search-card.service';
import { YuGiOhCard } from '@prisma/client';
import {  ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';



@Controller('search-card')
@ApiTags('Yu-Gi-Oh!')
export class SearchCardController {
  constructor(
    private readonly searchCardService: SearchCardService,
  ) {}

  @Get()
  async findAllCards() {
    return this.searchCardService.findAllCards();
  }


  @Get('/:name')
  @ApiOperation({
    summary: 'Get all screens',
    description: 'The get function is used to get all the screens locations',
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
