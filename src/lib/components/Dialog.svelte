<script context="module" lang="ts">
    type Dialog = { open: () => void; close: () => void };
    const dialogs = new Map<string, Dialog>();

    export const getDialog = (id: string) => {
        return dialogs.get(id);
    };
</script>

<script lang="ts">
    export let id: string;
    export let title: string;
    export let message: string;

    let open = false;

    const onKeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            closeDialog();
        }
    };

    export const openDialog = () => {
        if (open) {
            return;
        }

        open = true;
        window.addEventListener("keydown", onKeydown);
    };

    export const closeDialog = () => {
        if (!open) {
            return;
        }

        open = false;
        window.removeEventListener("keydown", onKeydown);
    };

    dialogs.set(id, { open: openDialog, close: closeDialog });
</script>

<dialog {open}>
    <article>
        <h3>{title}</h3>
        <p>{message}</p>
        <footer>
            <a href="." role="button" on:click|preventDefault={closeDialog}>OK</a>
        </footer>
    </article>
</dialog>
