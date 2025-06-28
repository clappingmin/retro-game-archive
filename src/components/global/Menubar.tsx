import * as api from '@/shared/services/admin/category';

export default async function Menubar() {
  const categories = await api.getAllCategories();
  const subcategories = await api.getAllSubcategories();

  return (
    <div className="w-full bg-primary-500">
      <div className="layout"></div>
    </div>
  );
}
