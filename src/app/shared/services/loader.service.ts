import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { defer, NEVER } from 'rxjs';
import { finalize, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(private spinner: NgxSpinnerService) { }

  public readonly spinner$ = defer(() => {
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
    return NEVER.pipe(finalize(() => {
      this.spinner.hide();
    }));
  }).pipe(share());
}
