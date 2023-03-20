<script context="module" lang="ts">
    type Modal = {
        open: () => void;
        close: () => void;
    };

    type Modals = {
        [key: string]: Modal;
    };

    const modals: Modals = {};

    export const setModal = (id: string, open: boolean) => {
        if (open) {
            modals[id].open();
        } else {
            modals[id].close();
        }
    };
</script>

<script lang="ts">
    export let id: string;
    export let title: string;
    export let message: string;

    let open = false;

    const onKeydown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            closeModal();
        }
    };

    export const openModal = () => {
        if (open) {
            return;
        }

        open = true;
        window.addEventListener("keydown", onKeydown);
    };

    export const closeModal = () => {
        if (!open) {
            return;
        }

        open = false;
        window.removeEventListener("keydown", onKeydown);
    };

    modals[id] = {
        open: openModal,
        close: closeModal,
    };
</script>

<dialog {open}>
    <article>
        <h3>{title}</h3>
        <p>{message}</p>
        <footer>
            <a href="." role="button" on:click|preventDefault={closeModal}>OK</a>
        </footer>
    </article>
</dialog>
