import { HttpClientService } from './../http-client.service';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { GenerateImage } from 'src/app/contracts/openai-image/generate-image';
@Injectable({
  providedIn: 'root'
})
export class OpenaiImageService {

  constructor(private httpClientService: HttpClientService) { }
  async generate(generateImageParameters: GenerateImageParameters, SuccessCallBack?: () => void, ErrorCallBack?: (errorMessage: string) => void): Promise<GenerateImage> {
    const promiseData = this.httpClientService.post<GenerateImage>({
      controller: "openai",
      action: "generate-image"
    }, {
      prompt: generateImageParameters.prompt,
      size: generateImageParameters.size
    }).toPromise();

    promiseData.then(() => SuccessCallBack()).catch((errorResponse: HttpErrorResponse) => {
      ErrorCallBack(errorResponse.message);
    });

    return await promiseData;
  }


}

export class GenerateImageParameters {
  prompt: string;
  size: ImageSize;
}

export enum ImageSize {
  small = "256x256",
  medium = "512x512",
  large = "1024x1024"
}