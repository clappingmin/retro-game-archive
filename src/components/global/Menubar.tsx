import * as api from '@/shared/services/admin/category';
import { GameCategory } from '@/shared/types/game';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export default async function Menubar() {
  const categories = await api.getAllCategories();
  const subcategories = await api.getAllSubcategories();

  return (
    <div className="w-full bg-primary-500">
      <div className="layout">
        <NavigationMenu>
          <NavigationMenuList>
            {categories.map((category: GameCategory) => (
              <NavigationMenuItem key={category.id}>
                <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href={'/'}>Home</Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href={'/'}>Home</Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href={'/'}>Home</Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href={'/'}>Home</Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
