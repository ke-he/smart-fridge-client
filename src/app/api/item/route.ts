import {
  ResponseDto,
  RouterInterface,
} from '@/lib/common/interface/router.interface';

class ItemRoute implements RouterInterface {
  static GET(): ResponseDto<string> {
    return RouterInterface.response('Test');
  }
}

export const GET = ItemRoute.GET;
