import { deLocalizeUrl } from "$lib/i18n/runtime";
import type { Reroute } from "@sveltejs/kit";

export const reroute: Reroute = (request) => deLocalizeUrl(request.url).pathname;
