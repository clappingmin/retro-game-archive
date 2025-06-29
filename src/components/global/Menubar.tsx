import * as api from '@/shared/services/admin/category';
import { GameSubcategory } from '@/shared/types/game';

export default async function Menubar() {
  const categories = await api.getAllCategories();
  const subcategories = await api.getAllSubcategories();
  const subcategoryMap = new Map<number, GameSubcategory[]>();

  subcategories.forEach((sub) => {
    const list = subcategoryMap.get(sub.categoryId) ?? [];
    list.push(sub);
    subcategoryMap.set(sub.categoryId, list);
  });

  return (
    <div className="w-full bg-primary-500">
      <div className="layout">
        <ul className="grid w-full grid-cols-[repeat(auto-fill,_minmax(100px,1fr))] p-0">
          {categories.map((category) => (
            <div key={category.id} className="dropdown dropdown-hover cursor-pointer">
              {subcategoryMap.get(category.id!) ? (
                <>
                  <div>{category.name}</div>
                  <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    {subcategoryMap.get(category.id!)?.map((subcategory) => (
                      <li key={subcategory.id}>
                        <a className="whitespace-nowrap">{subcategory.name}</a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="whitespace-nowrap">{category.name}</div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
