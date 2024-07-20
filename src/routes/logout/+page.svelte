<script>
	import Limiter from '$lib/components/Limiter.svelte';

	import { t } from '$lib/translations';

	export let form;
	export let data;
	$: bio = data.bio;
</script>

<svelte:head>
	<title>{$t('common.loggedOut')}</title>
	<link rel="icon" type="image/png" sizes="300x300" href={bio.avatar} />
	<link rel="apple-touch-icon" sizes="300x300" href={bio.avatar} />
</svelte:head>

<Limiter>
	<div class="pt-20">
		{#if form?.incorrect}
			<p class="p-4 bg-red-100 text-red-600 my-4 rounded-md">{$t('common.errorWhile')}</p>
		{:else}
			{$t('common.loggedOutSuccess')}<a class="underline" href="/">{$t('common.continue')}</a>.
		{/if}
	</div>
</Limiter>
