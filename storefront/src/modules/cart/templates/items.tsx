import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Heading, Table } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  return (
    <div>
      <div className="pb-3 flex items-center">
        <Heading className="font-serif text-3xl text-brand-dark">Panier</Heading>
      </div>
      <Table>
        <Table.Header className="border-t-0">
          <Table.Row className="text-brand-dark text-sm font-serif bg-brand-light">
            <Table.HeaderCell className="!pl-0 bg-brand-light text-brand-dark">Article</Table.HeaderCell>
            <Table.HeaderCell className="bg-brand-light"></Table.HeaderCell>
            <Table.HeaderCell className="bg-brand-light text-brand-dark">Quantité</Table.HeaderCell>
            <Table.HeaderCell className="hidden small:table-cell bg-brand-light text-brand-dark">
              Prix
            </Table.HeaderCell>
            <Table.HeaderCell className="!pr-0 text-right bg-brand-light text-brand-dark">
              Total
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items
            ? items
              .sort((a, b) => {
                return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              })
              .map((item) => {
                return (
                  <Item
                    key={item.id}
                    item={item}
                    currencyCode={cart?.currency_code}
                  />
                )
              })
            : repeat(5).map((i) => {
              return <SkeletonLineItem key={i} />
            })}
        </Table.Body>
      </Table>
    </div>
  )
}

export default ItemsTemplate
