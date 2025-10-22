import { AbstractPaymentProvider } from "@medusajs/framework/utils"
import {
  InitiatePaymentInput,
  InitiatePaymentOutput,
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
  ProviderWebhookPayload
} from "@medusajs/framework/types"
import { getBankAccountById } from "./config"

class BankTransferService extends AbstractPaymentProvider {
  static identifier = "bank-transfer"

  constructor(container: Record<string, unknown>, options: Record<string, unknown>) {
    super(container, options)
  }

  async initiatePayment({ currency_code, amount, data, context }: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    const { bankAccountId } = data || {}

    // Bank account ID is optional during initial payment session creation
    // It will be validated later when the payment is actually processed
    let bankAccount: any = null
    if (bankAccountId) {
      bankAccount = getBankAccountById(bankAccountId as string)
      if (!bankAccount) {
        throw new Error("Invalid bank account selected")
      }
    }

    return {
      id: `bank_transfer_${Date.now()}`,
      data: {
        ...data,
        bankAccount,
        status: "pending",
        amount,
        currency_code,
      }
    }
  }

  async authorizePayment({ data, context }: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    const { bankAccountId } = data || {}

    // For bank transfers, we allow authorization without bank account ID
    // The bank account will be validated when the payment is captured
    let bankAccount: any = null
    if (bankAccountId) {
      bankAccount = getBankAccountById(bankAccountId as string)
      if (!bankAccount) {
        throw new Error("Invalid bank account selected")
      }
    }

    // For bank transfers, we authorize immediately but keep status as pending
    // This allows the order to be created while keeping payment pending
    return {
      status: "authorized",
      data: {
        ...data,
        bankAccountId,
        bankAccount,
        status: "pending",
      }
    }
  }

  async capturePayment({ data, context }: CapturePaymentInput): Promise<CapturePaymentOutput> {
    const { bankAccountId, bankAccount } = data || {}

    // For bank transfers, we can capture without requiring bank account ID
    // The bank account should already be stored in the payment session data
    let finalBankAccount = bankAccount

    // If we have a bankAccountId but no bankAccount object, fetch it
    if (bankAccountId && !bankAccount) {
      finalBankAccount = getBankAccountById(bankAccountId as string)
      if (!finalBankAccount) {
        throw new Error("Invalid bank account selected")
      }
    }

    // This is called when admin confirms the payment
    return {
      data: {
        ...data,
        bankAccount: finalBankAccount,
        status: "captured",
        captured_at: new Date().toISOString(),
      }
    }
  }

  async cancelPayment({ data, context }: CancelPaymentInput): Promise<CancelPaymentOutput> {
    return {
      data: {
        ...data,
        status: "canceled",
        canceled_at: new Date().toISOString(),
      }
    }
  }

  async refundPayment({ amount, data, context }: RefundPaymentInput): Promise<RefundPaymentOutput> {
    // For bank transfers, refunds would be manual
    return {
      data: {
        ...data,
        refund_amount: amount,
        refund_status: "pending",
        refunded_at: new Date().toISOString(),
      }
    }
  }

  async retrievePayment({ data }: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    return {
      data
    }
  }

  async getPaymentStatus({ data }: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    return {
      status: (data?.status as "pending" | "authorized" | "requires_more" | "error" | "canceled") || "pending"
    }
  }

  async deletePayment({ data }: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return {
      data: {
        ...data,
        status: "canceled",
        deleted_at: new Date().toISOString(),
      }
    }
  }

  async updatePayment({ data, currency_code, amount, context }: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    return {
      data: {
        ...data,
        currency_code,
        amount,
        updated_at: new Date().toISOString(),
      }
    }
  }

  async getWebhookActionAndData(webhookData: ProviderWebhookPayload["payload"]): Promise<WebhookActionResult> {
    // Bank transfers don't use webhooks, so this is a no-op
    return {
      action: "authorized",
      data: {
        session_id: (webhookData as any).id || "",
        amount: 0
      }
    }
  }
}

export default BankTransferService
