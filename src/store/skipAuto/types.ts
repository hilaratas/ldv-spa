import {skipAutoInterface, skipAutoItem, skipAutoTypes} from "@/typings";

export interface skipAutoState {
  singIn?: skipAutoItem
  singUp?: skipAutoItem
  [key: string]: any
}

export type paramInfo = {
  [key in skipAutoTypes]: skipAutoItem;
};