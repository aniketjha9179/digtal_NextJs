"use client";
import React from "react";
import { Button } from "./ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}
export const NavItem = ({
  category,
  handleOpen,
  isAnyOpen,
  isOpen,
}: NavItemProps) => {
  // console.log("Category:", category);

  return (
    <div className=" flex ">
      <div className=" relative flex items-center ">
        <Button
          variant={isOpen ? "secondary" : "ghost"}
          onClick={handleOpen}
          className=" gap-1.5"
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 w-4 transition-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>
      {isOpen ? (
        <div
          className={cn(
            "absolute inset-x-0  top-full text-sm text-muted-foreground",
            {
              " animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            }
          )}
        ></div>
      ) : null}
    </div>
  );
};
