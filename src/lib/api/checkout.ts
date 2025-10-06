/**
 * Checkout API Service
 * 
 * Handles checkout operations (carts, line items, sessions) via Medusa Store API
 * Medusa Cart API: https://docs.medusajs.com/api/store#carts
 */

import { medusaFetch } from './medusa-fetch';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface Cart {
  id: string;
  email?: string;
  billing_address?: Address;
  shipping_address?: Address;
  items: LineItem[];
  region_id?: string;
  customer_id?: string;
  payment_session?: PaymentSession;
  payment_sessions?: PaymentSession[];
  shipping_methods?: ShippingMethod[];
  subtotal?: number;
  discount_total?: number;
  tax_total?: number;
  shipping_total?: number;
  total?: number;
  currency_code?: string;
  metadata?: Record<string, unknown>;
}

export interface LineItem {
  id: string;
  cart_id: string;
  variant_id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  total: number;
  metadata?: Record<string, unknown>;
}

export interface Address {
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  country_code?: string;
  province?: string;
  postal_code?: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentSession {
  id: string;
  cart_id: string;
  provider_id: string;
  is_selected: boolean;
  status: string;
  data?: Record<string, unknown>;
}

export interface ShippingMethod {
  id: string;
  shipping_option_id: string;
  cart_id?: string;
  order_id?: string;
  price: number;
  data?: Record<string, unknown>;
}

export interface CheckoutSession {
  id: string;
  cart_id: string;
  payment_session?: PaymentSession;
  status: string;
  metadata?: Record<string, unknown>;
}

// ============================================================================
// CHECKOUT FUNCTIONS
// ============================================================================

/**
 * Create a new cart
 * 
 * @param data Cart creation data
 * @returns Created cart
 */
export async function createCart(data: {
  region_id?: string;
  country_code?: string;
  email?: string;
  sales_channel_id?: string;
}) {
  try {
    const response = await medusaFetch<{
      cart: Cart;
    }>('/store/carts', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return {
      cart: response.data.cart,
    };
  } catch (error) {
    console.error('[createCart] Error:', error);
    throw error;
  }
}

/**
 * Add line item to cart
 * 
 * @param cartId Cart ID
 * @param data Line item data
 * @returns Updated cart
 */
export async function addLineItem(
  cartId: string,
  data: {
    variant_id: string;
    quantity: number;
    metadata?: Record<string, unknown>;
  }
) {
  try {
    const response = await medusaFetch<{
      cart: Cart;
    }>(`/store/carts/${cartId}/line-items`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    return {
      cart: response.data.cart,
    };
  } catch (error) {
    console.error('[addLineItem] Error:', error);
    throw error;
  }
}

/**
 * Update line item quantity
 * 
 * @param cartId Cart ID
 * @param lineItemId Line item ID
 * @param quantity New quantity
 * @returns Updated cart
 */
export async function updateLineItem(
  cartId: string,
  lineItemId: string,
  quantity: number
) {
  try {
    const response = await medusaFetch<{
      cart: Cart;
    }>(`/store/carts/${cartId}/line-items/${lineItemId}`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    });

    return {
      cart: response.data.cart,
    };
  } catch (error) {
    console.error('[updateLineItem] Error:', error);
    throw error;
  }
}

/**
 * Remove line item from cart
 * 
 * @param cartId Cart ID
 * @param lineItemId Line item ID
 * @returns Updated cart
 */
export async function removeLineItem(cartId: string, lineItemId: string) {
  try {
    const response = await medusaFetch<{
      cart: Cart;
    }>(`/store/carts/${cartId}/line-items/${lineItemId}`, {
      method: 'DELETE',
    });

    return {
      cart: response.data.cart,
    };
  } catch (error) {
    console.error('[removeLineItem] Error:', error);
    throw error;
  }
}

/**
 * Create checkout session / initialize payment
 * 
 * @param data Session creation data
 * @returns Checkout session
 */
export async function createCheckoutSession(data: {
  cart_id: string;
  provider_id?: string;
}) {
  try {
    // NOTE: Exact endpoint may vary based on Medusa payment provider setup
    // This is a simplified implementation
    const response = await medusaFetch<{
      payment_session: PaymentSession;
    }>(`/store/carts/${data.cart_id}/payment-sessions`, {
      method: 'POST',
      body: JSON.stringify({
        provider_id: data.provider_id || 'manual',
      }),
    });

    return {
      session: {
        id: response.data.payment_session.id,
        cart_id: data.cart_id,
        payment_session: response.data.payment_session,
        status: response.data.payment_session.status,
      } as CheckoutSession,
    };
  } catch (error) {
    console.error('[createCheckoutSession] Error:', error);
    throw error;
  }
}

/**
 * Complete cart (finalize order)
 * 
 * @param cartId Cart ID
 * @returns Completed order
 */
export async function completeCart(cartId: string) {
  try {
    const response = await medusaFetch<{
      order: any; // Order type depends on Medusa version
      type: string;
      data: any;
    }>(`/store/carts/${cartId}/complete`, {
      method: 'POST',
    });

    return {
      order: response.data.order || response.data.data,
      type: response.data.type,
    };
  } catch (error) {
    console.error('[completeCart] Error:', error);
    throw error;
  }
}
