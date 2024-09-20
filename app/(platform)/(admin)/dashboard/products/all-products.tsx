import { DataTable } from "./data-table-products/data-table";
import { columns } from "./data-table-products/columns";
import { dataAllProducts } from "./data-table-products/data-all-products";

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

export function AllProducts() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={dataAllProducts} />
    </div>
  );
}
