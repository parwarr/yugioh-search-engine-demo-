import { Controller } from '@nestjs/common';
import { HomepageService } from './homepage.service';

@Controller('')
export class HomepageController {
  constructor(private readonly homepageService: HomepageService) {}
}
