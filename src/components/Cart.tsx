"use client";
import { ShoppingCart } from "lucide-react";
import React from "react";
import {
  SheetTrigger,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";

export const Cart = () => {
  const itemCount = 0;
  const fee=1
  return (
    <Sheet>
      <SheetTrigger className=" group -m-2 flex items-center p-2">
        <ShoppingCart
          aria-hidden="true"
          className="  h6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className=" -row ml-2 text-sm text-gray-400 group-hover:text-gray-500">
          0
        </span>
      </SheetTrigger>
      <SheetContent className=" flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className=" space-y-2.5 pr-6">
          <SheetTitle>Cart(0)</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className=" flex w-full flex-col pr-6">
              {/* todo : cart logic */}
              <p>cart items</p>
            </div>
            <div className=" space-y-4 pr-6">
              <Separator />
              <div className=" space-y-1.5 text-sm">
                <div className=" flex ">
                  <span className=" flex-1">Shipping</span>
                  <span className=""> Free</span>
                </div>
                <div className=" flex ">
                  <span className=" flex-1"> Transaction Fee</span>
                  <span className="">{formatPrice(fee )} </span>
                </div>
                <div className=" flex ">
                  <span className=" flex-1"> Total</span>
                  <span className="">{formatPrice(fee )} </span>
                </div>
              </div>
              <SheetFooter>
                    <SheetTrigger asChild>
                    <Link href={'/cart'} className={buttonVariants({
                        className:' w-full'
                    })}>
                        Continue to Checkout
                    </Link>
                    </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className=" h-full flex flex-col items-center justify-center space-y-1">
            <div aria-hidden='true' className=" relative mb-4 h-60 w-60 text-muted-foreground">
                <Image src={'/hippo-empty-cart.png'} 
                fill
                alt="empty-cart"
                />

            </div>
            <div className=" text-xl font-semibold ">your cart is empty</div>
            <SheetTrigger asChild>
                <Link  className={buttonVariants({
                    variant:'link',
                    size:'sm',
                    className:' text-sm text-muted-foreground'
                })} href={'/products'}>

              Add items to your cart to checkout</Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
