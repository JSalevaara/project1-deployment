import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "../services/listService.js"
import * as requestUtils from "../utils/requestUtils.js"
import * as shoppingListController from "./listController.js"
import * as itemController from "./itemController.js"

const showStats = async () => {
    const data = {
        listCount: await shoppingListController.listCount(),
        itemCount: await itemController.itemCount()
    }
    return await new Response(await renderFile("mainPage.eta", data), requestUtils.responseDetails)
}

export {showStats}