import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";
import { getCategories } from "@/lib/api";
import { Routes } from "@/config/routes";

const Header = () => {
  const categories = [...getCategories];
  return (
    <header className={css.header}>
      <Link href={Routes.Home} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href={Routes.Home}>Home</Link>
          </li>
          <li>
            <TagsMenu categories={categories} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
