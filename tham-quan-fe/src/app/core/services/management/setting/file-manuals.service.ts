import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { FileManuals } from 'src/app/core/models/setting/file-manuals.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class FileManualsService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleService: HandlerErrorService) {
    this.apiUrl = UrlConstant.API.FILE_MANUALS;
  }

  getAllFileManuals(): Observable<FileManuals[]> {
    return this.http.get<FileManuals[]>(this.apiUrl)
      .pipe(catchError(this.handleService.handleError));
  }

  getAllPagingFileManuals(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string): Observable<PagedResults<FileManuals>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search ?? '')
      .set('sort', sort ?? '')
      .set('column', column ?? '');

    return this.http.get<PagedResults<FileManuals>>(this.apiUrl + '/paging', { params })
      .pipe(catchError(this.handleService.handleError));
  }

  createFileManuals(model: FileManuals): Observable<FileManuals> {
    return this.http.post<FileManuals>(this.apiUrl, model)
      .pipe(catchError(this.handleService.handleError));
  }

  updateFileManuals(model: FileManuals, id: string): Observable<FileManuals> {
    return this.http.put<FileManuals>(this.apiUrl + `/${id}`, model)
      .pipe(catchError(this.handleService.handleError));
  }

  deleteFileManuals(id: string): Observable<FileManuals> {
    return this.http.delete<FileManuals>(this.apiUrl + `/${id}`)
      .pipe(catchError(this.handleService.handleError));
  }

}
