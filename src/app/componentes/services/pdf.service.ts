import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }
  descargarPdf(nombreArchivo:string, divImprimir:string)
  {
    //this.spinner.show();

    const DATA: any = document.getElementById(divImprimir);
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      backgroud: 'white',
      scale: 3
    };

    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(nombreArchivo);
        //this.spinner.hide();
      })
  }
}
