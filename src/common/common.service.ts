import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  removeHtmlTags(value: string) {
    return value.replace(/<[^>]*>/g, '');
  }
}
