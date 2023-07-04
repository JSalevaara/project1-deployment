import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "../services/listService.js"
import * as requestUtils from "../utils/requestUtils.js"
import * as itemService from "../services/itemService.js"

const addItemToList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/")
    await itemService.addItem(urlParts[2], name)

    return requestUtils.redirectTo(`/lists/${urlParts[2]}`)
}

const viewItems = async (request) => {
    const url = new URL(request.url)
    const urlParts = url.pathname.split("/")
    const data = {
        list: await listService.findById(urlParts[2]),
        items: await itemService.findById(urlParts[2])
    }

    return new Response(await renderFile("list.eta", data), requestUtils.responseDetails)
}

const collectItem = async (request) => {
    const url = new URL(request.url)
    const urlParts = url.pathname.split("/")
    await itemService.collectById(urlParts[4])

    return requestUtils.redirectTo(`/lists/${urlParts[2]}`)
}

const itemCount = async () => {
    return await itemService.countItems()
  }

export {viewItems, addItemToList, collectItem, itemCount}