import { ProductForm } from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div className="py-4">
      <ProductForm isEdit={false} />
    </div>
  );
}
