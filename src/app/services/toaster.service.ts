import { MessageService } from 'primeng/api';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToasterService {
  messageService = inject(MessageService);

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
