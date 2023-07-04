import { serve } from "./deps.js";
import { configure, renderFile } from "./deps.js"
import * as shoppingListController from "./controllers/listController.js"
import * as statisticsController from "./controllers/statisticsController.js"
import * as itemController from "./controllers/itemController.js"

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url)
  if (request.method === "GET" && url.pathname === "/lists") {
    return await shoppingListController.viewLists(request)
  } else if (request.method === "POST" && url.pathname === "/lists") {
    return await shoppingListController.addList(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await itemController.viewItems(request);
  } else if (request.method === "POST" && url.pathname.match("lists/[0-9]+/deactivate")) {
    return await shoppingListController.deactivateList(request)
  } else if (request.method === "POST" && url.pathname.match("lists/[0-9]+/items") && !url.pathname.endsWith("collect")) {
    return await itemController.addItemToList(request)
  } else if (request.method === "POST" && url.pathname.match("lists/[0-9]+/items/[0-9]+/collect")) {
    return await itemController.collectItem(request);
  } else if (url.pathname === "/") {
    return await statisticsController.showStats()
  } else if (url.pathname === "/test") { 
    return new Response("Hello world!");
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
