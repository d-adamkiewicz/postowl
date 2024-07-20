<script>
	//export let confirmLabel = 'Save';
	export let canConfirm = true;

	import { t } from '$lib/translations';
</script>

{#await import('$lib/components/EditorControls.svelte') then EditorToolbar}
	<EditorToolbar.default on:cancel on:save confirmLabel={$t('common.save')} {canConfirm} />
{/await}
