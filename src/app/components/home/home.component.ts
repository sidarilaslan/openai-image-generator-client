import { NgxSpinnerService } from 'ngx-spinner';
import { ImageSize, OpenaiImageService } from './../../services/models/openai-image.service';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/custom-toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {
  imgElement: any;
  btnGroupHidden: boolean = true;
  @ViewChild('imageContainer') imageContainer: ElementRef<HTMLInputElement>;

  constructor(private openaiImageService: OpenaiImageService, private ngxSpinnerService: NgxSpinnerService, private renderer: Renderer2, private customToastrService: CustomToastrService) {
  }


  async generateImage(txtPrompt: HTMLInputElement) {
    this.ngxSpinnerService.show();
    const responseData = await this.openaiImageService.generate({
      prompt: txtPrompt.value,
      size: ImageSize.small
    }, () => {

      this.ngxSpinnerService.hide();
    }, (errorMessage: string) => {
      this.customToastrService.message(errorMessage, "Error", { messageType: ToastrMessageType.Error, position: ToastrPosition.BottomRight });
      this.ngxSpinnerService.hide();
    });
    //!todo need refactor
    this.imgElement = this.btnGroupHidden ? this.renderer.createElement("img") : document.querySelector(".genereted-image");
    this.renderer.setAttribute(this.imgElement, "src", responseData.url);
    this.renderer.addClass(this.imgElement, "genereted-image");
    this.imageContainer.nativeElement.prepend(this.imgElement);
    txtPrompt.value = null;
    this.btnGroupHidden = false;
    //

  }


}

