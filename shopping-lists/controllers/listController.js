import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as listService from "../services/listService.js"
import * as requestUtils from "../utils/requestUtils.js"


const viewLists = async (request) => {
    const data = {
    lists: await listService.showAllActiveLists()
    }
    return new Response(await renderFile("lists.eta", data), requestUtils.responseDetails)
}

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.addNewList(name);

  return requestUtils.redirectTo("/lists")
}

const listCount = async () => {
  return await listService.countLists()
}

const deactivateList = async (request) => {
  const url = new URL(request.url)
  const urlParts = url.pathname.split("/")
  await listService.deactivateById(urlParts[2])

  return await requestUtils.redirectTo("/lists")
}

export {viewLists, addList, listCount, deactivateList}