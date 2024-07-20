<script>
	import { onMount } from 'svelte';
	import { fetchJSON } from '$lib/util';
	import NotEditable from '$lib/components/NotEditable.svelte';

	import { t } from '$lib/translations';

	export let counter = undefined;
	export let editable = false;
	let count;

	onMount(async () => {
		if (counter) {
			const result = await fetchJSON('GET', `/api/counter?c=${counter}`);
			count = result.count;
		}
	});
</script>

<NotEditable {editable}>
	<div class="">
		<div class="max-w-screen-md mx-auto px-6 py-6 text-sm lg:text-base">
			<div class="text-center">
				{@html $t('common.poweredBy', {
					value: '<a class="underline font-medium" href="https://www.postowl.com">PostOwl</a>'
				})}
				{count ? $t('common.pageView', { value: count }) : $t('common.pageNotViewed')}
			</div>
		</div>
	</div>
</NotEditable>
