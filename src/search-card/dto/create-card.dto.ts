import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'The name of the card', type: 'string' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the card', type: 'string' })
  @IsNotEmpty()
  @IsString()
  desc: string;

  @ApiProperty({
    description: 'The level of the card',
    type: 'number',
    minLength: 1,
    maxLength: 12,
  })
  @IsNotEmpty()
  @IsNumber()
  level: number;

  @ApiProperty({ description: 'The attack of the card', type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  atk: number;

  @ApiProperty({ description: 'The defense of the card', type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  def: number;

  @ApiProperty({
    description: 'If the card is an extra deck monster',
    type: 'boolean',
    default: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  extraDeck: boolean;

  @ApiProperty({
    description: 'The type of the card',
    enum: cardTypeEnum,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(cardTypeEnum, { message: 'Invalid card type' })
  cardType: cardTypeEnum;

  @ApiPropertyOptional({
    description: 'The type of the monster',
    enum: monsterTypeEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(monsterTypeEnum, { message: 'Invalid monster type' })
  monsterType?: monsterTypeEnum;

  @ApiPropertyOptional({
    description: 'The sub type of the monster',
    enum: monsterSubTypeEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(monsterSubTypeEnum, { message: 'Invalid monster sub type' })
  monsterSubType?: monsterSubTypeEnum;

  @ApiPropertyOptional({
    description: 'The attribute of the monster',
    enum: monsterAttributeEnum,
    required: false,
  })
  @IsOptional()
  @IsEnum(monsterAttributeEnum, { message: 'Invalid monster attribute' })
  monsterAttribute?: monsterAttributeEnum;

  @ApiProperty({
    description: 'The file to upload',
    type: 'string',
    format: 'binary',
    required: true,
  })
  // @IsNotEmpty()
  @Type(() => File)
  file: File;
}
