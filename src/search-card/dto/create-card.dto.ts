import { ApiProperty } from '@nestjs/swagger';
import {
  cardTypeEnum,
  monsterAttributeEnum,
  monsterSubTypeEnum,
  monsterTypeEnum,
} from '@prisma/client';
import { File } from 'buffer';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCardDto {
  @ApiProperty({ description: 'The name of the card' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the card' })
  @IsNotEmpty()
  @IsString()
  desc: string;

  @ApiProperty({ description: 'The level of the card' })
  @IsNotEmpty()
  @IsNumber()
  level: number;

  @ApiProperty({ description: 'The attack of the card' })
  @IsNotEmpty()
  @IsNumber()
  atk: number;

  @ApiProperty({ description: 'The defense of the card' })
  @IsNotEmpty()
  @IsNumber()
  def: number;

  @ApiProperty({ description: 'If the card is a extra deck monster' })
  @IsNotEmpty()
  @IsBoolean()
  extraDeck: boolean;

  @ApiProperty({ description: 'The type of the card', enum: cardTypeEnum })
  @IsNotEmpty()
  @IsEnum(cardTypeEnum)
  cardType: cardTypeEnum;

  @ApiProperty({
    description: 'The type of the monster',
    enum: monsterTypeEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(monsterTypeEnum)
  monsterType?: monsterTypeEnum;

  @ApiProperty({
    description: 'The sub type of the monster',
    enum: monsterSubTypeEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(monsterSubTypeEnum)
  monsterSubType?: monsterSubTypeEnum;

  @ApiProperty({
    description: 'The attribute of the monster',
    enum: monsterAttributeEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(monsterAttributeEnum)
  monsterAttribute?: monsterAttributeEnum;

  @ApiProperty({
    description: 'The image of the card',
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  @Type(() => File)
  file: File;
}
