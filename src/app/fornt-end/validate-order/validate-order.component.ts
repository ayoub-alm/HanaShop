import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, signal} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {BehaviorSubject, Subscription} from "rxjs";
import {ProductInOrderDto} from "../../Dtos/product-in-order.dto";
import {OrderService} from "../../services/OrderService";
import {
    MatAccordion,
    MatExpansionPanel, MatExpansionPanelActionRow,
    MatExpansionPanelDescription, MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {FooterComponent} from "../footer/footer.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {OrdersApiService, PaymentMethod} from '../../services/orders.api.service';

@Component({
  selector: 'app-validate-order',
  standalone: true,
    imports: [
        AsyncPipe,
        MatButton,
        MatIcon,
        MatIconButton,
        MatToolbar,
        NgForOf,
        NgIf,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelTitle,
        MatExpansionPanelDescription,
        MatExpansionPanelHeader,
        MatExpansionPanelActionRow,
        FooterComponent,
        ReactiveFormsModule
    ],
  templateUrl: './validate-order.component.html',
  styleUrl: './validate-order.component.css'
})
export class ValidateOrderComponent implements OnInit, OnDestroy {
    @Input()
    public products: BehaviorSubject<ProductInOrderDto[]> = new BehaviorSubject<ProductInOrderDto[]>([]); // Local products array
    public totalAmount: string = '0'; // Local total amount
    private orderSubscription!: Subscription;
    @Output() closeDrawer = new EventEmitter<any>();
    step = signal(0);
    checkoutForm!: FormGroup;
    isSubmitting = false;
    submitError: string | null = null;
    submitSuccess: string | null = null;
    selectedPaymentMethod: PaymentMethod = 'COD';

    constructor(private orderService: OrderService, private fb: FormBuilder, private ordersApi: OrdersApiService) {}

    ngOnInit(): void {
        this.orderService.order$.subscribe((data)=>{
            this.products.next(data.products)
            this.totalAmount = this.calculateTotalAmount(data.products).toString()
        })
        this.checkoutForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(3)]],
            phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{8,15}$/)]],
            address: ['', [Validators.required, Validators.minLength(5)]],
            city: ['', [Validators.required, Validators.minLength(2)]],
            notes: ['']
        });
    }

    // Calculate the total amount for the order
    private calculateTotalAmount(products: ProductInOrderDto[]): number {
        return products.reduce((acc, product) => {
            const price = parseFloat(product.product.price?.toString() || '0');
            return acc + price * product.quantity;
        }, 0);
    }

    removeFromBasket(product: ProductInOrderDto): void {
        console.log('Removing product:', product);

        // Get the current order
        const currentOrder = this.orderService.orderSubject.getValue();

        // Filter out the product by its ID or unique property
        currentOrder.products = currentOrder.products.filter(prd => prd.product.ref !== product.product.ref);

        // Recalculate the total amount after removal
        currentOrder.totalAmount = this.calculateTotalAmount(currentOrder.products);

        // Update the order in the BehaviorSubject
        this.orderService.updateOrder(currentOrder);
    }


    increaseQuantity(product: ProductInOrderDto) {
        const currentOrder = this.orderService.orderSubject.getValue();
        const target = currentOrder.products.find(p => p.product.ref === product.product.ref);
        if (target) {
            target.quantity = target.quantity + 1;
            currentOrder.totalAmount = this.calculateTotalAmount(currentOrder.products);
            this.orderService.updateOrder(currentOrder);
        }
    }

    decreaseQuantity(product: ProductInOrderDto) {
        const currentOrder = this.orderService.orderSubject.getValue();
        const target = currentOrder.products.find(p => p.product.ref === product.product.ref);
        if (!target) return;
        if (target.quantity > 1) {
            target.quantity = target.quantity - 1;
            currentOrder.totalAmount = this.calculateTotalAmount(currentOrder.products);
            this.orderService.updateOrder(currentOrder);
        }
    }

    generateWhatsAppMessage() {
        let message = `🛒 *Order Details:*\n\n`;
        this.products.getValue().forEach(product => {
            message += `📌 ${product.product.name}\n`;
            message += `  ➡️ Quantity: ${product.quantity}\n`;
            message += `  💰 Price: ${product.product.price} MAD each\n\n`;
        });
        message += `🧾 *Total Amount*: ${this.totalAmount} MAD\n`;
        message += `\n🚀 *Please confirm your order!*`;

        // Encode the message for WhatsApp
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

        // Open WhatsApp with the generated message
        window.open(whatsappUrl, '_blank');
    }


    onCloseBasket() {
        this.closeDrawer.emit();
    }


    // Clean up the subscription when the component is destroyed

    ngOnDestroy(): void {
        if (this.orderSubscription) {
            this.orderSubscription.unsubscribe();
        }
    }

    restOrder() {
        this.orderService.resetOrder()
    }


    trackByProduct(index: number, item: any) {
        return item.product.id || index; // Replace with unique product ID if available
    }

    setStep(index: number) {
        this.step.set(index);
    }

    nextStep() {
        this.step.update(i => i + 1);
    }

    prevStep() {
        this.step.update(i => i - 1);
    }

    protected readonly parseInt = parseInt;

    submitOrder() {
        if (this.products.getValue().length === 0) {
            this.submitError = 'Votre panier est vide.';
            return;
        }
        if (this.checkoutForm.invalid) {
            this.checkoutForm.markAllAsTouched();
            return;
        }
        this.isSubmitting = true;
        this.submitError = null;
        this.submitSuccess = null;

        const formValue = this.checkoutForm.value;
        const items = this.products.getValue().map(p => ({ productRef: p.product.ref, quantity: p.quantity }));
        const total = Number(this.totalAmount);

        this.ordersApi.createOrder({
            fullName: formValue.fullName,
            phone: formValue.phone,
            address: formValue.address,
            city: formValue.city,
            notes: formValue.notes,
            paymentMethod: this.selectedPaymentMethod,
            items,
            totalAmount: total
        }).subscribe({
            next: (res) => {
                this.isSubmitting = false;
                this.submitSuccess = 'Commande envoyée avec succès!';
                if (this.selectedPaymentMethod === 'WHATSAPP') {
                    // Open WhatsApp prefilled message for confirmation
                    this.generateWhatsAppMessage();
                }
                this.orderService.resetOrder();
                this.checkoutForm.reset();
                this.setStep(0);
            },
            error: (err) => {
                this.isSubmitting = false;
                this.submitError = err?.error?.message || 'Une erreur est survenue lors de l\'envoi.';
            }
        });
    }
}
