<script>
	import EditorToolbar from '$lib/components/EditorToolbar.svelte';
	import { fetchJSON, isEmailValid } from '$lib/util';
	import { goto } from '$app/navigation';
	import PlainText from '$lib/components/PlainText.svelte';

	import { t } from '$lib/translations';

	export let data;
	let editable, name, email;

	$: currentUser = data.currentUser;
	$: bio = data.bio;
	$: {
		// HACK: To make sure this is only run when the parent passes in new data
		data = data;
		initOrReset();
	}

	function initOrReset() {
		name = data.name;
		email = data.email;
		editable = true;
	}

	async function deleteFriend() {
		if (!currentUser) return alert(t('common.notAuthorized'));
		if (confirm(t('common.confirmAreYouSure'))) {
			try {
				await fetchJSON('POST', '/api/delete-friend', {
					friend_id: data.friend_id
				});
				goto('/friends');
			} catch (err) {
				console.error(err);
				alert(t('common.alertErrorDel'));
			}
		}
	}

	async function saveFriend() {
		if (!currentUser) return alert(t('common.notAuthorized'));
		try {
			await fetchJSON('POST', '/api/update-friend', {
				friend_id: data.friend_id,
				name,
				email
			});
			goto('/friends');
		} catch (err) {
			console.error(err);
			alert(t('common.couldNotSaveAlert'));
		}
	}
</script>

<svelte:head>
	<title>{name || email}</title>
	<link rel="icon" type="image/png" sizes="300x300" href={bio.avatar} />
	<link rel="apple-touch-icon" sizes="300x300" href={bio.avatar} />
</svelte:head>

{#if editable}
	<EditorToolbar
		on:cancel={() => goto('/friends')}
		on:save={saveFriend}
		canConfirm={isEmailValid(email)}
	/>
{/if}

<div class="max-w-screen-md mx-auto px-6 pb-8 sm:text-xl">
	<div class="pt-24 text-sm font-bold">{$t('common.name')}</div>
	<div class="border-b py-2">
		<PlainText {editable} bind:content={name} placeholder={$t('common.enterName')} />
	</div>

	<div class="pt-8 text-sm font-bold">{$t('common.email')}</div>
	<div class="border-b py-2">
		<PlainText {editable} bind:content={email} placeholder={$t('common.enterEmail')} />
	</div>

	<div class="text-center pt-12">
		<button
			class="font-medium text-sm sm:text-base rounded-full w-full py-3 border border-rose-600 text-rose-600"
			on:click={deleteFriend}>{$t('deleteFriend')}</button
		>
	</div>
</div>
