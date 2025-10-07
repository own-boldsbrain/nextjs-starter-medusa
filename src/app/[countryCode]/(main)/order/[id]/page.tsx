import { Metadata } from "next"
import { notFound } from "next/navigation"

import { listOrders } from "@lib/data/orders"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"

type Props = {
    params: Promise<{ id: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params
    const { id } = params

    const order = await listOrders()
        .then((orders) => orders?.find((o) => o.id === id))
        .catch(() => null)

    if (!order) {
        notFound()
    }

    return {
        title: `Pedido ${order.display_id} | Yello Solar Hub`,
        description: `Detalhes do pedido ${order.display_id} realizado em ${new Date(order.created_at).toLocaleDateString('pt-BR')}`,
    }
}

export default async function OrderDetail(props: Props) {
    const params = await props.params
    const { id } = params

    const order = await listOrders()
        .then((orders) => orders?.find((o) => o.id === id))
        .catch(() => null)

    if (!order) {
        notFound()
    }

    return <OrderCompletedTemplate order={order} />
}
