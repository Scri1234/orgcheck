import { LightningElement, wire, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import makeAPICallout from '@salesforce/apex/ApiCallout.makeAPICallout';

export default class ProductList extends LightningElement {
    @track isLoading = true;
    @track error;
    @track products;

    @wire(makeAPICallout)
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
            this.isLoading = false;
        } else if (error) {
            this.error = '';
            this.isLoading = false;
            
            // Customize the title and message for the toast notification
            const toastTitle = 'We are having trouble loading your schedule & Save subscriptions';
            const toastMessage = 'Please refresh the page or try again later.';
            
            this.showToast(toastTitle, toastMessage, 'error');
        }
    }

    showToast(title, message, variant) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }
}