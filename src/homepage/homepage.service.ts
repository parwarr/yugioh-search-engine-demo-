import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private prisma: PrismaService) {}

  async startPage(): Promise<string> {
    return 'Welcome to the Yu-Gi-Oh! API';
  }
}
