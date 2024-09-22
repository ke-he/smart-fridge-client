import { NextRequest, NextResponse } from 'next/server';

export type ResponseDto<T> = NextResponse<{ body: T }>;

export abstract class RouterInterface {
  static response<T>(data: T): ResponseDto<T> {
    return NextResponse.json({ body: data });
  }

  static GET<T>(_request?: NextRequest & { body?: T }): ResponseDto<string> {
    return RouterInterface.response('Method Not Allowed');
  }

  static POST?<T>(_request?: NextRequest & { body?: T }): ResponseDto<string> {
    return NextResponse.json({ body: 'Method Not Allowed' });
  }

  static PUT?<T>(_request?: NextRequest & { body?: T }): ResponseDto<string> {
    return NextResponse.json({ body: 'Method Not Allowed' });
  }

  static DELETE?<T>(
    _request?: NextRequest & { body?: T },
  ): ResponseDto<string> {
    return NextResponse.json({ body: 'Method Not Allowed' });
  }
}
