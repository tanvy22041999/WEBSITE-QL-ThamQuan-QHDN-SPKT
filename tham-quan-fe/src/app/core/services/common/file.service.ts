import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from '../../constants/url.constant';
import { FileInfo, ListFilesPatch } from '../../models/common/file.model';
import { HandlerErrorService } from './handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = UrlConstant.API.FILE;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandlerErrorService) { }

  uploadFile(file: File, subFolder: string): Observable<FileInfo> {
    const fd = new FormData();
    fd.append('file', file, file.name);
    const params = new HttpParams()
      .set('name', file.name)
      .set('subFolder', subFolder);

    return this.http
      .post<FileInfo>(this.apiUrl, fd, { params })
      .pipe(catchError(this.handleErrorService.handleError));
  }

  uploadMultiFile(files: File[], subFolder: string): Observable<FileInfo[]> {
    if (files.length) {
      const uploadingQueue = [];
      Array.from(files).forEach(file => {
        const fd = new FormData();
        fd.append('file', file, file.name);
        const params = new HttpParams()
          .set('name', file.name)
          .set('subFolder', subFolder);
        uploadingQueue.push(
          this.http
            .post<FileInfo>(this.apiUrl, fd, { params })
            .pipe(catchError(this.handleErrorService.handleErrorForkJoin))
        );
      });
      return forkJoin(uploadingQueue) as Observable<FileInfo[]>;
    } else {
      return of(null);
    }
  }

  getFileInfo(idFile: string): Observable<FileInfo> {
    return this.http
      .get<FileInfo>(this.apiUrl + `/${idFile}`)
      .pipe(catchError(this.handleErrorService.handleError));
  }

  viewFile(idFile: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrl + `/view/${idFile}`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleErrorService.handleError));
  }

  downloadFile(idFile: string): Observable<HttpResponse<Blob>> {
    return this.http
      .get(this.apiUrl + `/download/${idFile}`, { observe: 'response', responseType: 'blob' })
      .pipe(catchError(this.handleErrorService.handleError));
  }

  convertFileFromBlob(data: Blob, fileName: string) {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  // Utils core ///////////////////////////////////////////////////////////////////
  extractFileFromListId(listFileId: string[]) {
    if (listFileId.length && !listFileId.includes(null)) {
      const returnList = [];
      listFileId.forEach(idFile => {
        returnList.push({
          id: idFile
        });
      });
      return returnList;
    } else {
      return [];
    }
  }

  setListIdFileToForm(listFiles: ListFilesPatch[], formControlName: string, form: FormGroup): void {
    form.get(formControlName).setValue(listFiles.length ? listFiles.map(x => x.id) : null);
  }

  setIdFileToForm(listFiles: ListFilesPatch[], formControlName: string, form: FormGroup): void {
    form.get(formControlName).setValue(listFiles.length ? listFiles[0].id : null);
  }

  b64toBlob(
    b64DataRaw: string,
    contentTypeInput?: string,
    sliceSizeInput?: number): Blob { // contentTypeInput=image/png ; sliceSize=512 data:image/png;base64,
    const contentType = contentTypeInput ?? 'image/jpeg';
    const sliceSize = sliceSizeInput ?? 512;
    const byteCharacters = atob(b64DataRaw.replace(/^data:.+;base64,/, ''));
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  blobToFile(theBlob: Blob, fileName: string): File {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const b: any = theBlob;

    // A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    // Cast to a File() type
    return (theBlob as File);
  }

  blobToB64(blobObj: Blob, localStorageVar: string): void {
    const reader = new FileReader();
    reader.readAsDataURL(blobObj);
    reader.onloadend = () => {
      const tmpBase64 = String(reader.result);
      // remove "data:*********;base64," (using to define file type) from blob
      localStorage.setItem(localStorageVar, tmpBase64.substr(tmpBase64.indexOf(',') + 1));
    };
  }
}
