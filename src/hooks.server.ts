import { paraglideMiddleware } from "$lib/i18n/server";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = ({ event, resolve }) =>
    paraglideMiddleware(event.request, ({ request, locale }) => {
        event.request = request;

        return resolve(event, {
            transformPageChunk: ({ html }) => html.replace("%paraglide.lang%", locale),
        });
    });
